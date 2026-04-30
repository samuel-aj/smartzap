-- Adiciona display_name (alias amigável) aos templates.
-- O `name` da Meta é técnico e imutável (usado em chamadas à API).
-- `display_name` é apenas para exibição no app; nunca é enviado à Meta.
-- A sincronização com Meta NÃO inclui esta coluna no upsert, então o alias é preservado.

ALTER TABLE public.templates
  ADD COLUMN IF NOT EXISTS display_name text;

COMMENT ON COLUMN public.templates.display_name IS
  'Alias amigável definido pelo usuário, exibido no app. NULL = usar o name da Meta. Nunca enviado à Meta API.';
