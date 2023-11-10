export interface dataInter {
  id: String | Number,
  name: String,
  description: String,
  value: String | Boolean | Number | Object,
  type: 'input' | 'select' | 'switch' | 'color' | '',
  disabled?: Boolean,
  data?: { value: String | Number, label: String }[],
  children?: dataInter[],
  config?: any[],
  shouldInit?:Boolean  //是否需要重新渲染echarts
  shouldUpdate?:Boolean //是否需要数据更新
}
const animationType = [{ value: 'cubicOut', label: 'cubicOut' }, { value: 'linear', label: 'linear' }, { value: 'quadraticIn', label: 'quadraticIn' }, { value: 'quadraticOut', label: 'quadraticOut' }, { value: 'quadraticInOut', label: 'quadraticInOut' }, { value: 'cubicIn', label: 'cubicIn' }, { value: 'cubicInOut', label: 'cubicInOut' }, { value: 'quarticIn', label: 'quarticIn' }, { value: 'quarticOut', label: 'quarticOut' }, { value: 'quarticInOut', label: 'quarticInOut' }, { value: 'quinticIn', label: 'quinticIn' }, { value: 'quinticOut', label: 'quinticOut' }, { value: 'quinticInOut', label: 'quinticInOut' }, { value: 'sinusoidalIn', label: 'sinusoidalIn' }, { value: 'sinusoidalOut', label: 'sinusoidalOut' }, { value: 'sinusoidalInOut', label: 'sinusoidalInOut' }, { value: 'exponentialIn', label: 'exponentialIn' }, { value: 'exponentialOut', label: 'exponentialOut' }, { value: 'exponentialInOut', label: 'exponentialInOut' }, { value: 'circularIn', label: 'circularIn' }, { value: 'circularOut', label: 'circularOut' }, { value: 'circularInOut', label: 'circularInOut' }, { value: 'elasticIn', label: 'elasticIn' }, { value: 'elasticOut', label: 'elasticOut' }, { value: 'elasticInOut', label: 'elasticInOut' }, { value: 'backIn', label: 'backIn' }, { value: 'backOut', label: 'backOut' }, { value: 'backInOut', label: 'backInOut' }, { value: 'bounceIn', label: 'bounceIn' }, { value: 'bounceOut', label: 'bounceOut' }, { value: 'bounceInOut', label: 'bounceInOut' }]
const blendModeData = [{ value: "source-over", label: "source-over" }, { value: "source-in", label: "source-in" }, { value: "source-out", label: "source-out" }, { value: "source-atop", label: "source-atop" }, { value: "destination-over", label: "destination-over" }, { value: "destination-in", label: "destination-in" }, { value: "destination-out", label: "destination-out" }, { value: "destination-atop", label: "destination-atop" }, { value: "lighter", label: "lighter" }, { value: "copy", label: "copy" }, { value: "xor", label: "xor" }, { value: "multiply", label: "multiply" }, { value: "screen", label: "screen" }, { value: "overlay", label: "overlay" }, { value: "darken", label: "darken" }, { value: "lighten", label: "lighten" }, { value: "color-dodge", label: "color-dodge" }, { value: "color-burn", label: "color-burn" }, { value: "hard-light", label: "hard-light" }, { value: "soft-light", label: "soft-light" }, { value: "difference", label: "difference" }, { value: "exclusion", label: "exclusion" }, { value: "hue", label: "hue" }, { value: "saturation", label: "saturation" }, { value: "color", label: "color" }, { value: "luminosity", label: "luminosity" }]
const defaultData: dataInter[] = [
  {
    id: 1, name: 'title', description: '标题组件，包含主标题和副标题', value: '', type: '', children: [
      { id: '1-1', name: 'id', description: '组件 ID。默认不指定。', value: '', type: 'input' },
      { id: '1-2', name: 'text', description: '主标题文本，支持使用 \\n 换行。', value: 'Echarts 入门示例', type: 'input' },
      { id: '1-3', name: 'show', description: '是否显示标题组件。', value: true, type: 'switch' },
      { id: '1-4', name: 'link', description: '主标题文本超链接。', value: '', type: 'input' },
      { id: '1-5', name: 'target', description: '指定窗口打开主标题超链接。', value: 'blank', type: 'select', data: [{ label: '当前窗口打开', value: 'self' }, { label: '新窗口打开', value: 'blank' }] },
      {
        id: '1-6', name: 'textStyle', description: '展开查看', value: '', type: '', children: [
          { id: '1-6-1', name: 'color', description: '主标题文字的颜色。', value: '#000', type: 'color' },
          { id: '1-6-2', name: 'fontStyle', description: '主标题文字字体的风格。', value: 'normal', type: 'select', data: [{ label: 'normal', value: 'normal' }, { label: 'italic', value: 'italic' }, { label: 'oblique', value: 'oblique' }] },
          { id: '1-6-3', name: 'fontWeight', description: '主标题文字字体的粗细。', value: 'bolder', type: 'select', data: [{ label: 'normal', value: 'normal' }, { label: 'bold', value: 'bold' }, { label: 'bolder', value: 'bolder' }, { label: 'lighter', value: 'lighter' }, { label: '100', value: 100 }, { label: '200', value: 200 }, { label: '300', value: 300 }, { label: '400', value: 400 }, { label: '500', value: 500 }, { label: '600', value: 600 }, { label: '700', value: 700 }, { label: '800', value: 800 }, { label: '900', value: 900 }] },
          { id: '1-6-4', name: 'fontFamily', description: '主标题文字的字体系列。', value: 'sans-serif', type: 'select', data: [{ value: 'serif', label: 'serif' }, { value: 'monospace', label: 'monospace' }, { value: 'Arial', label: 'Arial' }, { value: 'Courier New', label: 'Courier New' }, { value: 'Microsoft YaHei', label: 'Microsoft YaHei' }], config: ['allow-create'] },
          { id: '1-6-5', name: 'fontSize', description: '主标题文字的字体大小。', value: 18, type: 'input' },
          { id: '1-6-6', name: 'lineHeight', description: '行高。', value: '', type: 'input' },
          { id: '1-6-7', name: 'width', description: '文本显示宽度。', value: '', type: 'input' },
          { id: '1-6-8', name: 'height', description: '文本显示高度。', value: '', type: 'input' },
          { id: '1-6-9', name: 'textBorderColor', description: '文字本身的描边颜色。', value: '', type: 'color' },
          { id: '1-6-10', name: 'textBorderWidth', description: '文字本身的描边宽度。', value: '', type: 'input' },
          { id: '1-6-11', name: 'textBorderType', description: '文字本身的描边类型。', value: 'solid', type: 'select', data: [{ label: 'solid', value: 'solid' }, { label: 'dashed', value: 'dashed' }, { label: 'dotted', value: 'dotted' }] },
          { id: '1-6-12', name: 'textBorderDashOffset', description: '用于设置虚线的偏移量', value: '', type: 'input' },
          { id: '1-6-13', name: 'textShadowColor', description: '文字本身的阴影颜色。', value: 'transparent', type: 'color' },
          { id: '1-6-14', name: 'textShadowBlur', description: '文字本身的阴影长度。', value: '', type: 'input' },
          { id: '1-6-15', name: 'textShadowOffsetX', description: '文字本身的阴影 X 偏移。', value: '', type: 'input' },
          { id: '1-6-16', name: 'textShadowOffsetY', description: '文字本身的阴影 Y 偏移。', value: '', type: 'input' },
          { id: '1-6-17', name: 'overflow', description: '文字超出宽度是否截断或者换行。配置width时有效', value: 'none', type: 'select', data: [{ label: '"truncate" 截断，并在末尾显示ellipsis配置的文本，默认为...', value: 'truncate' }, { label: '"break" 换行', value: 'break' }, { label: '"breakAll" 换行，跟"break"不同的是，在英语等拉丁文中，"breakAll"还会强制单词内换行', value: 'breakAll' }, { label: 'none', value: 'none' },] },
          { id: '1-6-18', name: 'ellipsis', description: '在overflow配置为"truncate"的时候，可以通过该属性配置末尾显示的文本。', value: '...', type: 'input' },
          { id: '1-6-19', name: 'rich', description: '自定义富文本样式', value: '', type: 'input' },
          { id: '1-6-5', name: '', description: '', value: '', type: '' },

        ]
      }, 
      { id: '1-7', name: 'subtext', description: '副标题文本，支持使用 \\n 换行。', value: '', type: 'input' },
      { id: '1-8', name: 'sublink', description: '副标题文本超链接。', value: '', type: 'input' },
      { id: '1-9', name: 'subtarget', description: '指定窗口打开副标题超链接', value: 'blank', type: 'select', data: [{ label: '当前窗口打开', value: 'self' }, { label: '新窗口打开', value: 'blank' }] },
      {
        id: '1-10', name: 'subtextStyle', description: '副标题文字设置', value: '', type: '', children: [
          { id: '1-10-1', name: 'color', description: '副标题文字的颜色。', value: '#aaa', type: 'color' },
          { id: '1-10-2', name: 'fontStyle', description: '副标题文字字体的风格。', value: 'normal', type: 'select', data: [{ label: 'normal', value: 'normal' }, { label: 'italic', value: 'italic' }, { label: 'oblique', value: 'oblique' }] },
          { id: '1-10-3', name: 'fontWeight', description: '副标题文字字体的粗细。', value: 'normal', type: 'select', data: [{ label: 'normal', value: 'normal' }, { label: 'bold', value: 'bold' }, { label: 'bolder', value: 'bolder' }, { label: 'lighter', value: 'lighter' }, { label: '100', value: 100 }, { label: '200', value: 200 }, { label: '300', value: 300 }, { label: '400', value: 400 }, { label: '500', value: 500 }, { label: '600', value: 600 }, { label: '700', value: 700 }, { label: '800', value: 800 }, { label: '900', value: 900 }] },
          { id: '1-10-4', name: 'fontFamily', description: '副标题文字的字体系列。', value: 'sans-serif', type: 'select', data: [{ value: 'serif', label: 'serif' }, { value: 'monospace', label: 'monospace' }, { value: 'Arial', label: 'Arial' }, { value: 'Courier New', label: 'Courier New' }, { value: 'Microsoft YaHei', label: 'Microsoft YaHei' }], config: ['allow-create'] },
          { id: '1-10-5', name: 'fontSize', description: '副标题文字的字体大小。', value: 12, type: 'input' },
          { id: '1-10-6', name: 'align', description: '文字水平对齐方式，默认自动。', value: '', type: 'select', data: [{ label: 'left', value: 'left' }, { label: 'center', value: 'center' }, { label: 'right', value: 'right' },] },
          { id: '1-10-7', name: 'verticalAlign', description: '文字垂直对齐方式，默认自动。', value: '', type: 'select', data: [{ label: 'top', value: 'top' }, { label: 'middle', value: 'middle' }, { label: 'bottom', value: 'bottom' },] },
          { id: '1-10-8', name: 'lineHeight', description: '行高。', value: '', type: 'input' },
          { id: '1-10-9', name: 'width', description: '文本显示宽度。', value: '', type: 'input' },
          { id: '1-10-10', name: 'height', description: '文本显示高度。', value: '', type: 'input' },
          { id: '1-10-11', name: 'textBorderColor', description: '文字本身的描边颜色。', value: '', type: 'color' },
          { id: '1-10-12', name: 'textBorderWidth', description: '文字本身的描边宽度。', value: '', type: 'input' },
          { id: '1-10-13', name: 'textBorderType', description: '文字本身的描边类型。', value: 'solid', type: 'select', data: [{ label: 'solid', value: 'solid' }, { label: 'dashed', value: 'dashed' }, { label: 'dotted', value: 'dotted' }] },
          { id: '1-10-14', name: 'textBorderDashOffset', description: '用于设置虚线的偏移量', value: '', type: 'input' },
          { id: '1-10-15', name: 'textShadowColor', description: '文字本身的阴影颜色。', value: 'transparent', type: 'color' },
          { id: '1-10-16', name: 'textShadowBlur', description: '文字本身的阴影长度。', value: '', type: 'input' },
          { id: '1-10-17', name: 'textShadowOffsetX', description: '文字本身的阴影 X 偏移。', value: '', type: 'input' },
          { id: '1-10-18', name: 'textShadowOffsetY', description: '文字本身的阴影 Y 偏移。', value: '', type: 'input' },
          { id: '1-10-19', name: 'overflow', description: '文字超出宽度是否截断或者换行。配置width时有效', value: 'none', type: 'select', data: [{ label: '"truncate" 截断，并在末尾显示ellipsis配置的文本，默认为...', value: 'truncate' }, { label: '"break" 换行', value: 'break' }, { label: '"breakAll" 换行，跟"break"不同的是，在英语等拉丁文中，"breakAll"还会强制单词内换行', value: 'breakAll' }, { label: 'none', value: 'none' },] },
          { id: '1-10-20', name: 'ellipsis', description: '在overflow配置为"truncate"的时候，可以通过该属性配置末尾显示的文本。', value: '...', type: 'input' },
          { id: '1-10-21', name: 'rich', description: '自定义富文本样式', value: '', type: 'input' },
        ]
      },
      { id: '1-11', name: 'textAlign', description: '整体（包括 text 和 subtext）的水平对齐。', value: 'auto', type: 'select',data:[{label:'auto',value:'auto'},{label:'left',value:'left'},{label:'right',value:'right'},{label:'center',value:'center'},] },
      { id: '1-12', name: 'textVerticalAlign', description: '整体（包括 text 和 subtext）的垂直对齐。', value: 'auto', type: 'select',data:[{label:'auto',value:'auto'},{label:'top',value:'top'},{label:'bottom',value:'bottom'},{label:'middle',value:'middle'},] },
      { id: '1-13', name: 'triggerEvent', description: '是否触发事件。', value: false, type: 'switch' },
      { id: '1-14', name: 'padding', description: '标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。 ', value: 5, type: 'input' },
      { id: '1-15', name: 'itemGap', description: '主副标题之间的间距。', value: 10, type: 'input' },
      { id: '1-16', name: 'zlevel', description: '所有图形的 zlevel 值。', value: 0, type: 'input' },
      { id: '1-17', name: 'z', description: '组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。', value: 2, type: 'input' },
      { id: '1-18', name: 'left', description: 'title 组件离容器左侧的距离。left 的值可以是像 20 这样的具体像素值，可以是像 `20%` 这样相对于容器高宽的百分比，也可以是 `left`, `center`, `right`。', value: 'auto', type: 'input' },
      { id: '1-19', name: 'top', description: 'title 组件离容器上侧的距离。可选词入left', value: 'auto', type: 'input' },
      { id: '1-20', name: 'right', description: 'title 组件离容器右侧的距离。right 的值可以是像 20 这样的具体像素值，可以是像 `20%` 这样相对于容器高宽的百分比。 ', value: 'auto', type: 'input' },
      { id: '1-21', name: 'bottom', description: 'title 组件离容器下侧的距离。可选词入right', value: 'auto', type: 'input' },
      { id: '1-22', name: 'backgroundColor', description: '标题背景色，默认透明。', value: 'transparent', type: 'color' },
      { id: '1-23', name: 'borderColor', description: '标题的边框颜色。支持的颜色格式同 backgroundColor。', value: '#ccc', type: 'color' },
      { id: '1-24', name: 'borderWidth', description: '标题的边框线宽。', value: 0, type: 'input' }, 
      { id: '1-25', name: 'borderRadius', description: '圆角半径，单位px，支持传入数组分别指定 4 个圆角半径。', value: 0, type: 'input' },
      { id: '1-26', name: 'shadowBlur', description: '图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。', value: '', type: 'input' },
      { id: '1-27', name: 'shadowColor', description: '阴影颜色。', value: '', type: 'color' },
      { id: '1-28', name: 'shadowOffsetX', description: '阴影水平方向上的偏移距离。注意：此配置项生效的前提是，设置了 show: true。', value: '', type: 'input' },
      { id: '1-29', name: 'shadowOffsetY', description: '阴影垂直方向上的偏移距离。注意：此配置项生效的前提是，设置了 show: true。', value: '', type: 'input' },
    ]
  },

  { id: 2, name: 'backgroundColor', description: '背景色，默认无背景.支持使用rgb(255,255,255)，rgba(255,255,255,1)，#fff等方式设置为纯色，也支持设置为渐变色和纹理填充', value: 'transparent', type: 'input' },
  { id: 3, name: 'darkMode', description: '是否是暗黑模式，默认会根据背景色 backgroundColor 的亮度自动设置。 如果是设置了容器的背景色而无法判断到，就可以使用该配置手动指定，echarts 会根据是否是暗黑模式调整文本等的颜色。该配置通常会被用于主题中。', value: false, type: 'switch' },
  { id: 4, name: 'animation', 'description': '是否开启动画', value: false, type: 'switch',shouldInit:true },
  { id: 5, name: 'animationThreshold', 'description': '是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。', value: 2000, type: 'input' },
  { id: 6, name: 'animationDuration', description: '初始动画时长', value: 1000, type: 'input' ,shouldInit:true},
  { id: 7, name: 'animationEasing', description: '初始动画的缓动效果。', value: 'cubicOut', type: 'select', data: animationType,shouldInit:true },
  { id: 8, name: 'animationDelay', description: '初始动画的延迟', value: 0, type: 'input',shouldInit:true },
  { id: 9, name: 'animationDurationUpdate', description: '数据更新动画的时长。', value: 300, type: 'input' ,shouldUpdate:true},
  { id: 10, name: 'animationEasingUpdate', description: '数据更新动画的缓动效果。', value: 'cubicInOut', type: 'select', data: animationType ,shouldUpdate:true},
  { id: 11, name: 'animationDelayUpdate', description: '数据更新动画的延迟', value: 0, type: 'input' ,shouldUpdate:true},
  { id: 12, name: 'blendMode', description: '图形的混合模式', value: 'source-over', type: 'select', data: blendModeData },
  { id: 13, name: 'hoverLayerThreshold', description: '图形数量阈值，决定是否开启单独的 hover 层，在整个图表的图形数量大于该阈值时开启单独的 hover 层。', value: 3000, type: 'input' },
  { id: 14, name: 'useUTC', description: '是否使用 UTC 时间。', value: false, type: 'switch' },


]

export default defaultData

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  let clone: any = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}