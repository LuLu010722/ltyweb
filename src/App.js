import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { ConfirmProvider } from 'material-ui-confirm'

import { ltyTheme } from './theme'
import { IndexPage } from './pages'
import { InfoPage } from './pages/info'
import { FeedbackPage } from './pages/feedback'
import { LTYLayout } from './layouts/LTYLayout'

export const App = () => {
  return (
    <ThemeProvider theme={ltyTheme}>
      <ConfirmProvider
        defaultOptions={{
          confirmationText: '确认',
          cancellationText: '取消',
          confirmationButtonProps: {
            variant: 'outlined',
          },
          cancellationButtonProps: {
            variant: 'outlined',
          },
        }}
      >
        <Router>
          <LTYLayout>
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
          </LTYLayout>
        </Router>
      </ConfirmProvider>
    </ThemeProvider>
  )
}
