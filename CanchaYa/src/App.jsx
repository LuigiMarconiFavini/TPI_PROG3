import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import NotFound from './components/notFound/NotFound'

function App() {

  return (
    <>
      {<NotFound /> /* Falta implementar bien la lógica cuando hagamos hecho el login */}
      <Dashboard/>
    </>
  )
}

export default App
