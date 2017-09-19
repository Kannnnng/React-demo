import React from 'react'
import HotLoader from 'react-hot-component-loader'
// import Loadable from 'react-loadable'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import HashRouter from 'react-router-dom/HashRouter'
import Route from 'react-router-dom/Route'
import LoadingComponent from 'containers/LoadingComponent'

const Game2048 = HotLoader(
  () => import('containers/Game2048'),
  {
    LoadingComponent,
  },
)

const Profile = HotLoader(
  () => import('containers/Profile'),
  {
    LoadingComponent,
  },
)

const Test = HotLoader(
  () => import('containers/Test'),
  {
    LoadingComponent,
  },
)

const Home = HotLoader(
  () => import('containers/Home'),
  {
    LoadingComponent,
  },
)

const Example = HotLoader(
  () => import('containers/Example'),
  {
    LoadingComponent,
  },
)

const routes = (
  <div>
    <Route path='/' component={Home} exact strict />
    <Route path='/test' component={Test} exact strict />
    <Route path='/pro' component={Profile} exact strict />
    <Route path='/2048' component={Game2048} exact strict />
    <Route path='/example' component={Example} exact strict />
  </div>
)

const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

class Routes extends React.Component {
  render() {
    return (
      <Router basename='/'>
        {routes}
      </Router>
    )
  }
}

export default Routes
