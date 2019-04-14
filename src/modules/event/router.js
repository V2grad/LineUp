import CreateEvent from './views/CreateEvent'
import JoinEvent from './views/JoinEvent'
import JoinEventConfirm from './views/JoinEventConfirm'
import LeaveEvent from './views/LeaveEvent'

export default [{
  path: '/event/create',
  name: 'CreateEvent',
  component: CreateEvent
}, {
    path: '/event/join',
    name: 'JoinEvent',
    component: JoinEvent,
},{
  path: '/event/join/confirm',
  name: 'JoinEventConfirm',
  component: JoinEventConfirm
}, {
    path: '/event/leave',
    name: 'LeaveEvent',
    component: LeaveEvent
}]
