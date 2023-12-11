import { dataInter } from "./base"

const data: dataInter[] = [
  { id: 1, name: 'id', description: '组件 ID。默认不指定。', value: '', type: 'input' },
  { id: 2, name: 'show', description: '是否显示 x 轴。', value: true, type: 'switch' },
  { id: 3, name: 'gridIndex', description: 'x 轴所在的 grid 的索引，默认位于第一个 grid。', value: 0, type: 'input' },
  { id: 4, name: 'alignTicks', description: '在多个 x 轴为数值轴的时候，可以开启该配置项自动对齐刻度。只对`value`和`log`类型的轴有效。', value: false, type: 'switch' },
  { id: 5, name: 'position', description: 'x 轴的位置。', value: '', type: 'select', data: [{ value: 'top', label: 'top' }, { value: 'bottom', label: 'bottom' },] },
  { id: 6, name: 'offset', description: 'X 轴相对于默认位置的偏移，在相同的 position 上有多个 X 轴的时候有用。注：若未将 xAxis.axisLine.onZero 设为 false , 则该项无法生效', value: 0, type: 'input' },
  { id: 7, name: 'type', description: '坐标轴类型。', value: 'category', type: 'select', data: [{ label: 'log 对数轴。适用于对数数据', value: 'log' }, { label: 'time 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。', value: 'time' }, { label: 'category 类目轴，适用于离散的类目数据。为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。', value: 'category' }, { label: 'value 数值轴，适用于连续数据。', value: 'value' },] },
  { id: 8, name: 'name', description: '坐标轴名称。', value: '', type: 'input' },
  { id: 9, name: 'nameLocation', description: '坐标轴名称显示位置。', value: 'end', type: 'select', data: [{ label: 'end', value: 'end' }, { label: 'center', value: 'center' }, { label: 'middle', value: 'middle' }, { label: 'start', value: 'start' },] },
  {
    id: 10, name: 'nameTextStyle', description: '坐标轴名称的文字样式。', value: '', type: '', children: [
      { id: '10-1', name: 'color', description: '坐标轴名称的颜色，默认取 axisLine.lineStyle.color。', value: '', type: 'color' },
      { id: '10-2', name: 'fontStyle', description: '坐标轴名称文字字体的风格。', value: 'normal', type: 'select', data: [{ label: 'oblique', value: 'oblique' }, { label: 'italic', value: 'italic' }, { label: 'normal', value: 'normal' },] },
      { id: '10-3', name: 'fontWeight', description: '坐标轴名称文字字体的粗细。', value: 'normal', type: 'select', data: [{ label: 'bolder', value: 'bolder' }, { label: 'bold', value: 'bold' }, { label: 'normal', value: 'normal' }, { label: 'lighter', value: 'lighter' }, { label: '100', value: 100 }, { label: '200', value: 200 }, { label: '300', value: 300 }, { label: '400', value: 400 }, { label: '500', value: 500 }, { label: '600', value: 600 }, { label: '700', value: 700 }, { label: '800', value: 800 }, { label: '900', value: 900 }] },
      { id: '10-4', name: 'fontFamily', description: '坐标轴名称文字的字体系列。', value: 'sans-serif', type: 'select', data: [{ value: 'serif', label: 'serif' }, { value: 'monospace', label: 'monospace' }, { value: 'Arial', label: 'Arial' }, { value: 'Courier New', label: 'Courier New' }, { value: 'Microsoft YaHei', label: 'Microsoft YaHei' }], config: ['allow-create'] },
      { id: '10-5', name: 'fontSize', description: '坐标轴名称文字的字体大小。', value: 12, type: 'input' },
      { id: '10-6', name: 'align', description: '文字水平对齐方式，默认自动。', value: '', type: 'select', data: [{ label: 'right', value: 'right' }, { label: 'center', value: 'center' }, { label: 'left', value: 'left' },] },
      { id: '10-7', name: 'verticalAlign', description: '文字垂直对齐方式，默认自动。', value: '', type: 'select', data: [{ label: 'top', value: 'top' }, { label: 'bottom', value: 'bottom' }, { label: 'middle', value: 'middle' },] },
      { id: '10-8', name: 'lineHeight', description: '行高。', value: '', type: 'input' },
      { id: '10-9', name: 'backgroundColor', description: '文字块背景色。', value: 'transparent', type: 'color' },
      { id: '10-10', name: 'borderColor', description: '文字块边框颜色。', value: '', type: 'color' },
      { id: '10-11', name: 'borderWidth', description: '文字块边框宽度', value: 0, type: 'input' },
      { id: '10-12', name: 'borderType', description: '文字块边框描边类型。', value: 'solid', type: 'select', data: [{ label: 'solid', value: 'solid' }, { label: 'dashed', value: 'dashed' }, { label: 'dotted', value: 'dotted' },] },
      { id: '10-13', name: 'borderDashOffset', description: '用于设置虚线的偏移量', value: 0, type: 'input' },
      { id: '10-14', name: 'borderRadius', description: '文字块的圆角', value: 0, type: 'input' },
      { id: '10-15', name: 'padding', description: '文字块的内边距。', value: 0, type: 'input' },
      { id: '10-16', name: 'shadowColor', description: '文字块的背景阴影颜色。', value: 'transparent', type: 'color' },
      { id: '10-17', name: 'shadowBlur', description: '文字块的背景阴影长度。', value: 0, type: 'input' },
      { id: '10-18', name: 'shadowOffsetX', description: '文字块的背景阴影 X 偏移。', value: 0, type: 'input' },
      { id: '10-19', name: 'shadowOffsetY', description: '文字块的背景阴影 Y 偏移。', value: 0, type: 'input' },
      { id: '10-20', name: 'width', description: '文本显示宽度。', value: '', type: 'input' },
      { id: '10-21', name: 'textBorderColor', description: '文字本身的描边颜色。', value: '', type: 'color' },
      { id: '10-22', name: 'textBorderType', description: '文字本身的描边类型。', value: 'solid', type: 'select', data: [{ label: 'solid', value: 'solid' }, { label: 'dashed', value: 'dashed' }, { label: 'dotted', value: 'dotted' },] },
      { id: '10-23', name: 'textBorderDashOffset', description: '用于设置虚线的偏移量', value: 0, type: 'input' },
      { id: '10-24', name: 'textShadowColor', description: '文字本身的阴影颜色。', value: 'transparent', type: 'color' },
      { id: '10-25', name: 'textShadowBlur', description: '文字本身的阴影长度。', value: 0, type: 'input' },
      { id: '10-26', name: 'textShadowOffsetX', description: '文字本身的阴影 X 偏移', value: 0, type: 'input' },
      { id: '10-27', name: 'textShadowOffsetY', description: '文字本身的阴影 Y 偏移。', value: 0, type: 'input' },
      { id: '10-28', name: 'overflow', description: '文字超出宽度是否截断或者换行。配置width时有效', value: 'none', type: 'select', data: [{ value: 'none', label: 'none' }, { value: 'breakAll', label: 'breakAll 换行，跟`break`不同的是，在英语等拉丁文中，`breakAll`还会强制单词内换行' }, { value: 'break', label: 'break  换行' }, { value: 'truncate', label: 'truncate 截断，并在末尾显示ellipsis配置的文本，默认为...' },] },
      { id: '10-29', name: 'ellipsis', description: '在overflow配置为`truncate`的时候，可以通过该属性配置末尾显示的文本。', value: '...', type: 'input' },
    ]
  },
  { id: 11, name: 'nameGap', description: '坐标轴名称与轴线之间的距离。', value: 15, type: 'input' },
  { id: 12, name: 'nameRotate', description: '坐标轴名字旋转，角度值。', value: '', type: 'input' },
  { id: 13, name: 'inverse', description: '是否是反向坐标轴。。', value: false, type: 'switch' },
  { id: 14, name: 'boundaryGap', description: '坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。类目轴中 boundaryGap 可以配置为 true 和 false。默认为 true，这时候刻度只是作为分隔线，标签和数据点都会在两个刻度之间的带(band)中间。非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效。 示例： boundaryGap: ["20%", ""20%"]', value: '', type: 'input' },
  { id: 15, name: 'min', description: '坐标轴刻度最小值。可以设置成特殊值“dataMin”，此时取数据在该轴上的最小值作为最小刻度。不设置时会自动计算最小值保证坐标轴刻度的均匀分布。在类目轴中，也可以设置为类目的序数（如类目轴 data: [“类A”, ”类B“, “类C”] 中，序数 2 表示 “类C”。也可以设置为负数，如 -3）。', value: '', type: 'input' },
  { id: 16, name: 'max', description: '坐标轴刻度最大值。 可以设置成特殊值 ·dataMax·，此时取数据在该轴上的最大值作为最大刻度。其他看min', value: '', type: 'input' },
  { id: 17, name: 'scale', description: '只在数值轴中（type: ·value·）有效。是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。在设置 min 和 max 之后该配置项无效。', value: false, type: 'switch' },
  { id: 18, name: 'splitNumber', description: '坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。', value: 5, type: 'input' },
  { id: 19, name: 'minInterval', description: '自动计算的坐标轴最小间隔大小。', value: 0, type: 'input' },
  { id: 20, name: 'maxInterval', description: '自动计算的坐标轴最大间隔大小。', value: '', type: 'input' },
  { id: 21, name: 'interval', description: '强制设置坐标轴分割间隔。因为 splitNumber 是预估的值，实际根据策略计算出来的刻度可能无法达到想要的效果，这时候可以使用 interval 配合 min、max 强制设定刻度划分，一般不建议使用。无法在类目轴中使用。在时间轴（type: "time"）中需要传时间戳，在对数轴（type: "log"）中需要传指数值。', value: '', type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 23, name: 'silent', description: '坐标轴是否是静态无法交互。', value: false, type: 'switch' },
  { id: 24, name: 'triggerEvent', description: '坐标轴的标签是否响应和触发鼠标事件，默认不响应。', value: false, type: 'switch' },
  {
    id: 25, name: 'axisLine', description: '坐标轴轴线相关设置。', value: '', type: '', children: [
      { id: '25-1', name: 'show', description: '是否显示坐标轴轴线。', value: true, type: 'switch' },
      { id: '25-2', name: 'onZero', description: 'X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。', value: true, type: 'switch' },
      { id: '25-3', name: 'onZeroAxisIndex', description: '当有双轴时，可以用这个属性手动指定，在哪个轴的 0 刻度上。', value: 10, type: 'input' },
      { id: '25-4', name: 'symbol', description: '轴线两边的箭头。可以是字符串，表示两端使用同样的箭头；或者长度为 2 的字符串数组，分别表示两端的箭头。默认不显示箭头，即 `none`。两端都显示箭头可以设置为 `arrow`，只在末端显示箭头可以设置为 [`none`, `arrow`]。', value: 'none', type: 'input' },
      { id: '25-5', name: 'symbolSize', description: '轴线两边的箭头的大小，第一个数字表示宽度（垂直坐标轴方向），第二个数字表示高度（平行坐标轴方向）。', value: '[10, 15]', type: 'input' },
      { id: '25-6', name: 'symbolOffset', description: '轴线两边的箭头的偏移，如果是数组，第一个数字表示起始箭头的偏移，第二个数字表示末端箭头的偏移；如果是数字，表示这两个箭头使用同样的偏移。', value: '[0, 0]', type: 'input' },


    ]
  },
  {
    id: 26, name: 'axisTick ', description: '坐标轴刻度相关设置。', value: '', type: '', children: [
      { id: '26-2', name: 'show', description: '是否显示坐标轴刻度。', value: true, type: 'switch' },
      { id: '26-3', name: 'alignWithLabel', description: '类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。如下图：', value: false, type: 'switch' },
      { id: '26-4', name: 'interval', description: '坐标轴刻度的显示间隔，在类目轴中有效。nuber或者function', value: 'auto', type: 'input' },
      { id: '26-5', name: 'inside', description: '坐标轴刻度是否朝内，默认朝外。', value: false, type: 'switch' },
      { id: '26-6', name: 'length', description: '坐标轴刻度的长度。', value: 5, type: 'input' },
      {
        id: '26-7', name: 'lineStyle', description: '刻度线的样式设置。', value: '', type: '', children: getLineStyle(
          ['26-7-1','26-7-2','26-7-3','26-7-4','26-7-5','26-7-6','26-7-7','26-7-8','26-7-9','26-7-10','26-7-11','26-7-12']
        )
      },

    ]
  },
  {
    id: 27, name: 'minorTick', description: '坐标轴次刻度线相关设置。注意：次刻度线无法在类目轴（type: "category"）中使用。 ', value: '', type: '', children: [
      { id: '27-1', name: 'show', description: '是否显示次刻度线', value: false, type: 'switch' },
      { id: '27-1', name: 'splitNumber', description: '是否显示次刻度线', value: false, type: 'switch' },
      { id: '27-1', name: 'length', description: '次刻度线的长度。', value: 3, type: 'input' },
      {
        id: '27-1', name: 'lineStyle', description: '', value: '', type: '',  children: getLineStyle(
          ['27-1-1','27-1-2','27-1-3','27-1-4','27-1-5','27-1-6','27-1-7','27-1-8','27-1-9','27-1-10','27-1-11','27-1-12']
        )
      },


    ]
  },
  { id: 28, name: 'axisLabel', description: '坐标轴刻度标签的相关设置。', value: '', type: '' ,children:[
    { id: '28-1', name: 'show', description: '是否显示刻度标签。', value: true, type: 'switch' },
    { id: '28-1', name: 'interval', description: '坐标轴刻度标签的显示间隔，在类目轴中有效。function number', value: 'auto', type: 'input' },
    { id: '28-1', name: 'inside', description: '刻度标签是否朝内，默认朝外。', value: false, type: 'switch' },
    { id: '28-1', name: 'rotate', description: '刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。旋转的角度从 -90 度到 90 度。', value: 0, type: 'input' },
    { id: '28-1', name: 'margin', description: '刻度标签与轴线之间的距离。', value: 8, type: 'input' },
    { id: '28-1', name: 'formatter', description: '刻度标签的内容格式器，支持字符串模板和回调函数两种形式。', value: '', type: 'input' },
    { id: '28-1', name: 'showMinLabel', description: '是否显示最小 tick 的 label。', value: '', type: 'switch' },
    { id: '28-1', name: 'showMaxLabel', description: '是否显示最大 tick 的 label。', value: '', type: 'switch' },
    { id: '28-1', name: 'hideOverlap', description: '是否隐藏重叠的标签。', value: false, type: 'switch' },
    { id: '28-1', name: 'color', description: '刻度标签文字的颜色，默认取 axisLine.lineStyle.color。', value: '', type: 'color' },
    { id: '28-1', name: 'fontStyle', description: '文字字体的风格。', value: 'normal', type: 'select',data:[{label:'oblique',value:'oblique'},{label:'italic',value:'italic'},{label:'normal',value:'normal'},] },
    { id: '28-1', name: 'fontWeight', description: '文字字体的粗细。', value: 'normal', type: 'select', data: [{ label: 'bolder', value: 'bolder' }, { label: 'bold', value: 'bold' }, { label: 'normal', value: 'normal' }, { label: 'lighter', value: 'lighter' }, { label: '100', value: 100 }, { label: '200', value: 200 }, { label: '300', value: 300 }, { label: '400', value: 400 }, { label: '500', value: 500 }, { label: '600', value: 600 }, { label: '700', value: 700 }, { label: '800', value: 800 }, { label: '900', value: 900 }] },
    { id: '28-1', name: 'fontFamily', description: '坐标轴名称文字的字体系列。', value: 'sans-serif', type: 'select', data: [{ value: 'serif', label: 'serif' }, { value: 'monospace', label: 'monospace' }, { value: 'Arial', label: 'Arial' }, { value: 'Courier New', label: 'Courier New' }, { value: 'Microsoft YaHei', label: 'Microsoft YaHei' }], config: ['allow-create'] },
    { id: '28-1', name: 'fontSize', description: '文字的字体大小。', value: 12, type: 'input' },
    { id: '28-1', name: 'align', description: '文字水平对齐方式，默认自动。', value: '', type: 'select', data: [{ label: 'right', value: 'right' }, { label: 'center', value: 'center' }, { label: 'left', value: 'left' },] },
    { id: '28-1', name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },

  ]},
  { id: 29, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 30, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 31, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 32, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 33, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 34, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 35, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },
  { id: 22, name: 'logBase', description: '对数轴的底数，只在对数轴中（type: "log"）有效。', value: 10, type: 'input' },


]
function getLineStyle(ids):dataInter[] {
  return [
    { id: ids[0], name: 'color', description: '刻度线的颜色，默认取 axisTick.lineStyle.color。', value: '', type: 'color' },
    { id: ids[1], name: 'width', description: '坐标轴刻度线宽。', value: 1, type: 'input' },
    { id: ids[2], name: 'type', description: '线的类型。', value: 'solid', type: 'select', data: [{ label: 'dotted', value: 'dotted' }, { label: 'dashed', value: 'dashed' }, { label: 'solid', value: 'solid' },] },
    { id: ids[3], name: 'dashOffset', description: '用于设置虚线的偏移量，可搭配 type 指定 dash array 实现灵活的虚线效果。', value: 0, type: 'input' },
    { id:ids[4], name: 'cap', description: '用于指定线段末端的绘制方式', value: 'butt', type: 'select', data: [{ label: 'square', value: 'square' }, { label: 'round', value: 'round' }, { label: 'butt', value: 'butt' },] },
    { id:ids[5], name: 'join', description: '用于设置2个长度不为0的相连部分（线段，圆弧，曲线）如何连接在一起的属性（长度为0的变形部分，其指定的末端和控制点在同一位置，会被忽略）。', value: 'bevel', type: 'select', data: [{ label: 'bevel', value: 'bevel' }, { label: 'round', value: 'round' }, { label: 'miter', value: 'miter' },] },
    { id:ids[6], name: 'miterLimit', description: '用于设置斜接面限制比例。只有当 join 为 miter 时， miterLimit 才有效。默认值为 10。负数、0、Infinity 和 NaN 均会被忽略。', value: 10, type: 'input' },
    { id: ids[7], name: 'shadowBlur', description: '图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。', value: '', type: 'input' },
    { id: ids[8], name: 'shadowColor', description: '阴影颜色。', value: '', type: 'color' },
    { id:ids[9], name: 'shadowOffsetX', description: '阴影水平方向上的偏移距离。', value: 0, type: 'input' },
    { id: ids[10], name: 'shadowOffsetY', description: '阴影垂直方向上的偏移距离。', value: 0, type: 'input' },
    { id:ids[11], name: 'opacity', description: '图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。', value: 1, type: 'input' },
  ]
}
export default data