import Editor from '../components/editor/editor'
import tianqi from '../components/tianqi/index'
import App from '../App.vue'

import HelloWorld from '../components/HelloWorld.vue'
import calendar from '../components/calendar.vue'
import Timer from '../components/Timer'
import pikaqiu from '../components/pikaqiu.vue'
import computer from '../components/computer/computer.vue'
import helloKitty from '../components/helloKitty/helloKitty'
import duolam from '../components/duolam/duolam.vue'
import blockBreaker from '../components/blockBreaker/blockBreaker.vue'
import triangle from '../components/Triangle'
import tetris from '../components/Tetris'
import game2048 from '../components/2048Game'
import mineDlearance from '../components/mineDlearance'
import gobang from '../components/gobang'
import play from '../components/play'
import Sudoku from '../components/Sudoku'
import huarongRoad from '../components/huarongRoad'
import xiaoxiaole from '../components/xiaoxiaole'
import randomPass from '../components/randomPass'
import myProjet from '../components/markdown/vue'
import typewriting from '../components/typewriting'
export const routes = [
  {
    path: '/', redirect: '/HelloWorld', component: App,
    children: [{ path: '/HelloWorld', component: HelloWorld, }]
  },
  {
    path: '/', redirect: '/calendar', component: App,
    children: [{ path: '/calendar', component: calendar },]
  },
  {
    path: '/', redirect: '/timer', component: App,
    children: [{ path: '/timer', component: Timer }]
  },
  {
    path: '/', redirect: '/pikaqiu', component: App,
    children: [{ path: '/pikaqiu', component: pikaqiu }]
  },
  {
    path: '/', redirect: '/computer', component: App,
    children: [{ path: '/computer', component: computer }]
  },
  {
    path: '/', redirect: '/helloKitty', component: App,
    children: [{ path: '/helloKitty', component: helloKitty }]
  },
  {
    path: '/', redirect: '/duolam', component: App,
    children: [{ path: '/duolam', component: duolam }]
  },
  {
    path: '/', redirect: '/blockBreaker', component: App,
    children: [{ path: '/blockBreaker', component: blockBreaker }]
  },
  {
    path: '/', redirect: '/editor', component: App,
    children: [{ path: '/editor', component: Editor }]
  },
  {
    path: '/', redirect: '/tianqi', component: App,
    children: [{ path: '/tianqi', component: tianqi }]
  },
  {
    path: '/', redirect: '/triangle', component: App,
    children: [{ path: '/triangle', component: triangle }]
  },
  {
    path: '/', redirect: '/tetris', component: App,
    children: [{ path: '/tetris', component: tetris }]
  },
  {
    path: '/', redirect: '/2048', component: App,
    children: [{ path: '/2048', component: game2048 }]
  },
  {
    path: '/', redirect: '/mineDlearance', component: App,
    children: [{ path: '/mineDlearance', component: mineDlearance }]
  },
  {
    path: '/', redirect: '/gobang', component: App,
    children: [{ path: '/gobang', component: gobang }]
  },
  {
    path: '/', redirect: '/play2', component: App,
    children: [{ path: '/play2', component: play }]
  },
  {
    path: '/', redirect: '/Sudoku', component: App,
    children: [{ path: '/Sudoku', component: Sudoku }]
  },
  {
    path: '/', redirect: '/huarongRoad', component: App,
    children: [{ path: '/huarongRoad', component: huarongRoad }]
  },
  {
    path: '/', redirect: '/xiaoxiaole', component: App,
    children: [{ path: '/xiaoxiaole', component: xiaoxiaole }]
  },
  {
    path: '/', redirect: '/randomPass', component: App,
    children: [{ path: '/randomPass', component: randomPass }]
  },
  {
    path: '/', redirect: '/myProject', component: App,
    children: [{ path: '/myProject', component: myProjet }]
  },
  {
    path: '/', redirect: '/typewriting', component: App,
    children: [{ path: '/typewriting', component: typewriting }]
  }
  
]
1