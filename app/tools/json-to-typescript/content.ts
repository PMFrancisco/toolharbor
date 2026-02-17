export const toolInfo = {
  name: 'JSON to TypeScript',
  description:
    'Convert JSON data to TypeScript interfaces or type aliases. Infer types from any JSON structure instantly.',
  slug: 'json-to-typescript',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON Schema Validator', href: '/tools/json-schema-validator' },
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
  { name: 'JSON to CSV Converter', href: '/tools/json-csv-converter' },
];

export const features = [
  'Generate TypeScript interfaces or type aliases from JSON',
  'Infer nested object types with proper naming',
  'Handle arrays of objects with merged shapes',
  'Choose between interface and type output style',
  'Customize the root type name',
  'Works entirely offline — your data never leaves your browser',
];

export const howToSteps = [
  'Paste your JSON data into the input field on the left',
  'Choose between "Interface" or "Type" output style',
  'Optionally set a custom root type name',
  'Click "Generate Types" to convert',
  'Copy the TypeScript output from the right panel',
];

export const examples = [
  {
    title: 'Simple object',
    input: `{
  "name": "John",
  "age": 30,
  "active": true
}`,
    output: `export interface Root {
  name: string;
  age: number;
  active: boolean;
}`,
  },
  {
    title: 'Nested objects with arrays',
    input: `{
  "id": 1,
  "name": "Project Alpha",
  "tags": ["typescript", "react"],
  "owner": {
    "name": "Jane",
    "email": "jane@example.com"
  }
}`,
    output: `export interface Owner {
  name: string;
  email: string;
}

export interface Root {
  id: number;
  name: string;
  tags: string[];
  owner: Owner;
}`,
  },
  {
    title: 'Array of objects',
    input: `[
  { "id": 1, "title": "Post One", "published": true },
  { "id": 2, "title": "Post Two", "published": false }
]`,
    output: `export interface RootItem {
  id: number;
  title: string;
  published: boolean;
}

export type Root = RootItem[];`,
  },
];

export const explanation = {
  title: 'Why Convert JSON to TypeScript?',
  content: [
    'When working with APIs, configuration files, or any external data source in a TypeScript project, you need type definitions to get the full benefits of static typing. Manually writing interfaces for complex JSON structures is tedious and error-prone. This tool automates that process by analyzing your JSON data and generating accurate TypeScript types.',
    'The converter infers the correct TypeScript type for each value: strings, numbers, booleans, nulls, arrays, and nested objects. For nested objects, it generates separate named interfaces (or type aliases) with PascalCase names derived from the property keys. This produces clean, idiomatic TypeScript that follows community conventions.',
    'Arrays of objects receive special treatment. The tool examines all items in the array, merges their shapes, and generates a single interface that covers all possible properties. Keys that appear in some items but not others are marked as optional with the ? modifier. This accurately models real-world API responses where array items may have varying shapes.',
    'You can choose between two output styles: interfaces and type aliases. Interfaces are the traditional TypeScript approach and support declaration merging. Type aliases are more flexible and can represent unions, intersections, and mapped types. For most API response types, either style works — pick whichever matches your project conventions.',
    'Everything runs in your browser. Your JSON data — API responses, database records, or configuration objects — is never sent to any server. Paste the response from your API, click generate, and copy the types directly into your codebase.',
  ],
};

export const faqItems = [
  {
    question: 'Should I use interfaces or type aliases?',
    answer:
      'Both work for defining object shapes. Interfaces are the conventional choice for object types and support declaration merging. Type aliases are more flexible for unions and complex types. Most TypeScript projects use interfaces for data models.',
  },
  {
    question: 'How does it handle arrays with different object shapes?',
    answer:
      'The tool merges all object shapes found in an array into a single type. Properties that exist in some items but not all are marked as optional (?). This accurately models real-world API responses with inconsistent data.',
  },
  {
    question: 'Does it handle deeply nested JSON?',
    answer:
      'Yes. Each nested object gets its own named interface. For example, a "user.address.city" structure generates separate User, Address interfaces with proper nesting references.',
  },
  {
    question: 'Can I use the generated types directly in my project?',
    answer:
      'Yes. The output is valid TypeScript that you can paste directly into a .ts file. All types are exported, so you can import them anywhere in your project.',
  },
  {
    question: 'Is my JSON data sent to a server?',
    answer:
      'No. All type inference happens entirely in your browser using JavaScript. Your data never leaves your device.',
  },
];
