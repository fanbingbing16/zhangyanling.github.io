import HelloWorld from '../components/HelloWorld.vue'
import App from '../App.vue'
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
import Editor from '../components/editor/editor.vue'
import tianqi from '../components/tianqi'
import flower from '../components/markdown/vue/flower.vue'
import exericeField from '../components/exericiseField'
import VueRepl from '../components/exericiseField/vueRepl.vue'
import htmlVue from '../components/exericiseField/html.vue'
export const routes = [
  {
    path: '/', redirect: '/HelloWorld', component: App,
  },
  {
    path: '/HelloWorld', component: HelloWorld,
  },
  {
    // path: '/', redirect: '/calendar', component: App,
     path: '/calendar', component: calendar 
  },
  {
    // path: '/', redirect: '/timer', component: App,
    path: '/timer', component: Timer 
  },
  {
    // path: '/', redirect: '/pikaqiu', component: App,
     path: '/pikaqiu', component: pikaqiu 
  },
  {
    // path: '/', redirect: '/computer', component: App,
    path: '/computer', component: computer 
  },
  {
    // path: '/', redirect: '/helloKitty', component: App,
     path: '/helloKitty', component: helloKitty 
  },
  {
    // path: '/', redirect: '/duolam', component: App,
     path: '/duolam', component: duolam 
  },
  {
    // path: '/', redirect: '/blockBreaker', component: App,
   path: '/blockBreaker', component: blockBreaker 
  },
  {
    // path: '/', redirect: '/editor', component: App,
   path: '/editor', component: Editor 
  },
  {
    // path: '/', redirect: '/tianqi', component: App,
   path: '/tianqi', component: tianqi 
  },
  {
    // path: '/', redirect: '/triangle', component: App,
    path: '/triangle', component: triangle 
  },
  {
    // path: '/', redirect: '/tetris', component: App,
    path: '/tetris', component: tetris 
  },
  {
    // path: '/', redirect: '/2048', component: App,
   path: '/2048', component: game2048 
  },
  {
    // path: '/', redirect: '/mineDlearance', component: App,
    path: '/mineDlearance', component: mineDlearance 
  },
  {
    // path: '/', redirect: '/gobang', component: App,
  path: '/gobang', component: gobang 
  },
  {
    // path: '/', redirect: '/play2', component: App,
   path: '/play2', component: play 
  },
  {
    // path: '/', redirect: '/Sudoku', component: App,
    path: '/Sudoku', component: Sudoku 
  },
  {
    // path: '/', redirect: '/huarongRoad', component: App,
   path: '/huarongRoad', component: huarongRoad 
  },
  {
    // path: '/', redirect: '/xiaoxiaole', component: App,
    path: '/xiaoxiaole', component: xiaoxiaole 
  },
  {
    // path: '/', redirect: '/randomPass', component: App,
   path: '/randomPass', component: randomPass 
  },
  {
    // path: '/', redirect: '/myProject', component: App,
   path: '/myProject', component: myProjet 
  },
  {
    // path: '/', redirect: '/typewriting', component: App,
    path: '/typewriting', component: typewriting 
  },
  {
    path: '/flower', component: flower
  },
  {
    path: '/exericise', component: exericeField,
  },
  { path: '/exericise/vue', component: VueRepl },
  { path: '/exericise/html', component: htmlVue }
]

// import App from '../App.vue'

// import HelloWorld from '../components/HelloWorld.vue'

// import { defineAsyncComponent } from 'vue'

// export const routes = [
//   {
//     path: '/', redirect: '/HelloWorld', component: App,
//     children: [{ path: '/HelloWorld', component: HelloWorld, }]
//   },
//   {
//     // path: '/', redirect: '/calendar', component: App,
//     // children: [{ path: '/calendar', component: defineAsyncComponent(()=>import('../components/calendar.vue')) },]
    
//   },
//   {
//     // path: '/', redirect: '/timer', component: App,
//     children: [{ path: '/timer', component: defineAsyncComponent(()=>import('../components/Timer'))  }]
//   },
//   {
//     // path: '/', redirect: '/pikaqiu', component: App,
//     children: [{ path: '/pikaqiu', component: defineAsyncComponent(()=>import('../components/pikaqiu.vue'))  }]
//   },
//   {
//     // path: '/', redirect: '/computer', component: App,
//     children: [{ path: '/computer', component: defineAsyncComponent(()=>import('../components/computer/computer.vue'))  }]
//   },
//   {
//     // path: '/', redirect: '/helloKitty', component: App,
//     children: [{ path: '/helloKitty', component: defineAsyncComponent(()=>import('../components/helloKitty/helloKitty'))  }]
//   },
//   {
//     // path: '/', redirect: '/duolam', component: App,
//     children: [{ path: '/duolam', component: defineAsyncComponent(()=>import('../components/duolam/duolam.vue'))  }]
//   },
//   {
//     // path: '/', redirect: '/blockBreaker', component: App,
//     children: [{ path: '/blockBreaker', component: defineAsyncComponent(()=>import('../components/blockBreaker/blockBreaker.vue'))  }]
//   },
//   {
//     // path: '/', redirect: '/editor', component: App,
//     children: [{ path: '/editor', component: defineAsyncComponent(()=>import('../components/editor/editor'))  }]
//   },
//   {
//     // path: '/', redirect: '/tianqi', component: App,
//     children: [{ path: '/tianqi', component: defineAsyncComponent(()=>import('../components/tianqi'))  }]
//   },
//   {
//     // path: '/', redirect: '/triangle', component: App,
//     children: [{ path: '/triangle', component: defineAsyncComponent(()=>import('../components/Triangle'))  }]
//   },
//   {
//     // path: '/', redirect: '/tetris', component: App,
//     children: [{ path: '/tetris', component: defineAsyncComponent(()=>import('../components/Tetris'))  }]
//   },
//   {
//     // path: '/', redirect: '/2048', component: App,
//     children: [{ path: '/2048', component: defineAsyncComponent(()=>import('../components/2048Game'))  }]
//   },
//   {
//     // path: '/', redirect: '/mineDlearance', component: App,
//     children: [{ path: '/mineDlearance', component: defineAsyncComponent(()=>import('../components/mineDlearance'))  }]
//   },
//   {
//     // path: '/', redirect: '/gobang', component: App,
//     children: [{ path: '/gobang', component: defineAsyncComponent(()=>import('../components/gobang'))  }]
//   },
//   {
//     // path: '/', redirect: '/play2', component: App,
//     children: [{ path: '/play2', component: defineAsyncComponent(()=>import('../components/play'))  }]
//   },
//   {
//     // path: '/', redirect: '/Sudoku', component: App,
//     children: [{ path: '/Sudoku', component: defineAsyncComponent(()=>import('../components/Sudoku'))  }]
//   },
//   {
//     // path: '/', redirect: '/huarongRoad', component: App,
//     children: [{ path: '/huarongRoad', component: defineAsyncComponent(()=>import('../components/huarongRoad'))  }]
//   },
//   {
//     // path: '/', redirect: '/xiaoxiaole', component: App,
//     children: [{ path: '/xiaoxiaole', component: defineAsyncComponent(()=>import('../components/xiaoxiaole'))  }]
//   },
//   {
//     // path: '/', redirect: '/randomPass', component: App,
//     children: [{ path: '/randomPass', component: defineAsyncComponent(()=>import('../components/randomPass'))  }]
//   },
//   {
//     // path: '/', redirect: '/myProject', component: App,
//     children: [{ path: '/myProject', component: defineAsyncComponent(()=>import('../components/markdown/vue'))  }]
//   },
//   {
//     // path: '/', redirect: '/typewriting', component: App,
//     children: [{ path: '/typewriting', component: defineAsyncComponent(()=>import('../components/typewriting'))  }]
//   }

// ]