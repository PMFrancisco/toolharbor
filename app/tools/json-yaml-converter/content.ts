export const toolInfo = {
  name: 'JSON to YAML Converter',
  description:
    'Convert between JSON and YAML formats instantly. Transform configuration files, API responses, and data structures.',
  slug: 'json-yaml-converter',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'CSV to JSON Converter', href: '/tools/csv-json-converter' },
  { name: 'Base64 Encoder', href: '/tools/base64-encoder' },
];

export const features = [
  'Convert JSON to YAML format instantly',
  'Convert YAML back to JSON format',
  'Preserve data types and structure',
  'Handle nested objects and arrays',
  'Support for special values (null, booleans)',
  'Works offline - no data sent to servers',
];

export const howToSteps = [
  'Select the conversion direction (JSON to YAML or YAML to JSON)',
  'Paste your JSON or YAML data in the input field',
  'Click Convert to transform your data',
  'Copy the converted output to your clipboard',
  'Use the swap button to convert back and forth',
];

export const examples = [
  {
    title: 'JSON to YAML',
    input: `{
  "name": "John Doe",
  "age": 30,
  "active": true,
  "address": {
    "city": "New York",
    "zip": "10001"
  }
}`,
    output: `name: John Doe
age: 30
active: true
address:
  city: New York
  zip: "10001"`,
  },
  {
    title: 'YAML to JSON',
    input: `server:
  host: localhost
  port: 8080
database:
  name: mydb
  enabled: true`,
    output: `{
  "server": {
    "host": "localhost",
    "port": 8080
  },
  "database": {
    "name": "mydb",
    "enabled": true
  }
}`,
  },
  {
    title: 'Arrays in YAML',
    input: `{
  "fruits": ["apple", "banana", "orange"],
  "count": 3
}`,
    output: `fruits:
  - apple
  - banana
  - orange
count: 3`,
  },
];

export const explanation = {
  title: 'What is a JSON to YAML Converter?',
  content: [
    "JSON (JavaScript Object Notation) and YAML (YAML Ain't Markup Language) are two popular data serialization formats. JSON is widely used in web APIs, configuration files, and JavaScript applications. YAML is commonly used for configuration files in DevOps tools like Kubernetes, Docker Compose, Ansible, and CI/CD pipelines because of its human-readable syntax.",
    'A JSON to YAML converter transforms structured data between these two formats while preserving the data structure, types, and hierarchy. This is essential when working with different tools that expect different formats, or when you want to make configuration files more readable.',
    'YAML uses indentation to represent structure, making it more readable for humans compared to JSON. It also supports features like comments (which JSON does not) and multi-line strings. However, YAML is sensitive to whitespace, which can lead to subtle errors if not formatted correctly.',
    'The reverse conversion (YAML to JSON) is useful when you need to use configuration data in JavaScript applications, send data to APIs that expect JSON, or validate the structure of your YAML files by converting them to the stricter JSON format.',
    'Our converter handles common data types including strings, numbers, booleans, null values, arrays, and nested objects. All conversion happens in your browser, so your sensitive configuration data never leaves your computer.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between JSON and YAML?',
    answer:
      'JSON uses braces {} and brackets [] with quoted strings, while YAML uses indentation and is more human-readable. YAML supports comments and multi-line strings natively, which JSON does not. JSON is stricter and easier to parse programmatically.',
  },
  {
    question: 'Can YAML comments be preserved when converting?',
    answer:
      'No, comments cannot be preserved when converting YAML to JSON because JSON does not support comments. If you convert back to YAML, you will need to re-add any comments manually.',
  },
  {
    question: 'Why do some strings get quoted in YAML output?',
    answer:
      'YAML requires quoting for strings that could be interpreted as other types (like numbers or booleans), contain special characters (colons, hashes), or have leading/trailing whitespace. This ensures the data is parsed correctly.',
  },
  {
    question: 'Is this converter suitable for Kubernetes manifests?',
    answer:
      'Yes, you can convert JSON to YAML for Kubernetes manifests. However, for complex manifests, consider using specialized tools that understand Kubernetes-specific syntax and can validate your configuration.',
  },
  {
    question: 'What happens with special characters in strings?',
    answer:
      'Special characters like newlines, tabs, and quotes are properly escaped in both formats. The converter handles these automatically to ensure your data remains intact after conversion.',
  },
];
