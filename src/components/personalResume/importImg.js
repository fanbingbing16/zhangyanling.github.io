const req = require.context('../../assets/works', true, /\.png$/);
const arr = [];
const obj = {
'2048':'/2048',
'h5记账':'https://zhangyanling.top/#/',
'五子棋':'/gobang',
'俄罗斯方块':'/tetris',
'华容道':'/huarongRoad',
'扫雷':'/mineDlearance',
'数独':'/Sudoku',
'消消乐':'/xiaoxiaole',
'砖块':'/blockBreaker',

}
console.log(obj)
req.keys().forEach((eachPng) => {
  const imgConfig = req(eachPng);
  const imgName = eachPng.replace(/^\.\/(.*)\.\w+$/, '$1');
  arr.push({ imgName, icon: req(eachPng).default || imgConfig,url:obj[imgName] })
});
export default arr;
