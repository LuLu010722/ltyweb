import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import { ltyTheme } from './theme'
import { IndexPage } from './pages'
import { InfoPage } from './pages/info'
import { FeedbackPage } from './pages/feedback'

export const App = () => {
  return (
    <ThemeProvider theme={ltyTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route path="/info">
            <InfoPage />
          </Route>
          <Route path="/feedback">
            <FeedbackPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
