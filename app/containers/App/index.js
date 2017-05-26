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

const baseName = process.env.NODE_ENV === 'production' ? '/React-demo/' : '/'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter basename={baseName}>
            {routes}
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
