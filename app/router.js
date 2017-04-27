import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Profile from './containers/Profile' // 引入各容器组件
import Test from './containers/Test' // 引入各容器组件

const routes = (
  <div>
    <HashRouter>
      <div>
        <Route path="/test" component={Test} />
        <Route path="/app" component={Profile} />
      </div>
    </HashRouter>
  </div>
)

export default routes
