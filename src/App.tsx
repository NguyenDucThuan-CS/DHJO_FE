import './App.css'
import { TotalInfo, MyNews, Login, Register, MyProfiles, FavoriteHelpers } from './pages/index.tsx'
import { Route, Routes } from 'react-router-dom'
import { PrivateRouter } from './routes/Private.tsx'
import { PublicRouter } from './routes/PublicRouter.tsx'
import Profiles from './pages/Profiles/Profies.tsx'
function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRouter>
            <TotalInfo />
          </PrivateRouter>
        }
      />
      <Route
        path='/login'
        element={
          <PublicRouter>
            <Login />
          </PublicRouter>
        }
      />
      <Route
        path='/register'
        element={
          <PublicRouter>
            <Register />
          </PublicRouter>
        }
      />

      <Route
        path='/my-news'
        element={
          <PrivateRouter>
            <MyNews />
          </PrivateRouter>
        }
      />

      <Route
        path='/my-profiles'
        element={
          <PrivateRouter>
            <MyProfiles />
          </PrivateRouter>
        }
      />

      <Route
        path='/favorite-helpers'
        element={
          <PrivateRouter>
            <FavoriteHelpers />
          </PrivateRouter>
        }
      />

      <Route
        path='/profiles'
        element={
          <PrivateRouter>
            <Profiles />
          </PrivateRouter>
        }
      />
    </Routes>
  )
}

export default App
