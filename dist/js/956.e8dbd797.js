"use strict";(self["webpackChunkeditor"]=self["webpackChunkeditor"]||[]).push([[956],{3956:function(e,l,u){u.r(l),u.d(l,{default:function(){return b}});var a=u(3396),v=u(7139);const n=e=>((0,a.dD)("data-v-318d715e"),e=e(),(0,a.Cn)(),e),o={class:"game"},i={class:"game-main"},t={class:"game-div"},r=n((()=>(0,a._)("p",null," 游戏规则:游戏界面由 6*6的方格组成，每次可以选择上下左右其中一个方向去滑动，每滑动一次，所有的数字方块都会往滑动的方向靠拢外，系统也会在空白的地方乱数出现一个数字方块（2或者 4）， 相同数字的方块在靠拢、相撞时会相加。不断的叠加最终拼凑出 2048这个数字就算成功，如果格子满了不能再滑动了则失败。 ",-1)));function m(e,l,u,n,m,s){const f=(0,a.up)("el-button"),d=(0,a.up)("dialog-vue");return(0,a.wg)(),(0,a.iD)("div",o,[(0,a._)("div",i,[(0,a._)("div",t,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.boxs,((e,l)=>((0,a.wg)(),(0,a.iD)("div",{key:l,class:"flex"},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(e,((e,l)=>((0,a.wg)(),(0,a.iD)("div",{key:l,class:"box",style:(0,v.j5)(0!==e.num?"color:white;background:green;":"")},(0,v.zw)(e.num),5)))),128))])))),128))])]),r,(0,a.Wm)(d,{dialogTitle:"提示",visible:n.visible,"onUpdate:visible":l[0]||(l[0]=e=>n.visible=e)},{body:(0,a.w5)((()=>[(0,a.Uk)((0,v.zw)(n.tip),1)])),footer:(0,a.w5)((()=>[(0,a.Wm)(f,{onClick:n.init},{default:(0,a.w5)((()=>[(0,a.Uk)("重新开始")])),_:1},8,["onClick"])])),_:1},8,["visible"])])}u(7658);var s=u(4870),f=u(6435),d={components:{dialogVue:f.Z},setup(){const e=(0,s.iH)(6),l=(0,s.iH)(6),u=(0,s.iH)([[{x:0,y:0,num:0}]]),a=(0,s.iH)([]),v=(0,s.iH)(!1),n=(0,s.iH)("");function o(){v.value=!1,u.value=[];for(let v=0;v<e.value;v++){u.value.push([]);for(let n=0;n<l.value;n++)a.value.push(v*e.value+n),u.value[v].push({x:v,y:v,num:0})}u.value[Math.floor(Math.random()*l.value)][Math.floor(Math.random()*e.value)].num=2}function i(){document.onkeydown=e=>{let l=e||arguments.callee.caller.arguments[0];l&&"ArrowLeft"==l.key?t():l&&"ArrowRight"==l.key?r():l&&"ArrowUp"===l.key?m():l&&"ArrowDown"===l.key&&f()}}function t(){let a=!1,o=0;for(let i=0;i<e.value;i++)for(let o=1;o<l.value;o++)if(u.value[i][o].num>0){if(0===u.value[i][o-1].num)u.value[i][o-1].num=u.value[i][o].num,u.value[i][o].num=0;else if(u.value[i][o-1].num===u.value[i][o].num&&(u.value[i][o-1].num=2*u.value[i][o].num,u.value[i][o].num=0,u.value[i][o-1].num>=2048)){i=e.value,o=l.value,n.value="您赢了",v.value=!0;break}}else Math.random()>.5&&!a&&(u.value[i][o].num=[2,4][Math.floor(2*Math.random())],a=!0);if(!a)for(let v=0;v<e.value;v++)for(let a=0;a<l.value;a++){if(0===u.value[v][a].num){u.value[v][a].num=[2,4][Math.floor(2*Math.random())],v=e.value,a=l.value;break}o++}if(o>=e.value*l.value)return n.value="您输了",void(v.value=!0)}function r(){let a=!1,o=0;for(let i=0;i<e.value;i++)for(let o=l.value-2;o>=0;o--)if(u.value[i][o].num>0){if(0===u.value[i][o+1].num)u.value[i][o+1].num=u.value[i][o].num,u.value[i][o].num=0;else if(u.value[i][o+1].num===u.value[i][o].num&&(u.value[i][o+1].num=2*u.value[i][o].num,u.value[i][o].num=0,u.value[i][o+1].num>=2048)){i=e.value,o=l.value,n.value="您赢了",v.value=!0;break}}else Math.random()>.5&&!a&&(u.value[i][o].num=[2,4][Math.floor(2*Math.random())],a=!0);if(!a)for(let v=0;v<e.value;v++)for(let a=1;a<l.value;a++){if(0===u.value[v][a].num){u.value[v][a].num=[2,4][Math.floor(2*Math.random())],v=e.value,a=l.value;break}o++}if(o>=e.value*l.value)return n.value="您输了",void(v.value=!0)}function m(){let a=!1,o=0;for(let i=1;i<e.value;i++)for(let o=0;o<l.value;o++)if(u.value[i][o].num>0){if(0===u.value[i-1][o].num)u.value[i-1][o].num=u.value[i][o].num,u.value[i][o].num=0;else if(u.value[i-1][o].num===u.value[i][o].num&&(u.value[i-1][o].num=2*u.value[i][o].num,u.value[i][o].num=0,u.value[i-1][o].num>=2048)){i=e.value,o=l.value,n.value="您赢了",v.value=!0;break}}else Math.random()>.5&&!a&&(u.value[i][o].num=[2,4][Math.floor(2*Math.random())],a=!0);if(!a)for(let v=0;v<e.value;v++)for(let a=0;a<l.value;a++){if(0===u.value[v][a].num){u.value[v][a].num=[2,4][Math.floor(2*Math.random())],v=e.value,a=l.value;break}o++}if(o>=e.value*l.value)return n.value="您输了",void(v.value=!0)}function f(){let a=!1,o=0;for(let i=e.value-2;i>=0;i--)for(let o=0;o<l.value;o++)if(u.value[i][o].num>0){if(0===u.value[i+1][o].num)u.value[i+1][o].num=u.value[i][o].num,u.value[i][o].num=0;else if(u.value[i+1][o].num===u.value[i][o].num&&(u.value[i+1][o].num=2*u.value[i][o].num,u.value[i][o].num=0,u.value[i+1][o].num>=2048)){i=e.value,o=l.value,n.value="您赢了",v.value=!0;break}}else Math.random()>.5&&!a&&(u.value[i][o].num=[2,4][Math.floor(2*Math.random())],a=!0);if(!a)for(let v=0;v<e.value;v++)for(let a=0;a<l.value;a++){if(0===u.value[v][a].num){u.value[v][a].num=[2,4][Math.floor(2*Math.random())],v=e.value,a=l.value;break}o++}if(o>=e.value*l.value)return n.value="您输了",void(v.value=!0)}return o(),i(),{boxs:u,init:o,visible:v,tip:n}}},c=u(89);const h=(0,c.Z)(d,[["render",m],["__scopeId","data-v-318d715e"]]);var b=h},6435:function(e,l,u){u.d(l,{Z:function(){return b}});var a=u(3396),v=u(7139);const n=e=>((0,a.dD)("data-v-46b28abf"),e=e(),(0,a.Cn)(),e),o={key:0,class:"comm-dialog"},i=n((()=>(0,a._)("div",{class:"back"},null,-1))),t={class:"content"},r={class:"top-title"},m={class:"comm-sialog-body"},s={class:"footer"};function f(e,l,u,n,f,d){return f.visibleOne?((0,a.wg)(),(0,a.iD)("div",o,[i,(0,a._)("div",t,[(0,a._)("div",r,[(0,a._)("div",null,(0,v.zw)(u.dialogTitle),1),(0,a._)("i",{onClick:l[0]||(l[0]=(...e)=>d.close&&d.close(...e))},"x")]),(0,a._)("div",m,[(0,a.WI)(e.$slots,"body",{},void 0,!0)]),(0,a._)("div",s,[(0,a.WI)(e.$slots,"footer",{},void 0,!0)])])])):(0,a.kq)("",!0)}var d={props:{visible:{default:!1,type:Boolean},dialogTitle:{default:"",type:String}},data(){return{visibleOne:this.visible}},created(){},watch:{visible(e){this.visibleOne=e}},methods:{close(){this.visibleOne=!1,this.$emit("update:visible",!1)}}},c=u(89);const h=(0,c.Z)(d,[["render",f],["__scopeId","data-v-46b28abf"]]);var b=h}}]);
//# sourceMappingURL=956.e8dbd797.js.map