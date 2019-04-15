import ShowUser from './views/ShowUser'
import ManageEvent from './views/ManageEvent'

export default [{
  path: '/manage/user',
  name: 'ShowUser',
  component: ShowUser
}, {
  path: '/manage/event',
  name: 'ManageEvent',
  component: ManageEvent
}]
