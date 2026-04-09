export const toolInfo = {
  name: 'Prompt Template Formatter',
  description:
    'Create reusable prompt templates with {{variables}}. Fill values in a form and preview the final prompt instantly.',
  slug: 'prompt-template-formatter',
};

export const relatedTools = [
  { name: 'LLM Token Counter', href: '/tools/token-counter' },
  { name: 'Context Window Calculator', href: '/tools/context-window-calculator' },
  { name: 'Find & Replace', href: '/tools/find-replace' },
];

export const features = [
  'Auto-detect {{variables}} in your template as you type',
  'Dynamic form fields generated for each unique variable',
  'Live preview of the final prompt with all values filled in',
  'Reuse the same variable name multiple times — fill once, replace everywhere',
  'Copy the final prompt or the raw template to clipboard',
  'Track how many variables are filled with the progress indicator',
];

export const howToSteps = [
  'Write your prompt template using {{variable_name}} syntax for placeholders',
  'The tool automatically detects all unique variables and creates input fields',
  'Fill in the values for each variable in the form below the template',
  'Watch the final prompt update in real time as you type values',
  'Click the copy button on the final prompt to use it with your LLM',
];

export const examples = [
  {
    title: 'Code review prompt',
    input:
      'You are a {{role}} reviewing {{language}} code. Focus on {{focus_area}} and suggest improvements.',
    output:
      'You are a senior engineer reviewing TypeScript code. Focus on error handling and suggest improvements.',
  },
  {
    title: 'Content generation prompt',
    input:
      'Write a {{length}} {{content_type}} about {{topic}} for {{audience}}. Use a {{tone}} tone.',
    output:
      'Write a 500-word blog post about React Server Components for frontend developers. Use a conversational tone.',
  },
];

export const explanation = {
  title: 'Why Use a Prompt Template Formatter?',
  content: [
    'Prompt engineering is a core skill for working with LLMs. As you iterate on prompts, you often reuse the same structure but swap specific values — the role, the task, the context, or the constraints. A prompt template formatter lets you define that structure once and fill in the blanks without manually editing the full prompt each time.',
    'The {{variable}} syntax is widely used in template engines like Mustache, Handlebars, and Jinja2. This tool uses the same familiar pattern: wrap any variable name in double curly braces, and the tool will detect it automatically. Use descriptive names like {{role}}, {{language}}, or {{max_tokens}} to make your templates self-documenting.',
    'Templates are especially useful when working with team members who may not be prompt engineers. You can design the prompt structure, share the template, and let others fill in their specific values without worrying about breaking the prompt format. The form-based input makes it accessible to non-technical users.',
    'For production applications, prompt templates help maintain consistency. Instead of writing ad-hoc prompts, you define templates that enforce the structure you know works well. This reduces variance in LLM outputs and makes it easier to debug issues — you can see exactly which variable values led to a particular result.',
    'All processing happens in your browser. Your templates and variable values are never sent to any server, making this safe for proprietary prompts, internal documentation, and confidential use cases.',
  ],
};

export const faqItems = [
  {
    question: 'What syntax should I use for variables?',
    answer:
      'Use double curly braces with a variable name: {{variable_name}}. Variable names should contain only letters, numbers, and underscores. For example: {{role}}, {{max_tokens}}, {{output_format}}.',
  },
  {
    question: 'Can I use the same variable multiple times?',
    answer:
      'Yes. If you use {{language}} three times in your template, you only need to fill in the value once and it will be replaced in all three locations.',
  },
  {
    question: 'What happens if I leave a variable empty?',
    answer:
      'Empty variables remain as {{variable_name}} in the output. This makes it easy to see which values still need to be filled in before using the prompt.',
  },
  {
    question: 'Can I use this with any LLM?',
    answer:
      'Yes. The output is plain text that works with any language model — ChatGPT, Claude, Gemini, Llama, or any other LLM. Just copy the final prompt and paste it into your preferred interface or API call.',
  },
  {
    question: 'Is there a limit on the number of variables?',
    answer:
      'No practical limit. The tool generates a form field for each unique variable it detects. Templates with dozens of variables work fine, though for readability you may want to keep templates focused with 3-10 variables.',
  },
];
