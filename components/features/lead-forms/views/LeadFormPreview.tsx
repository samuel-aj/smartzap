'use client'

import type { LeadFormField } from '@/types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { InternationalPhoneInput } from '@/components/ui/international-phone-input'

export interface LeadFormPreviewProps {
  title: string
  collectEmail: boolean
  fields: LeadFormField[]
}

export function LeadFormPreview({ title, collectEmail, fields }: LeadFormPreviewProps) {
  return (
    <Container variant="subtle" padding="md">
      <div className="mb-3">
        <p className="text-sm font-medium dark:text-white text-[var(--ds-text-primary)]">Pre-visualizacao</p>
        <p className="text-xs text-[var(--ds-text-muted)]">Assim vai aparecer para a pessoa que abrir o link publico.</p>
      </div>

      <Container variant="default" padding="md">
        <div className="mb-4">
          <p className="text-lg font-semibold dark:text-white text-[var(--ds-text-primary)]">{title || 'Formulario'}</p>
          <p className="text-xs text-[var(--ds-text-muted)]">Preencha seus dados para ser adicionado automaticamente na lista.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input className="bg-[var(--ds-bg-surface)] border-[var(--ds-border-strong)]" placeholder="Seu nome" disabled value="" readOnly />
          </div>

          <div className="space-y-2">
            <Label>Telefone (WhatsApp)</Label>
            <InternationalPhoneInput
              value=""
              onChange={() => {}}
              defaultCountry="br"
              preferredCountries={['br', 'us', 'pt', 'mx', 'ar', 'cl', 'co', 'es']}
              disabled
            />
          </div>

          {collectEmail ? (
            <div className="space-y-2">
              <Label>Email (opcional)</Label>
              <Input className="bg-[var(--ds-bg-surface)] border-[var(--ds-border-strong)]" placeholder="voce@exemplo.com" disabled value="" readOnly />
            </div>
          ) : null}

          {fields.length > 0 ? (
            <div className="space-y-4">
              {fields.map((f, idx) => {
                const key = f.key || `campo_${idx}`

                if (f.type === 'select') {
                  return (
                    <div key={`${key}-${idx}`} className="space-y-2">
                      <Label>
                        {f.label}
                        {f.required ? ' *' : ''}
                      </Label>
                      <select
                        className="h-10 w-full rounded-md border border-[var(--ds-border-strong)] bg-[var(--ds-bg-surface)] px-3 text-sm"
                        disabled
                        value=""
                      >
                        <option value="">Selecionar...</option>
                        {(f.options || []).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                }

                const inputType = f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'
                return (
                  <div key={`${key}-${idx}`} className="space-y-2">
                    <Label>
                      {f.label}
                      {f.required ? ' *' : ''}
                    </Label>
                    <Input className="bg-[var(--ds-bg-surface)] border-[var(--ds-border-strong)]" disabled value="" readOnly type={inputType} />
                  </div>
                )
              })}
            </div>
          ) : null}

          <Button type="button" className="w-full" disabled>
            Enviar (preview)
          </Button>
        </div>
      </Container>
    </Container>
  )
}
