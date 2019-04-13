import CreateEvent from './views/CreateEvent'
import JoinEvent from './views/JoinEvent'
import LeaveEvent from './views/LeaveEvent'

export default [{
  path: '/event/create',
  name: 'CreateEvent',
  component: CreateEvent
}, {
    path: '/event/join',
    name: 'JoinEvent',
    component: JoinEvent,
}, {
    path: '/event/leave',
    name: 'LeaveEvent',
    component: LeaveEvent
}]
