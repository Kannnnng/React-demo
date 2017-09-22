import React from 'react'
import HotLoader from 'react-hot-component-loader'
import Loadable from 'react-loadable'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import HashRouter from 'react-router-dom/HashRouter'
import Route from 'react-router-dom/Route'
import LoadingComponent from 'containers/LoadingComponent'

const LoadComponent = (loader) => {
  if (process.env.NODE_ENV === 'production') {
    return Loadable({
      loader,
      LoadingComponent,
    })
  }
  return HotLoader(
    loader,
    {
      LoadingComponent,
    }
  )
}

const Game2048 = LoadComponent(() => import('containers/Game2048'))
const Profile = LoadComponent(() => import('containers/Profile'))
const Test = LoadComponent(() => import('containers/Test'))
const Home = LoadComponent(() => import('containers/Home'))
const Example = LoadComponent(() => import('containers/Example'))

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

export default function Routes() {
  return (
    <Router basename='/'>
      {routes}
    </Router>
  )
}
