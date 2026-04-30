import { Page, PageDescription, PageHeader, PageTitle } from '@/components/ui/page'
import { Container } from '@/components/ui/container'

/**
 * Skeleton de Campanhas para Suspense/Streaming.
 * Exibido enquanto os dados estão sendo carregados no servidor.
 */
export function CampaignsSkeleton() {
  return (
    <Page>
      <PageHeader>
        <div>
          <PageTitle>Campanhas</PageTitle>
          <PageDescription>Gerencie suas campanhas de mensagens</PageDescription>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-[var(--ds-bg-surface)] rounded-lg animate-pulse" />
          <div className="h-10 w-36 bg-primary-600/50 rounded-lg animate-pulse" />
        </div>
      </PageHeader>

      <Container variant="glass" padding="none" className="overflow-hidden rounded-2xl">
        {/* Filters Skeleton */}
        <div className="p-4 border-b border-[var(--ds-border-subtle)] flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 h-10 bg-[var(--ds-bg-surface)] rounded-lg animate-pulse" />
          {/* Status Filter */}
          <div className="h-10 w-32 bg-[var(--ds-bg-surface)] rounded-lg animate-pulse" />
          {/* Folder Filter */}
          <div className="h-10 w-32 bg-[var(--ds-bg-surface)] rounded-lg animate-pulse" />
          {/* Tag Filter */}
          <div className="h-10 w-32 bg-[var(--ds-bg-surface)] rounded-lg animate-pulse" />
        </div>

        {/* Results Info Skeleton */}
        <div className="px-4 py-2 border-b border-[var(--ds-border-subtle)]">
          <div className="h-4 w-48 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
        </div>

        {/* Cards Skeleton */}
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-4 border border-[var(--ds-border-default)] rounded-xl bg-[var(--ds-bg-elevated)]"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-5 w-48 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                  <div className="h-3 w-32 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                </div>
                <div className="h-6 w-20 bg-[var(--ds-bg-surface)] rounded-full animate-pulse" />
              </div>

              {/* Progress */}
              <div className="mt-3 space-y-2">
                <div className="h-2 w-full bg-[var(--ds-bg-surface)] rounded-full animate-pulse" />
                <div className="flex items-center gap-3">
                  <div className="h-3 w-24 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                  <div className="h-3 w-20 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 pt-3 border-t border-[var(--ds-border-subtle)] flex items-center justify-between">
                <div className="h-3 w-20 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-8 w-8 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="p-4 border-t border-[var(--ds-border-subtle)] flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 w-8 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
          ))}
        </div>
      </Container>
    </Page>
  )
}
