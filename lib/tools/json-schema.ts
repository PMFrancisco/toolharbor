/**
 * JSON Schema Validator
 *
 * A lightweight, zero-dependency JSON Schema validator.
 * Supports the most common JSON Schema keywords (Draft 4/7 subset).
 */

export interface ValidationError {
  path: string;
  message: string;
}

export interface SchemaValidationSuccess {
  success: true;
  data: {
    valid: boolean;
    errors: ValidationError[];
  };
}

export interface SchemaValidationError {
  success: false;
  error: string;
}

export type SchemaValidationResult = SchemaValidationSuccess | SchemaValidationError;

/** Basic format validators */
const formatValidators: Record<string, (value: string) => boolean> = {
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  uri: (v) => /^https?:\/\/.+/.test(v),
  date: (v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && !isNaN(Date.parse(v)),
  'date-time': (v) => !isNaN(Date.parse(v)),
};

/** Get the JSON Schema type of a value */
function getType(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'integer' : 'number';
  }
  return typeof value;
}

/** Check if a value matches a JSON Schema type */
function matchesType(value: unknown, type: string): boolean {
  const actualType = getType(value);
  if (type === 'number') {
    // 'number' also accepts integers
    return actualType === 'number' || actualType === 'integer';
  }
  return actualType === type;
}

/**
 * Recursive schema validation
 */
function validate(schema: Record<string, unknown>, data: unknown, path: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // type validation
  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const valid = (types as string[]).some((t) => matchesType(data, t));
    if (!valid) {
      errors.push({
        path,
        message: `Expected type "${(types as string[]).join(' | ')}" but got "${getType(data)}"`,
      });
      return errors; // Stop further validation if type mismatch
    }
  }

  // enum validation
  if (schema.enum !== undefined && Array.isArray(schema.enum)) {
    const enumValues = schema.enum as unknown[];
    if (!enumValues.some((v) => JSON.stringify(v) === JSON.stringify(data))) {
      errors.push({
        path,
        message: `Value must be one of: ${enumValues.map((v) => JSON.stringify(v)).join(', ')}`,
      });
    }
  }

  // String validations
  if (typeof data === 'string') {
    if (typeof schema.minLength === 'number' && data.length < schema.minLength) {
      errors.push({
        path,
        message: `String must be at least ${schema.minLength} characters (got ${data.length})`,
      });
    }
    if (typeof schema.maxLength === 'number' && data.length > schema.maxLength) {
      errors.push({
        path,
        message: `String must be at most ${schema.maxLength} characters (got ${data.length})`,
      });
    }
    if (typeof schema.pattern === 'string') {
      try {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(data)) {
          errors.push({
            path,
            message: `String must match pattern "${schema.pattern}"`,
          });
        }
      } catch {
        errors.push({
          path,
          message: `Invalid regex pattern in schema: "${schema.pattern}"`,
        });
      }
    }
    if (typeof schema.format === 'string') {
      const validator = formatValidators[schema.format];
      if (validator && !validator(data)) {
        errors.push({
          path,
          message: `String must be a valid ${schema.format}`,
        });
      }
    }
  }

  // Number validations
  if (typeof data === 'number') {
    if (typeof schema.minimum === 'number' && data < schema.minimum) {
      errors.push({
        path,
        message: `Value must be >= ${schema.minimum} (got ${data})`,
      });
    }
    if (typeof schema.maximum === 'number' && data > schema.maximum) {
      errors.push({
        path,
        message: `Value must be <= ${schema.maximum} (got ${data})`,
      });
    }
    if (typeof schema.exclusiveMinimum === 'number' && data <= schema.exclusiveMinimum) {
      errors.push({
        path,
        message: `Value must be > ${schema.exclusiveMinimum} (got ${data})`,
      });
    }
    if (typeof schema.exclusiveMaximum === 'number' && data >= schema.exclusiveMaximum) {
      errors.push({
        path,
        message: `Value must be < ${schema.exclusiveMaximum} (got ${data})`,
      });
    }
  }

  // Array validations
  if (Array.isArray(data)) {
    if (typeof schema.minItems === 'number' && data.length < schema.minItems) {
      errors.push({
        path,
        message: `Array must have at least ${schema.minItems} items (got ${data.length})`,
      });
    }
    if (typeof schema.maxItems === 'number' && data.length > schema.maxItems) {
      errors.push({
        path,
        message: `Array must have at most ${schema.maxItems} items (got ${data.length})`,
      });
    }
    // items validation
    if (schema.items && typeof schema.items === 'object') {
      const itemSchema = schema.items as Record<string, unknown>;
      data.forEach((item, index) => {
        errors.push(...validate(itemSchema, item, `${path}[${index}]`));
      });
    }
  }

  // Object validations
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    const obj = data as Record<string, unknown>;
    const keys = Object.keys(obj);

    if (typeof schema.minProperties === 'number' && keys.length < schema.minProperties) {
      errors.push({
        path,
        message: `Object must have at least ${schema.minProperties} properties (got ${keys.length})`,
      });
    }
    if (typeof schema.maxProperties === 'number' && keys.length > schema.maxProperties) {
      errors.push({
        path,
        message: `Object must have at most ${schema.maxProperties} properties (got ${keys.length})`,
      });
    }

    // required validation
    if (Array.isArray(schema.required)) {
      for (const requiredKey of schema.required as string[]) {
        if (!(requiredKey in obj)) {
          errors.push({
            path: path === 'root' ? requiredKey : `${path}.${requiredKey}`,
            message: `Missing required property "${requiredKey}"`,
          });
        }
      }
    }

    // properties validation
    if (schema.properties && typeof schema.properties === 'object') {
      const properties = schema.properties as Record<string, Record<string, unknown>>;
      for (const [key, propSchema] of Object.entries(properties)) {
        if (key in obj) {
          const propPath = path === 'root' ? key : `${path}.${key}`;
          errors.push(...validate(propSchema, obj[key], propPath));
        }
      }
    }

    // additionalProperties validation (boolean only)
    if (schema.additionalProperties === false && schema.properties) {
      const definedProps = Object.keys(schema.properties as object);
      for (const key of keys) {
        if (!definedProps.includes(key)) {
          errors.push({
            path: path === 'root' ? key : `${path}.${key}`,
            message: `Additional property "${key}" is not allowed`,
          });
        }
      }
    }
  }

  return errors;
}

/**
 * Validate JSON data against a JSON Schema
 */
export function validateJsonSchema(schema: string, data: string): SchemaValidationResult {
  if (!schema.trim()) {
    return { success: false, error: 'JSON Schema cannot be empty' };
  }

  if (!data.trim()) {
    return { success: false, error: 'JSON data cannot be empty' };
  }

  let parsedSchema: Record<string, unknown>;
  try {
    parsedSchema = JSON.parse(schema);
  } catch {
    return { success: false, error: 'Invalid JSON in schema. Please check the syntax.' };
  }

  if (typeof parsedSchema !== 'object' || parsedSchema === null || Array.isArray(parsedSchema)) {
    return { success: false, error: 'Schema must be a JSON object' };
  }

  let parsedData: unknown;
  try {
    parsedData = JSON.parse(data);
  } catch {
    return { success: false, error: 'Invalid JSON in data. Please check the syntax.' };
  }

  const errors = validate(parsedSchema, parsedData, 'root');

  return {
    success: true,
    data: {
      valid: errors.length === 0,
      errors,
    },
  };
}

/**
 * Check if a string is a valid JSON Schema (basic check)
 */
export function isValidJsonSchema(schema: string): boolean {
  try {
    const parsed = JSON.parse(schema);
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed);
  } catch {
    return false;
  }
}

/**
 * Returns a sample JSON Schema
 */
export function getDefaultSchema(): string {
  return JSON.stringify(
    {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        age: { type: 'integer', minimum: 0, maximum: 150 },
        roles: {
          type: 'array',
          items: { type: 'string' },
          minItems: 1,
        },
      },
      required: ['name', 'email'],
      additionalProperties: false,
    },
    null,
    2
  );
}

/**
 * Returns sample JSON data matching the default schema
 */
export function getDefaultSchemaData(): string {
  return JSON.stringify(
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 28,
      roles: ['admin', 'editor'],
    },
    null,
    2
  );
}
