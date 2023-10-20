
// import App from '../App.vue'

// export const routes = [
//   {
//     path: '/', redirect: '/HelloWorld', component: App,
//     children: [{ path: '/HelloWorld', component: import('../components/HelloWorld.vue'), }]
//   },
//   {
//     path: '/', redirect: '/calendar', component: App,
//     children: [{ path: '/calendar', component: import('../components/calendar.vue') },]
//   },
//   {
//     path: '/', redirect: '/timer', component: App,
//     children: [{ path: '/timer', component: import( '../components/Timer') }]
//   },
//   {
//     path: '/', redirect: '/pikaqiu', component: App,
//     children: [{ path: '/pikaqiu', component: import('../components/pikaqiu.vue') }]
//   },
//   {
//     path: '/', redirect: '/computer', component: App,
//     children: [{ path: '/computer', component: import('../components/computer/computer.vue') }]
//   },
//   {
//     path: '/', redirect: '/helloKitty', component: App,
//     children: [{ path: '/helloKitty', component:import('../components/helloKitty/helloKitty')  }]
//   },
//   {
//     path: '/', redirect: '/duolam', component: App,
//     children: [{ path: '/duolam', component: import('../components/duolam/duolam.vue') }]
//   },
//   {
//     path: '/', redirect: '/blockBreaker', component: App,
//     children: [{ path: '/blockBreaker', component: import('../components/blockBreaker/blockBreaker.vue') }]
//   },
//   {
//     path: '/', redirect: '/editor', component: App,
//     children: [{ path: '/editor', component: import('../components/editor/editor') }]
//   },
//   {
//     path: '/', redirect: '/tianqi', component: App,
//     children: [{ path: '/tianqi', component: import('../components/tianqi/index') }]
//   },
//   {
//     path: '/', redirect: '/triangle', component: App,
//     children: [{ path: '/triangle', component: import('../components/Triangle') }]
//   },
//   {
//     path: '/', redirect: '/tetris', component: App,
//     children: [{ path: '/tetris', component:  import('../components/Tetris')}]
//   },
//   {
//     path: '/', redirect: '/2048', component: App,
//     children: [{ path: '/2048', component:  import( '../components/2048Game')}]
//   },
//   {
//     path: '/', redirect: '/mineDlearance', component: App,
//     children: [{ path: '/mineDlearance', component: import('../components/mineDlearance') }]
//   },
//   {
//     path: '/', redirect: '/gobang', component: App,
//     children: [{ path: '/gobang', component: import('../components/gobang') }]
//   },
//   {
//     path: '/', redirect: '/play2', component: App,
//     children: [{ path: '/play2', component: import('../components/play') }]
//   },
//   {
//     path: '/', redirect: '/Sudoku', component: App,
//     children: [{ path: '/Sudoku', component:  import('../components/Sudoku')}]
//   },
//   {
//     path: '/', redirect: '/huarongRoad', component: App,
//     children: [{ path: '/huarongRoad', component: import('../components/huarongRoad') }]
//   },
//   {
//     path: '/', redirect: '/xiaoxiaole', component: App,
//     children: [{ path: '/xiaoxiaole', component: import( '../components/xiaoxiaole') }]
//   },
//   {
//     path: '/', redirect: '/randomPass', component: App,
//     children: [{ path: '/randomPass', component: import('../components/randomPass') }]
//   },
//   {
//     path: '/', redirect: '/myProject', component: App,
//     children: [{ path: '/myProject', component: import('../components/markdown/vue') }]
//   },
//   {
//     path: '/', redirect: '/typewriting', component: App,
//     children: [{ path: '/typewriting', component: import('../components/typewriting') }]
//   }

// ]

import App from '../App.vue'

import HelloWorld from '../components/HelloWorld.vue'

import { defineAsyncComponent } from 'vue'

export const routes = [
  {
    path: '/', redirect: '/HelloWorld', component: App,
    children: [{ path: '/HelloWorld', component: HelloWorld, }]
  },
  {
    // path: '/', redirect: '/calendar', component: App,
    children: [{ path: '/calendar', component: defineAsyncComponent(()=>import('../components/calendar.vue')) },]
  },
  {
    // path: '/', redirect: '/timer', component: App,
    children: [{ path: '/timer', component: defineAsyncComponent(()=>import('../components/Timer'))  }]
  },
  {
    // path: '/', redirect: '/pikaqiu', component: App,
    children: [{ path: '/pikaqiu', component: defineAsyncComponent(()=>import('../components/pikaqiu.vue'))  }]
  },
  {
    // path: '/', redirect: '/computer', component: App,
    children: [{ path: '/computer', component: defineAsyncComponent(()=>import('../components/computer/computer.vue'))  }]
  },
  {
    // path: '/', redirect: '/helloKitty', component: App,
    children: [{ path: '/helloKitty', component: defineAsyncComponent(()=>import('../components/helloKitty/helloKitty'))  }]
  },
  {
    // path: '/', redirect: '/duolam', component: App,
    children: [{ path: '/duolam', component: defineAsyncComponent(()=>import('../components/duolam/duolam.vue'))  }]
  },
  {
    // path: '/', redirect: '/blockBreaker', component: App,
    children: [{ path: '/blockBreaker', component: defineAsyncComponent(()=>import('../components/blockBreaker/blockBreaker.vue'))  }]
  },
  {
    // path: '/', redirect: '/editor', component: App,
    children: [{ path: '/editor', component: defineAsyncComponent(()=>import('../components/editor/editor'))  }]
  },
  {
    // path: '/', redirect: '/tianqi', component: App,
    children: [{ path: '/tianqi', component: defineAsyncComponent(()=>import('../components/tianqi'))  }]
  },
  {
    // path: '/', redirect: '/triangle', component: App,
    children: [{ path: '/triangle', component: defineAsyncComponent(()=>import('../components/Triangle'))  }]
  },
  {
    // path: '/', redirect: '/tetris', component: App,
    children: [{ path: '/tetris', component: defineAsyncComponent(()=>import('../components/Tetris'))  }]
  },
  {
    // path: '/', redirect: '/2048', component: App,
    children: [{ path: '/2048', component: defineAsyncComponent(()=>import('../components/2048Game'))  }]
  },
  {
    // path: '/', redirect: '/mineDlearance', component: App,
    children: [{ path: '/mineDlearance', component: defineAsyncComponent(()=>import('../components/mineDlearance'))  }]
  },
  {
    // path: '/', redirect: '/gobang', component: App,
    children: [{ path: '/gobang', component: defineAsyncComponent(()=>import('../components/gobang'))  }]
  },
  {
    // path: '/', redirect: '/play2', component: App,
    children: [{ path: '/play2', component: defineAsyncComponent(()=>import('../components/play'))  }]
  },
  {
    // path: '/', redirect: '/Sudoku', component: App,
    children: [{ path: '/Sudoku', component: defineAsyncComponent(()=>import('../components/Sudoku'))  }]
  },
  {
    // path: '/', redirect: '/huarongRoad', component: App,
    children: [{ path: '/huarongRoad', component: defineAsyncComponent(()=>import('../components/huarongRoad'))  }]
  },
  {
    // path: '/', redirect: '/xiaoxiaole', component: App,
    children: [{ path: '/xiaoxiaole', component: defineAsyncComponent(()=>import('../components/xiaoxiaole'))  }]
  },
  {
    // path: '/', redirect: '/randomPass', component: App,
    children: [{ path: '/randomPass', component: defineAsyncComponent(()=>import('../components/randomPass'))  }]
  },
  {
    // path: '/', redirect: '/myProject', component: App,
    children: [{ path: '/myProject', component: defineAsyncComponent(()=>import('../components/markdown/vue'))  }]
  },
  {
    // path: '/', redirect: '/typewriting', component: App,
    children: [{ path: '/typewriting', component: defineAsyncComponent(()=>import('../components/typewriting'))  }]
  }

]