export const toolInfo = {
  name: 'JSON Schema Validator',
  description:
    'Validate JSON data against a JSON Schema. Check types, required fields, formats, and constraints instantly.',
  slug: 'json-schema-validator',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'Regex Tester', href: '/tools/regex-tester' },
];

export const features = [
  'Validate JSON data against a JSON Schema',
  'Support for type, required, properties, items, enum, and more',
  'Format validation for email, URI, date, and date-time',
  'Detailed error messages with JSON paths',
  'Load sample schema and data with one click',
  'No server required — everything runs in your browser',
];

export const howToSteps = [
  'Paste or write your JSON Schema in the left panel',
  'Paste or write your JSON data in the right panel',
  'Click "Validate" to check the data against the schema',
  'View results: green for valid, red with error details for invalid',
  'Use "Load Sample" to see an example schema and data',
];

export const examples = [
  {
    title: 'User object validation',
    input:
      'Schema: { "type": "object", "properties": { "name": { "type": "string" }, "age": { "type": "integer", "minimum": 0 } }, "required": ["name"] }',
    output: '✓ Valid — JSON matches the schema',
  },
  {
    title: 'Missing required field',
    input: 'Schema requires "email" but data is { "name": "Alice" }',
    output: '✗ Invalid — Missing required property "email" at root',
  },
  {
    title: 'Type mismatch',
    input: 'Schema expects "age" as integer but data has "age": "twenty"',
    output: '✗ Invalid — Expected type "integer" but got "string" at age',
  },
];

export const explanation = {
  title: 'What is JSON Schema Validation?',
  content: [
    'JSON Schema is a vocabulary for annotating and validating the structure of JSON data. It defines what shape your JSON should have, including data types, required fields, value constraints, and nested structures. JSON Schema validation ensures that a piece of JSON data conforms to a predefined schema, catching errors before they cause problems in your application.',
    'This validator supports the most common JSON Schema keywords that cover the vast majority of real-world use cases: type checking (string, number, integer, boolean, array, object, null), property definitions with required fields, array item validation, numeric constraints (minimum, maximum, exclusiveMinimum, exclusiveMaximum), string constraints (minLength, maxLength, pattern), enum values, and format validation for email, URI, date, and date-time.',
    'JSON Schema validation is essential for API development. When you build a REST or GraphQL API, you need to validate incoming request bodies to prevent invalid data from reaching your business logic. By defining a schema for each endpoint, you create a clear contract between frontend and backend teams. The schema serves as both documentation and runtime validation.',
    'Beyond APIs, JSON Schema is used for configuration file validation, form validation, data pipeline integrity checks, and database document validation (e.g., MongoDB schema validation). It is also the foundation for OpenAPI (Swagger) specifications, making it a critical tool for API-first development workflows.',
    'Our validator processes everything client-side — your schema and data never leave your browser. It provides detailed error messages with JSON paths (like "root.address.zipCode") so you can quickly locate and fix issues. This makes it ideal for debugging schema definitions, testing validation rules, and learning how JSON Schema works.',
  ],
};

export const faqItems = [
  {
    question: 'Which JSON Schema draft does this tool support?',
    answer:
      'This tool supports the most commonly used keywords from JSON Schema Draft 4 and Draft 7, including type, properties, required, items, enum, pattern, format, minimum/maximum, minLength/maxLength, minItems/maxItems, minProperties/maxProperties, and additionalProperties. These cover approximately 90% of real-world JSON Schema use cases.',
  },
  {
    question: 'What format validations are supported?',
    answer:
      'The tool validates four common formats: "email" (basic email pattern), "uri" (HTTP/HTTPS URLs), "date" (YYYY-MM-DD format), and "date-time" (ISO 8601 date-time strings). These cover the most frequently used format validations in JSON Schema.',
  },
  {
    question: 'Does this support $ref or schema composition?',
    answer:
      'This lightweight validator does not support $ref references, allOf, anyOf, oneOf, or not keywords. For complex schemas with these features, consider a full-featured validator like Ajv. This tool is optimized for simplicity and covers the most common validation needs.',
  },
  {
    question: 'What does the error path mean?',
    answer:
      'The path shows the location of the error in your JSON data. "root" refers to the top-level object. Nested properties use dot notation (e.g., "root.address.city"), and array items use bracket notation (e.g., "root.items[0]"). This makes it easy to locate exactly where the validation failed.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All validation happens entirely in your browser using JavaScript. Neither your schema nor your data is ever transmitted to any server. This makes the tool safe for validating schemas that contain or reference sensitive data structures.',
  },
];
