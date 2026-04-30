'use client'

import React from 'react'
import { Wand2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { FormHeaderProps } from './types'

export function FormHeader({ showHeaderActions, onOpenAI, onOpenTemplate }: FormHeaderProps) {
  if (!showHeaderActions) {
    return null
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        className="border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-hover)]"
        onClick={onOpenAI}
      >
        <Wand2 className="h-4 w-4" />
        Gerar com IA
      </Button>
      <Button
        type="button"
        variant="outline"
        className="border-[var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-hover)]"
        onClick={onOpenTemplate}
      >
        Importar modelo
      </Button>
    </div>
  )
}
