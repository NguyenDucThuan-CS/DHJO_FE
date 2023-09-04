import './App.css'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Login/Register.tsx'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
