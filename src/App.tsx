import './App.css'
import { TotalInfo, MyNews, Login, Register, MyProfiles, FavoriteHelpers } from './pages/index.tsx'
import { Route, Routes } from 'react-router-dom'
import { PrivateRouter } from './routes/Private.tsx'
import { PublicRouter } from './routes/PublicRouter.tsx'
import Profiles from './pages/Profiles/Profies.tsx'
import CreateNews from './pages/CreateNews/CreateNews.tsx'
import Helper from './pages/Helpers/Helper.tsx'
import ProfileHelper from './pages/ProfileHelper/Profies.tsx'
import WorkingSchedule from './pages/WorkingSchedule/WorkingSchedule.tsx'
import ActvitiveHelper from './pages/ActivitiveHelper/ActivitiveHelper.tsx'
import DetailHelper from './pages/DetailHelper/DetailHelper.tsx'
//import WorkingScheduleDemo from './pages/WorkingSchedule/WorkingScheduleDemo.tsx'

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
        path='owner/detail-helper'
        element={
          <PrivateRouter>
            <DetailHelper />
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

      <Route
        path='/helper/profiles'
        element={
          <PrivateRouter>
            <ProfileHelper />
          </PrivateRouter>
        }
      />
      <Route
        path='/helper/schedules'
        element={
          <PrivateRouter>
            <WorkingSchedule />
          </PrivateRouter>
        }
      />

      <Route
        path='/helper/activitive'
        element={
          <PrivateRouter>
            <ActvitiveHelper />
          </PrivateRouter>
        }
      />
    </Routes>
  )
}

export default App
