import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import { ltyTheme } from './theme'
import { IndexPage } from './pages'
import { InfoPage } from './pages/info'
import { FeedbackPage } from './pages/feedback'
import { LTYLayout } from './layouts/LTYLayout'
import { menuList } from './data/global'
import { LoginPage } from './pages/login'
import { useState } from 'react'
import { SignInPage } from './pages/signin'

export const App = () => {
  const [login, setLogin] = useState(false)
  return (
    <ThemeProvider theme={ltyTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          </Route>
          <Route path="/login">
            <LoginPage setLogin={setLogin} />
          </Route>
          <Route path="/signin">
            <SignInPage />
          </Route>
          <Route path={menuList[0].path}>
            {login ? (
              <LTYLayout>
                <IndexPage />
              </LTYLayout>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            )}
          </Route>
          <Route path={menuList[1].path}>
            {login ? (
              <LTYLayout>
                <InfoPage />
              </LTYLayout>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            )}
          </Route>
          <Route path={menuList[2].path}>
            {login ? (
              <LTYLayout>
                <FeedbackPage />
              </LTYLayout>
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                }}
              />
            )}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
