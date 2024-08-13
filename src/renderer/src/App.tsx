import Navigation from './components/feat/Navigation'
import { NavigationProps } from './components/feat/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, Project, Labeling, List } from './pages'
import QueryProvider from './react-query/queryClient'
import ListForm from './components/pure/ListForm'
import { ListDataType } from './api/list'

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
    { icon: 'project', desc: 'project', route: 'project' },
    { icon: 'list', desc: 'list', route: 'list' },
    { icon: 'formtest', desc: 'formtest', route: 'form' }
  ]
  const formData: Omit<ListDataType, 'index'> = {
    title: 'hi',
    description: 'me',
    link: '/link'
  }
  return (
    <BrowserRouter>
      <Navigation navList={navigationProps} />
      <Routes>
        <Route path="/labeling" element={<Labeling />} />
        <Route path="/project" element={<Project />} />
        <Route path="/list" element={<List />} />
        <Route path="/form" element={<ListForm formData={formData} index={0} isEdit={true} />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
