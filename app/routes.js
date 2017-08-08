import React from 'react'
import Loadable from 'react-loadable'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import HashRouter from 'react-router-dom/HashRouter'
import Route from 'react-router-dom/Route'
import LoadingComponent from 'containers/LoadingComponent'

const Game2048 = Loadable({
  loader: () => import('containers/Game2048'),
  loading: LoadingComponent,
})

const Profile = Loadable({
  loader: () => import('containers/Profile'),
  loading: LoadingComponent,
})

const Test = Loadable({
  loader: () => import('containers/Test'),
  loading: LoadingComponent,
})

const Home = Loadable({
  loader: () => import('containers/Home'),
  loading: LoadingComponent,
})

const routes = (
  <div>
    <Route path="/" component={Home} exact strict />
    <Route path="/test" component={Test} exact strict />
    <Route path="/pro" component={Profile} exact strict />
    <Route path="/2048" component={Game2048} exact strict />
  </div>
)

const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter

class Routes extends React.Component {
  render() {
    return (
      <Router basename="/">
        {routes}
      </Router>
    )
  }
}

export default Routes
