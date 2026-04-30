import { Page, PageDescription, PageHeader, PageTitle, PageActions } from '@/components/ui/page'
import { Container } from '@/components/ui/container'

/**
 * Skeleton de Forms para Suspense/Streaming.
 */
export function FormsSkeleton() {
  return (
    <Page>
      <PageHeader>
        <div>
          <PageTitle>Formulários</PageTitle>
          <PageDescription>Capture leads com formulários públicos</PageDescription>
        </div>
        <PageActions>
          <div className="h-10 w-36 bg-primary-600/50 rounded-lg animate-pulse" />
        </PageActions>
      </PageHeader>

      <Container variant="glass" padding="none" className="rounded-2xl overflow-hidden">
        {/* Table Skeleton */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--ds-border-subtle)]">
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-20 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-16 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="h-4 w-24 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                </th>
                <th className="px-6 py-4 text-right">
                  <div className="h-4 w-16 bg-[var(--ds-bg-surface)] rounded animate-pulse ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-[var(--ds-border-subtle)]">
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 w-40 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                      <div className="h-3 w-24 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-16 bg-[var(--ds-bg-surface)] rounded-full animate-pulse" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-48 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                      <div className="h-8 w-8 bg-[var(--ds-bg-surface)] rounded animate-pulse" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Page>
  )
}
