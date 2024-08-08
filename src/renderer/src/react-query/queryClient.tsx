import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient()

const QueryProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <QueryClientProvider client={client}>
    <ReactQueryDevtools initialIsOpen={false} />
    {children}
  </QueryClientProvider>
)

export default QueryProvider
