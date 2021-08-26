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

export const App = () => {
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
            <LoginPage />
          </Route>
          <Route path={menuList[0].path}>
            <LTYLayout>
              <IndexPage />
            </LTYLayout>
          </Route>
          <Route path={menuList[1].path}>
            <LTYLayout>
              <InfoPage />
            </LTYLayout>
          </Route>
          <Route path={menuList[2].path}>
            <LTYLayout>
              <FeedbackPage />
            </LTYLayout>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
