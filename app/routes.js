import React from 'react'
import Loadable from 'react-loadable'
import HotLoader from 'react-hot-component-loader'
import HashRouter from 'react-router-dom/HashRouter'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import LoadingComponent from 'containers/LoadingComponent'

const LoadComponent = (loader) => {
  if (process.env.NODE_ENV === 'production') {
    return Loadable({
      loader,
      loading: LoadingComponent,
      delay: 500,
    })
  }
  return HotLoader(
    loader,
    {
      LoadingComponent,
    }
  )
}

const Game2048 = LoadComponent(() => (
  import(/* webpackChunkName: "Game2048" */'containers/Game2048'))
)
const Profile = LoadComponent(() => (
  import(/* webpackChunkName: "Profile" */'containers/Profile'))
)
const Test = LoadComponent(() => (
  import(/* webpackChunkName: "Test" */'containers/Test'))
)
const Home = LoadComponent(() => (
  import(/* webpackChunkName: "Home" */'containers/Home'))
)
const Example = LoadComponent(() => (
  import(/* webpackChunkName: "Example" */'containers/Example'))
)
const Library = LoadComponent(() => (
  import(/* webpackChunkName: "Library" */'containers/Library'))
)

const routes = (
  <div>
    <Route path='/' component={Home} exact strict />
    <Route path='/test' component={Test} exact strict />
    <Route path='/pro' component={Profile} exact strict />
    <Route path='/2048' component={Game2048} exact strict />
    <Route path='/example' component={Example} exact strict />
    <Route path='/library' component={Library} exact strict />
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
