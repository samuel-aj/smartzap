'use client'

import type { LeadForm } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormCard } from './FormCard'

export interface FormListProps {
  forms: LeadForm[]
  publicBaseUrl: string
  isLoading: boolean
  error?: string
  deleteError?: string
  isCopied: boolean
  isDeleting: boolean
  onCopyLink: (url: string) => void
  onEdit: (form: LeadForm) => void
  onDelete: (id: string) => void
}

export function FormList({
  forms,
  publicBaseUrl,
  isLoading,
  error,
  deleteError,
  isCopied,
  isDeleting,
  onCopyLink,
  onEdit,
  onDelete,
}: FormListProps) {
  return (
    <Card className="border-[var(--ds-border-default)] bg-[var(--ds-bg-elevated)]">
      <CardHeader>
        <CardTitle className="dark:text-white text-[var(--ds-text-primary)]">Seus formularios</CardTitle>
        <CardDescription className="text-[var(--ds-text-muted)]">
          Copie o link e compartilhe com os alunos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-200">{error}</div>
        ) : null}

        {deleteError ? (
          <div className="mb-3 rounded-lg border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-200">{deleteError}</div>
        ) : null}

        {isLoading ? (
          <div className="text-sm text-[var(--ds-text-muted)]">Carregando...</div>
        ) : forms.length === 0 ? (
          <div className="text-sm text-[var(--ds-text-muted)]">Nenhum formulario ainda.</div>
        ) : (
          <div className="space-y-3">
            {forms.map((form) => (
              <FormCard
                key={form.id}
                form={form}
                publicBaseUrl={publicBaseUrl}
                isCopied={isCopied}
                isDeleting={isDeleting}
                onCopyLink={onCopyLink}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
