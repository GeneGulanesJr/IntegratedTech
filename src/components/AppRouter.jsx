import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Homepage from '../pages/Homepage'
import Loginpage from '../pages/Loginpage'
import NotfoundPage from '../pages/NotfoundPage'
import Profilepage from '../pages/Profile/Profile'
  import EditProfile from '../pages/Profile/Update'
import Registerpage from '../pages/Registerpage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import TestPage from '../pages/TestPage'
import TargetClientList from '../pages/TargetClientList/TargetClientList'
  import CreateClient from '../pages/TargetClientList/Create'
  import UpdateClient from '../pages/TargetClientList/Update'
import SocialWorker from '../pages/SocialWorker/SocialWorker'
  import CreateSocialWorker from '../pages/SocialWorker/Create'
  import UpdateSocialWorker from '../pages/SocialWorker/Update'






export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <ProtectedRoute exact path='/login' component={Loginpage} />
          <ProtectedRoute exact path='/register' component={Registerpage} />
          <ProtectedRoute exact path='/profile' component={Profilepage} />
          <ProtectedRoute exact path='/profile/edit' component={EditProfile} />
          <ProtectedRoute exact path='/test' component={TestPage} />
          <ProtectedRoute exact path='/social-worker' component={SocialWorker}/>
          <ProtectedRoute exact path='/social-worker/create' component={CreateSocialWorker}/>
          <ProtectedRoute exact path='/social-worker/update' component={UpdateSocialWorker}/>
          <ProtectedRoute exact path='/target-client-list' component={TargetClientList}/>
          <ProtectedRoute exact path='/target-client-list/create' component={CreateClient}/>
          <ProtectedRoute exact path='/target-client-list/update' component={UpdateClient}/>



          <ProtectedRoute
            exact
            path='/forgot-password'
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            exact
            path='/reset-password'
            component={ResetPasswordPage}
          />
          <Route exact path='*' component={NotfoundPage} />
        </Switch>
      </Router>
    </>
  )
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth()
  const { path } = props
  console.log('path', path)
  const location = useLocation()
  console.log('location state', location.state)

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgot-password' ||
    path === '/reset-password'
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? '/profile'} />
    ) : (
      <Route {...props} />
    )
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  )
}
