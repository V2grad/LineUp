import UserProfile from './views/UserProfile'

export default [{
  path: '/user',
  name: 'UserProfile',
  component: UserProfile
}, {
  path: '/user/logout',
  name: 'UserLogout',
  component: UserProfile
}]
