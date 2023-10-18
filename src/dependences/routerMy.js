// import VueRouter from 'vue-router'
import Login from '../components/hospital/Login'
import HelloWorld from '../components/hospital/HelloWorld'
import Forword from '../components/hospital/Forword'
import Register from '../components/hospital/Register'
import Select from '../components/hospital/Select'
import Mzhengpaiban from '../components/hospital/Mzhengpaiban'
import Navigation from '../components/hospital/Navigation'
import DoctorDetail from '../components/hospital/DoctorDetail'
import MedicalKnowledge from '../components/hospital/MedicalKnowledge'
import OnlineConsultation from '../components/hospital/Onlineconsultation/OnlineConsultation'
import Talk from '../components/hospital/Onlineconsultation/Talk'
import Charge from '../components/hospital/Charge'
import ChargeMoney from '../components/hospital/ChargeMoney'
import RegisterDoctor from '../components/hospital/RegisterDoctor'
import Reservation from '../components/hospital/Reservation'
import History from '../components/hospital/Onlineconsultation/History'
import Prescription from '../components/hospital/Prescription'
import DoctorMz from '../components/hospital/DoctorMz'
import Welcome from '../components/hospital/Welcome'
import ManageLogin from '../components/hospital/manage/Login'
import ManageNavigation from '../components/hospital/manage/Navigation'
import ManagePrescription from '../components/hospital/manage/Prescription'
import ManageMengZheng from '../components/hospital/manage/MengZheng'
import ManageReservation from '../components/hospital/manage/Reservation'
import DoctorManage from '../components/hospital/manage/DoctorManage'
import App from '../App.vue'

// import Vue from 'vue'

// const originalPush = VueRouter.prototype.push

// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// Vue.use(VueRouter)
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/hospital', component: App, redirect: '/hospital/login' },
  { path: '/hospital/manage/login', component: ManageLogin },
  { path: '/hospital/login', component: Login },
  { path: '/hospital/talk/:id', component: HelloWorld },
  { path: '/hospital/forword', component: Forword },
  { path: '/hospital/register', component: Register },
  { path: '/hospital/select/:id', component: Select },
  {
    path: '/hospital/navigation', component: Navigation, redirect: '/hospital/navigation/welcome',
    children: [
      { path: 'mengzhengpaiban', component: Mzhengpaiban },
      { path: ':id/medicalknowledge', component: MedicalKnowledge },
      {
        path: 'onlineconsultation', component: OnlineConsultation,
      },
      {
        path: 'history', component: History
      },
      {
        path: 'charge', component: Charge
      },
      { path: 'reservation', component: Reservation },
      {
        path: 'prescription', component: Prescription
      },
      { path: 'doctorMz', component: DoctorMz },
      {
        path: 'welcome', component: Welcome
      }
    ]
  },
  {
    path: '/hospital/manage/navigation', component: ManageNavigation, redirect: '/hospital/manage/navigation/welcome', children: [
      {
        path: 'welcome', component: Welcome
      },
      {
        path: 'prescription', component: ManagePrescription
      },
      { path: 'mengzheng', component: ManageMengZheng },
      { path: 'reservation', component: ManageReservation },
      { path: 'doctor', component: DoctorManage }
    ]
  },
  { path: '/hospital/talkdoctor/:id', component: Talk, name: 'talkdoctor' },
  {
    path: '/hospital/doctor', component: DoctorDetail
  },
  {
    path: '/hospital/chargeMoney/:id', name: 'ChargeMoney', component: ChargeMoney
  },
  {
    path: '/hospital/doctor/register', component: RegisterDoctor
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
// const router = new VueRouter({
//   routes // (缩写) 相当于 routes: routes
// })

export default routes