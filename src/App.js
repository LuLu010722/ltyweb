import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import './App.css'
import { ltyTheme } from './theme'

function App() {
  return (
    <ThemeProvider theme={ltyTheme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <div>hello world</div>
          </Route>
          <Route path="/info">
            <div>This is all my info</div>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
