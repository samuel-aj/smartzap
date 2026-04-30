'use client';

import React from 'react';
import { X, Loader2, AlertTriangle, Trash2, RefreshCw, Copy, Pencil, Check } from 'lucide-react';
import { Template } from '../../../../types';
import { StatusBadge } from './StatusBadge';
import { TemplateDetails } from './types';
import { WhatsAppPhonePreview } from '@/components/ui/WhatsAppPhonePreview';
import { templateService } from '@/services/templateService';
import { getTemplateDisplayName } from '@/lib/template-display';
import { useQueryClient } from '@tanstack/react-query';

export interface TemplateDetailsModalProps {
  isOpen: boolean;
  template: Template | null;
  details: TemplateDetails | null;
  isLoading: boolean;
  isRefreshingPreview: boolean;
  onClose: () => void;
  onDelete: () => void;
  onRefreshPreview?: () => void;
}

const PREVIEW_VARIABLES = ['Joao', '19:00', '01/12', 'R$ 99,90', '#12345'];

export const TemplateDetailsModal: React.FC<TemplateDetailsModalProps> = ({
  isOpen,
  template,
  details,
  isLoading,
  isRefreshingPreview,
  onClose,
  onDelete,
  onRefreshPreview,
}) => {
  const queryClient = useQueryClient();
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [aliasInput, setAliasInput] = React.useState('');
  const [savedDisplayName, setSavedDisplayName] = React.useState<string | null>(null);
  const [isSavingAlias, setIsSavingAlias] = React.useState(false);
  const [aliasError, setAliasError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (template) {
      setSavedDisplayName(template.displayName ?? null);
      setAliasInput(template.displayName ?? '');
      setIsEditingName(false);
      setAliasError(null);
    }
  }, [template?.id]);

  if (!isOpen || !template) return null;

  const displayName = savedDisplayName?.trim() || template.name;
  const hasAlias = displayName !== template.name;

  const handleSaveAlias = async () => {
    if (!template) return;
    const trimmed = aliasInput.trim();
    if (trimmed.length > 80) {
      setAliasError('Máximo 80 caracteres.');
      return;
    }
    setIsSavingAlias(true);
    setAliasError(null);
    const newDisplayName = trimmed.length > 0 ? trimmed : null;
    try {
      await templateService.setDisplayName(
        template.name,
        newDisplayName,
        template.language,
      );
      // Atualiza estado local imediatamente (reflete no header do modal na hora)
      setSavedDisplayName(newDisplayName);
      // Atualiza cache do React Query pra lista também refletir
      queryClient.setQueriesData<Template[]>(
        { queryKey: ['templates'] },
        (current) => {
          if (!Array.isArray(current)) return current;
          return current.map((t) =>
            t.name === template.name && t.language === template.language
              ? { ...t, displayName: newDisplayName }
              : t,
          );
        },
      );
      setIsEditingName(false);
    } catch (err) {
      setAliasError(err instanceof Error ? err.message : 'Falha ao salvar.');
    } finally {
      setIsSavingAlias(false);
    }
  };

  // Generate preview with smart examples
  let previewContent = template.content;
  previewContent = previewContent
    .replace(/\{\{1\}\}/g, 'Joao')
    .replace(/\{\{2\}\}/g, '19:00')
    .replace(/\{\{3\}\}/g, '01/12')
    .replace(/\{\{4\}\}/g, 'R$ 99,90')
    .replace(/\{\{5\}\}/g, '#12345');

  const headerFormat = template.components?.find((c) => c.type === 'HEADER')?.format;
  const canRefreshPreview = Boolean(
    headerFormat && ['IMAGE', 'VIDEO', 'DOCUMENT', 'GIF'].includes(String(headerFormat).toUpperCase())
  );

  // Only show rejection if real (not "NONE")
  const hasRejection =
    details?.rejectedReason &&
    details.rejectedReason !== 'NONE' &&
    details.rejectedReason.trim() !== '';

  // Only show quality if known
  const hasQuality = details?.qualityScore && details.qualityScore !== 'UNKNOWN';

  const handleCopyContent = () => {
    navigator.clipboard.writeText(template.content);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--ds-bg-elevated)] border border-[var(--ds-border-default)] rounded-2xl w-full max-w-md p-0 shadow-[0_30px_80px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.55)] animate-in zoom-in duration-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--ds-border-default)] flex justify-between items-start gap-3">
          <div className="min-w-0 flex-1">
            {isEditingName ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSaveAlias();
                      } else if (e.key === 'Escape') {
                        setIsEditingName(false);
                        setAliasInput(savedDisplayName ?? '');
                        setAliasError(null);
                      }
                    }}
                    placeholder="Nome de exibição (apelido)"
                    maxLength={80}
                    autoFocus
                    disabled={isSavingAlias}
                    className="flex-1 bg-[var(--ds-bg-surface)] border border-[var(--ds-border-default)] rounded-md px-2 py-1 text-base font-bold text-[var(--ds-text-primary)] focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-60"
                  />
                  <button
                    onClick={handleSaveAlias}
                    disabled={isSavingAlias}
                    className="p-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors disabled:opacity-60"
                    title="Salvar"
                  >
                    {isSavingAlias ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Check size={16} />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingName(false);
                      setAliasInput(savedDisplayName ?? '');
                      setAliasError(null);
                    }}
                    disabled={isSavingAlias}
                    className="p-1.5 text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors"
                    title="Cancelar"
                  >
                    <X size={16} />
                  </button>
                </div>
                {aliasError && (
                  <p className="text-xs text-red-500">{aliasError}</p>
                )}
                <p className="text-[10px] font-mono text-[var(--ds-text-muted)] truncate">
                  {template.name}
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[var(--ds-text-primary)] truncate" title={template.name}>
                    {displayName}
                  </h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-[var(--ds-text-muted)] hover:text-purple-400 transition-colors p-0.5 shrink-0"
                    title="Renomear (apenas no app)"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
                {hasAlias && (
                  <p className="text-[10px] font-mono text-[var(--ds-text-muted)] truncate mt-0.5">
                    {template.name}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={template.status} />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[var(--ds-text-muted)] hover:text-[var(--ds-text-primary)] transition-colors p-1 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 size={24} className="animate-spin text-purple-300" />
            </div>
          ) : (
            <>
              {/* Rejection alert - only if exists */}
              {hasRejection && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-amber-200 font-bold text-sm mb-1">
                    <AlertTriangle size={14} />
                    Rejeitado
                  </div>
                  <p className="text-amber-200 text-xs">{details?.rejectedReason}</p>
                </div>
              )}

              {/* WhatsApp Preview - THE FOCUS */}
              <div className="bg-[#0b141a] rounded-xl p-3">
                <WhatsAppPhonePreview
                  components={template.components}
                  fallbackContent={previewContent}
                  parameterFormat={template.parameterFormat || 'positional'}
                  variables={PREVIEW_VARIABLES}
                  headerVariables={PREVIEW_VARIABLES}
                  headerMediaPreviewUrl={
                    template.headerMediaPreviewUrl ||
                    details?.headerMediaPreviewUrl ||
                    null
                  }
                  size="md"
                />
              </div>

              {/* Quality - only if known */}
              {hasQuality && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    details?.qualityScore === 'HIGH'
                      ? 'bg-purple-500/10 text-purple-200'
                      : details?.qualityScore === 'MEDIUM'
                        ? 'bg-amber-500/10 text-amber-200'
                        : 'bg-zinc-500/10 text-[var(--ds-text-secondary)]'
                  }`}
                >
                  <span className="text-lg">
                    {details?.qualityScore === 'HIGH'
                      ? String.fromCodePoint(0x1f7e2)
                      : details?.qualityScore === 'MEDIUM'
                        ? String.fromCodePoint(0x1f7e1)
                        : String.fromCodePoint(0x1f534)}
                  </span>
                  <span className="text-sm font-medium">
                    Qualidade {details?.qualityScore?.toLowerCase()}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer with actions */}
        <div className="px-6 py-4 border-t border-[var(--ds-border-default)] flex gap-2">
          <button
            onClick={onDelete}
            className="p-2 text-amber-600 dark:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors"
            title="Deletar"
          >
            <Trash2 size={18} />
          </button>
          {canRefreshPreview && onRefreshPreview && (
            <button
              onClick={onRefreshPreview}
              disabled={isRefreshingPreview || isLoading}
              className="px-3 py-2 bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-default)] rounded-lg font-medium hover:bg-[var(--ds-bg-hover)] transition-colors flex items-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              title="Regerar preview da midia"
            >
              {isRefreshingPreview ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <RefreshCw size={16} />
              )}
              Regerar preview
            </button>
          )}
          <button
            onClick={handleCopyContent}
            className="flex-1 py-2 bg-[var(--ds-bg-surface)] text-[var(--ds-text-secondary)] border border-[var(--ds-border-default)] rounded-lg font-medium hover:bg-[var(--ds-bg-hover)] transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Copy size={16} />
            Copiar codigo
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors text-sm"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
