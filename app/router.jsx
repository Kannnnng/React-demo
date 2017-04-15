import React from 'react'
import { Route, IndexRoute } from 'react-router' // 引入react路由
import Profile from './containers/Profile/index.jsx' // 引入各容器组件

const routes = (
  <Route path="/" component={Profile}>
    <IndexRoute component={Profile} />
  </Route>
)

export default routes
