import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { getMuiTheme } from 'material-ui/styles'
import { MuiThemeProvider } from 'material-ui'
import { Provider } from 'react-redux'
import configStore from 'store'
import routes from '../../router'

const initialState = {}
const store = configStore(initialState)

const muiTheme = getMuiTheme({})

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter basename="/">
            {routes}
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
