export const toolInfo = {
  name: 'YAML Formatter',
  description:
    'Format, validate, and beautify YAML data instantly. Free online YAML formatter with key sorting.',
  slug: 'yaml-formatter',
};

export const relatedTools = [
  { name: 'JSON to YAML Converter', href: '/tools/json-yaml-converter' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'SQL Formatter', href: '/tools/sql-formatter' },
  { name: 'XML Formatter', href: '/tools/xml-formatter' },
];

export const features = [
  'Format YAML with customizable indentation (2 or 4 spaces)',
  'Sort keys alphabetically for consistent structure',
  'Validate YAML syntax with clear error messages',
  'Compact mode for minimal indentation',
  'Works offline — no data sent to servers',
  'Copy formatted output with one click',
];

export const howToSteps = [
  'Paste your YAML data into the input field on the left',
  'Choose your preferred indentation size (2 or 4 spaces)',
  'Click "Format" to beautify or "Compact" to minimize indentation',
  'Optionally enable "Sort Keys" to alphabetize object keys',
  'Click "Copy" to copy the result to your clipboard',
];

export const examples = [
  {
    title: 'Formatting messy YAML',
    input: `server:
 host: localhost
 port: 8080
 ssl: true
database:
   name: myapp
   user: admin`,
    output: `server:
  host: localhost
  port: 8080
  ssl: true
database:
  name: myapp
  user: admin`,
  },
  {
    title: 'Sorting keys alphabetically',
    input: `zebra: last
apple: first
mango: middle
config:
    zoom: 100
    autosave: true`,
    output: `apple: first
config:
  autosave: true
  zoom: 100
mango: middle
zebra: last`,
  },
];

export const explanation = {
  title: 'What is a YAML Formatter?',
  content: [
    "YAML (YAML Ain't Markup Language) is a human-friendly data serialization format widely used for configuration files, CI/CD pipelines, Kubernetes manifests, Docker Compose files, and Ansible playbooks. Its clean, indentation-based syntax makes it popular among developers and DevOps engineers who need readable configuration without the verbosity of XML or the strict syntax of JSON.",
    'A YAML formatter (also called a YAML beautifier or YAML prettifier) takes poorly indented or inconsistently formatted YAML and transforms it into a clean, consistently indented document. This is essential because YAML relies on whitespace for structure — a single misplaced space can change the meaning of your data or break your configuration entirely.',
    'Our online YAML formatter validates your syntax in real-time, catching common errors like inconsistent indentation, invalid nesting, duplicate keys, and type mismatches. When working with complex Kubernetes deployments or multi-service Docker Compose files, catching these errors early saves significant debugging time.',
    'The sort keys feature alphabetically orders all object keys at every nesting level. This is particularly useful for keeping configuration files consistent across teams, making diffs cleaner in version control, and following organizational standards. Many teams enforce sorted keys in their YAML files to reduce merge conflicts and improve readability.',
    'Unlike online tools that upload your data to remote servers, this YAML formatter runs entirely in your browser. Your configuration files — which often contain sensitive information like database credentials, API keys, and infrastructure details — never leave your computer. No registration required, no data collection, just fast and private formatting.',
  ],
};

export const faqItems = [
  {
    question: 'What is YAML formatting?',
    answer:
      'YAML formatting is the process of restructuring YAML data with consistent indentation and spacing. Since YAML uses whitespace to define structure, proper formatting is critical for both readability and correctness.',
  },
  {
    question: 'Why does indentation matter in YAML?',
    answer:
      "Unlike JSON or XML which use brackets and tags, YAML uses indentation to define hierarchy. A key indented two spaces under another key means it's a child property. Incorrect indentation can completely change your data structure or cause parsing errors.",
  },
  {
    question: 'Is my data safe when using this tool?',
    answer:
      'Yes, completely. This tool runs entirely in your browser using JavaScript. Your YAML data is never sent to any server — all processing happens locally on your device.',
  },
  {
    question: 'What does Sort Keys do?',
    answer:
      'Sort Keys alphabetically orders all object keys at every level of your YAML document. This creates consistent, predictable file structure that is easier to read, produces cleaner diffs in version control, and reduces merge conflicts in team environments.',
  },
  {
    question: 'Can I format Kubernetes or Docker Compose files?',
    answer:
      'Yes! This formatter handles any valid YAML including Kubernetes manifests, Docker Compose files, GitHub Actions workflows, Ansible playbooks, and any other YAML-based configuration. Paste your file content and format it instantly.',
  },
];
