export interface SchemaParameter {
  id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
}

export type SchemaFormat = 'openai' | 'anthropic';

export const PARAMETER_TYPES = [
  { value: 'string', label: 'string' },
  { value: 'number', label: 'number' },
  { value: 'integer', label: 'integer' },
  { value: 'boolean', label: 'boolean' },
  { value: 'array', label: 'array' },
  { value: 'object', label: 'object' },
];

export const createParameter = (
  name = '',
  type = 'string',
  description = '',
  required = false
): SchemaParameter => ({
  id: Math.random().toString(36).slice(2, 10),
  name,
  type,
  description,
  required,
});

export function generateOpenAiSchema(
  functionName: string,
  functionDescription: string,
  params: SchemaParameter[]
): string {
  const validParams = params.filter((p) => p.name.trim());
  const properties: Record<string, { type: string; description: string }> = {};
  const required: string[] = [];

  for (const param of validParams) {
    properties[param.name] = {
      type: param.type,
      description: param.description || `The ${param.name} parameter`,
    };
    if (param.required) required.push(param.name);
  }

  const schema: Record<string, unknown> = {
    type: 'function',
    function: {
      name: functionName || 'my_function',
      description: functionDescription || 'Describe what this function does',
      parameters: {
        type: 'object',
        properties,
        ...(required.length > 0 ? { required } : {}),
      },
    },
  };

  return JSON.stringify(schema, null, 2);
}

export function generateAnthropicSchema(
  functionName: string,
  functionDescription: string,
  params: SchemaParameter[]
): string {
  const validParams = params.filter((p) => p.name.trim());
  const properties: Record<string, { type: string; description: string }> = {};
  const required: string[] = [];

  for (const param of validParams) {
    properties[param.name] = {
      type: param.type,
      description: param.description || `The ${param.name} parameter`,
    };
    if (param.required) required.push(param.name);
  }

  const schema: Record<string, unknown> = {
    name: functionName || 'my_function',
    description: functionDescription || 'Describe what this function does',
    input_schema: {
      type: 'object',
      properties,
      ...(required.length > 0 ? { required } : {}),
    },
  };

  return JSON.stringify(schema, null, 2);
}

export function generateSchema(
  format: SchemaFormat,
  functionName: string,
  functionDescription: string,
  params: SchemaParameter[]
): string {
  return format === 'openai'
    ? generateOpenAiSchema(functionName, functionDescription, params)
    : generateAnthropicSchema(functionName, functionDescription, params);
}
