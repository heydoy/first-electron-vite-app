import Navigation from './components/feat/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Labeling, List, Main } from './pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/labeling" element={<Labeling />} />
          <Route path="/list" element={<List />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
