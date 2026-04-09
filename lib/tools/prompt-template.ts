export interface TemplateVariable {
  name: string;
  value: string;
}

export interface TemplateParseResult {
  variables: string[];
  filled: string;
}

const VARIABLE_PATTERN = /\{\{(\w+)\}\}/g;

export function parseTemplateVariables(template: string): string[] {
  const matches = template.matchAll(VARIABLE_PATTERN);
  const seen = new Set<string>();
  const variables: string[] = [];
  for (const match of matches) {
    const name = match[1];
    if (!seen.has(name)) {
      seen.add(name);
      variables.push(name);
    }
  }
  return variables;
}

export function fillTemplate(template: string, variables: TemplateVariable[]): TemplateParseResult {
  const varNames = parseTemplateVariables(template);
  const valueMap = new Map(variables.map((v) => [v.name, v.value]));

  const filled = template.replace(VARIABLE_PATTERN, (_, name: string) => {
    const value = valueMap.get(name);
    return value || `{{${name}}}`;
  });

  return { variables: varNames, filled };
}

export function formatFilledSummary(template: string, variables: TemplateVariable[]): string {
  const { filled } = fillTemplate(template, variables);
  const lines = [
    'Variables:',
    ...variables.filter((v) => v.value).map((v) => `  {{${v.name}}} = ${v.value}`),
    '',
    'Output:',
    filled,
  ];
  return lines.join('\n');
}
