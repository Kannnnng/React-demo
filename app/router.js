import React from 'react'
import { Route } from 'react-router-dom'
import Home from 'containers/Home'
import AsyncComponent from './AsyncComponent'

const Game2048 = AsyncComponent(() => import('containers/Game2048'))
const Profile = AsyncComponent(() => import('containers/Profile'))
const Test = AsyncComponent(() => import('containers/Test'))

const routes = (
  <div>
    <Route path="/" component={Home} exact strict />
    <Route path="/test" component={Test} exact strict />
    <Route path="/pro" component={Profile} exact strict />
    <Route path="/2048" component={Game2048} exact strict />
  </div>
)

export default routes
