export const toolInfo = {
  name: 'AI Tool Schema Builder',
  description:
    'Build function calling schemas for OpenAI and Anthropic Claude visually. Add parameters, set types, and export JSON.',
  slug: 'ai-tool-schema-builder',
};

export const relatedTools = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'JSON Schema Validator', href: '/tools/json-schema-validator' },
  { name: 'Prompt Template Formatter', href: '/tools/prompt-template-formatter' },
];

export const features = [
  'Generate function calling schemas for OpenAI and Anthropic formats',
  'Visual form — add, remove, and configure parameters without writing JSON',
  'Support for all JSON Schema types: string, number, integer, boolean, array, object',
  'Toggle required/optional per parameter',
  'Real-time JSON preview updates as you build',
  'One-click toggle between OpenAI and Anthropic output formats',
];

export const howToSteps = [
  'Choose the output format: OpenAI or Anthropic',
  'Enter the function name and description',
  'Add parameters with name, type, description, and required flag',
  'The JSON schema updates in real time as you fill in fields',
  'Copy the generated schema and use it in your API calls',
];

export const examples = [
  {
    title: 'Weather function (OpenAI)',
    input: 'Name: get_weather | Params: location (string, required), unit (string, optional)',
    output:
      '{"type":"function","function":{"name":"get_weather","parameters":{"type":"object","properties":{"location":{"type":"string"},"unit":{"type":"string"}},"required":["location"]}}}',
  },
  {
    title: 'Search function (Anthropic)',
    input: 'Name: search_docs | Params: query (string, required), limit (integer, optional)',
    output:
      '{"name":"search_docs","input_schema":{"type":"object","properties":{"query":{"type":"string"},"limit":{"type":"integer"}},"required":["query"]}}',
  },
];

export const explanation = {
  title: 'Why Use a Tool Schema Builder?',
  content: [
    'Function calling (also called tool use) lets LLMs invoke external functions during a conversation. To use this feature, you need to define a JSON schema that describes each function — its name, what it does, and what parameters it accepts. Writing these schemas by hand is tedious and error-prone, especially for functions with many parameters.',
    'OpenAI and Anthropic use slightly different schema formats. OpenAI wraps the function definition inside a {"type": "function", "function": {...}} envelope with a "parameters" key, while Anthropic uses a flatter structure with "input_schema" instead of "parameters". This tool generates the correct format for whichever provider you are targeting.',
    'The visual form eliminates the need to remember JSON Schema syntax. You add parameters by clicking a button, set their type from a dropdown, write a description, and check a box if they are required. The JSON output updates in real time, so you can see exactly what the schema looks like as you build it.',
    'Well-defined tool schemas dramatically improve how reliably LLMs use your functions. Clear parameter descriptions help the model understand what values to pass, and marking parameters as required prevents the model from omitting essential arguments. Investing time in schema quality pays off in fewer failed function calls.',
    'All processing happens in your browser. Your function definitions and parameter details are never sent to any server, making this safe for internal tools, proprietary APIs, and confidential function definitions.',
  ],
};

export const faqItems = [
  {
    question: 'What is the difference between OpenAI and Anthropic formats?',
    answer:
      'OpenAI wraps the function in {"type": "function", "function": {...}} with a "parameters" key for the JSON Schema. Anthropic uses a flatter structure with "name", "description", and "input_schema" at the top level. The parameter schemas inside are standard JSON Schema in both cases.',
  },
  {
    question: 'What parameter types are supported?',
    answer:
      'The tool supports all JSON Schema primitive types: string, number, integer, boolean, array, and object. For complex types like arrays of objects or nested schemas, generate the base structure here and then edit the JSON output to add items or nested properties.',
  },
  {
    question: 'Can I define enum values for a parameter?',
    answer:
      'Not directly in the visual builder. Generate the schema with a string type, then manually add an "enum": ["value1", "value2"] array to the parameter in the JSON output. The tool gives you a clean starting point to extend.',
  },
  {
    question: 'How many parameters can I add?',
    answer:
      'There is no limit. Add as many parameters as your function needs. However, functions with more than 10 parameters may be harder for LLMs to use reliably — consider grouping related parameters into a single object parameter.',
  },
  {
    question: 'Can I use this schema with other LLM providers?',
    answer:
      'Yes. The OpenAI format is widely adopted and works with providers that support OpenAI-compatible APIs (Together, Groq, Fireworks, etc.). The parameter schemas use standard JSON Schema, which is universal.',
  },
];
