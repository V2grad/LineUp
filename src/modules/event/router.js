import CreateEvent from './views/CreateEvent'
import JoinEvent from './view/JoinEvent'
import LeaveEvent from './view/LeaveEvent'

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
