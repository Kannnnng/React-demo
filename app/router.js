import Profile from './containers/Profile' // 引入各容器组件
import Test from './containers/Test' // 引入各容器组件

const routes = [
  {
    path: '/',
    component: Test,
    name: '测试',
  },
  {
    path: '/app',
    component: Profile,
    name: '个人信息',
  },
]

export default routes
