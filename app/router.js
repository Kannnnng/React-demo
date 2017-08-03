import React from 'react'
import Loadable from 'react-loadable'
import { Route } from 'react-router-dom'
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

export default routes
