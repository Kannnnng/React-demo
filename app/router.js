import React from 'react'
import { Route } from 'react-router-dom'
import Home from 'containers/Home'
import Profile from 'containers/Profile' // 引入各容器组件
import Test from 'containers/Test' // 引入各容器组件

const routes = (
  <div>
    <Route path="/" component={Home} exact strict />
    <Route path="/test" component={Test} exact strict />
    <Route path="/pro" component={Profile} exact strict />
  </div>
)

export default routes
