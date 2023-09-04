import './App.css'
import Login from './pages/Login/Login.tsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
  )
}

export default App
