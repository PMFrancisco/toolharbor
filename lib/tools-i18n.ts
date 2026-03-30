import type { Tool } from './tools-registry';
import type { Locale } from './i18n';

import enToolsRegistry from '@/locales/en/tools-registry.json';

const registryMessages: Record<string, Record<string, { name: string; description: string }>> = {
  en: enToolsRegistry,
};

export function getLocalizedTool(tool: Tool, locale: Locale): Tool {
  const messages = registryMessages[locale];
  if (!messages) return tool;
  const localized = messages[tool.slug];
  if (!localized) return tool;
  return { ...tool, name: localized.name, description: localized.description };
}

export function getLocalizedTools(tools: Tool[], locale: Locale): Tool[] {
  return tools.map((t) => getLocalizedTool(t, locale));
}
