import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import { ltyTheme } from './theme'
import { IndexPage } from './pages'
import { InfoPage } from './pages/info'
import { FeedbackPage } from './pages/feedback'
import { LTYLayout } from './layouts/LTYLayout'
import { menuList } from './data/global'

export const App = () => {
  return (
    <ThemeProvider theme={ltyTheme}>
        <Router>
          <LTYLayout>
            <Switch>
              <Route exact path={menuList[0].path}>
                <IndexPage />
              </Route>
              <Route path={menuList[1].path}>
                <InfoPage />
              </Route>
              <Route path={menuList[2].path}>
                <FeedbackPage />
              </Route>
            </Switch>
          </LTYLayout>
        </Router>
    </ThemeProvider>
  )
}
