import Navigation from './components/feat/Navigation'
import { NavigationProps } from './components/feat/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, Project, Labeling } from './pages'
import QueryProvider from './react-query/queryClient'

// - React Router
// 참고: https://lulu-developmentlog.tistory.com/266
function App(): JSX.Element {
  return (
    <QueryProvider>
      <DefaultPage />
    </QueryProvider>
  )
}

function DefaultPage(): JSX.Element {
  const navigationProps: NavigationProps[] = [
    { icon: 'labeling', desc: 'labeling', route: 'labeling' },
    { icon: 'project', desc: 'project', route: 'project' }
  ]

  return (
    <BrowserRouter>
      <Navigation navList={navigationProps} />
      <Routes>
        <Route path="/labeling" element={<Labeling />} />
        <Route path="/project" element={<Project />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
