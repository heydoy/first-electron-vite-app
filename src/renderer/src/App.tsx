import Navigation from './components/feat/Navigation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Labeling, List, Main } from './pages'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/labeling" element={<Labeling />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
