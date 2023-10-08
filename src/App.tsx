import './App.css'
import { TotalInfo, MyNews, Login, Register, MyProfiles, FavoriteHelpers } from './pages/index.tsx'
import { Route, Routes } from 'react-router-dom'
import { PrivateRouter } from './routes/Private.tsx'
import { PublicRouter } from './routes/PublicRouter.tsx'
import Profiles from './pages/Profiles/Profies.tsx'
import CreateNews from './pages/CreateNews/CreateNews.tsx'
import Helper from './pages/Helpers/Helper.tsx'

function App() {
  return (
    <Routes>
      <Route
        path='/owner'
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
        path='owner/my-news'
        element={
          <PrivateRouter>
            <MyNews />
          </PrivateRouter>
        }
      />

      <Route
        path='owner/my-profiles'
        element={
          <PrivateRouter>
            <MyProfiles />
          </PrivateRouter>
        }
      />

      <Route
        path='owner/favorite-helpers'
        element={
          <PrivateRouter>
            <FavoriteHelpers />
          </PrivateRouter>
        }
      />

      <Route
        path='owner/profiles'
        element={
          <PrivateRouter>
            <Profiles />
          </PrivateRouter>
        }
      />

      <Route
        path='owner/create-news'
        element={
          <PrivateRouter>
            <CreateNews />
          </PrivateRouter>
        }
      />

      <Route
        path='/helper'
        element={
          <PrivateRouter>
            <Helper />
          </PrivateRouter>
        }
      />
    </Routes>
  )
}

export default App
