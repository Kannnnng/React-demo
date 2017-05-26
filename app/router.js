import React from 'react'
import { Route } from 'react-router-dom'
import Home from 'containers/Home'
import Profile from 'containers/Profile' // 引入各容器组件
import Test from 'containers/Test' // 引入各容器组件

let baseName = null
if (process.env.NODE_ENV === 'production') {
  baseName = '/React-demo/'
} else {
  baseName = '/'
}

const routes = (
  <div>
    <Route path={`${baseName}`} component={Home} exact strict />
    <Route path={`${baseName}test`} component={Test} exact strict />
    <Route path={`${baseName}pro`} component={Profile} exact strict />
  </div>
)

export default routes
