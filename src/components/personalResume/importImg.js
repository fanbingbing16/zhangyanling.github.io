const req = require.context('../../assets/works', true, /\.png$/);
const arr = [];
const obj = {
'2048':{url:'/2048',name:'2048'},
'h5':{name:'h5记账',url:'https://zhangyanling.top/#/'},
'wzq':{name:'五子棋',url:'/gobang'},
'elsfk':{name:'俄罗斯方块',url:'/tetris'},
'hrd':{name:'华容道',url:'/huarongRoad'},
'sl':{name:'扫雷',url:'/mineDlearance'},
'sd':{name:'数独',url:'/Sudoku'},
'xxl':{name:'消消乐',url:'/xiaoxiaole'},
'zk':{name:'砖块',url:'/blockBreaker'}

}
console.log(obj)
req.keys().forEach((eachPng) => {
  const imgConfig = req(eachPng);
  const imgName = eachPng.replace(/^\.\/(.*)\.\w+$/, '$1');
  arr.push({ imgName, icon: req(eachPng).default || imgConfig,url:obj[imgName].url,name:obj[imgName].name })
});
export default arr;
