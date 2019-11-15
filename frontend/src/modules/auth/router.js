export default [{
  path: 'auth/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ './views/Login')
}, {
  path: 'auth/logout',
  name: 'Logout',
  component: () => import(/* webpackChunkName: "logout" */ './views/Logout')
}]
