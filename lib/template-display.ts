/**
 * Retorna o nome a ser exibido para um template.
 * Prefere o alias definido pelo usuário (`displayName`); cai pro `name` da Meta.
 */
export function getTemplateDisplayName(t: { name: string; displayName?: string | null }): string {
  const alias = t.displayName?.trim()
  return alias && alias.length > 0 ? alias : t.name
}
