import React from 'react'
import { Route } from 'react-router-dom'
import Game2048 from 'containers/Game2048'
import Home from 'containers/Home'
import Profile from 'containers/Profile'
import Test from 'containers/Test'

const routes = (
  <div>
    <Route path="/" component={Home} exact strict />
    <Route path="/test" component={Test} exact strict />
    <Route path="/pro" component={Profile} exact strict />
    <Route path="/2048" component={Game2048} exact strict />
  </div>
)

export default routes
