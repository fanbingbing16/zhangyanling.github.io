<template>
  <div class="tianqi">
    <img
      src="https://search-operate.cdn.bcebos.com/cd614b12ef78f515e478c2494086b370.png"
    />
    <div class="content">
      <div class="flex top">
        <div>上海</div>
        <div>16：50更新</div>
      </div>
      <div class="top-weather flex">
        <div class="big">32°</div>
        <div class="detail m-l-10">
          <div>晴 东北风1级</div>
          <div class="flex">
            <span>26~33℃</span>
            <div class="tag">78良</div>
          </div>
        </div>
      </div>
      <div class="select-weather">
        <div class="button-list flex">
          <div
            v-for="(type, index) in weatherType"
            :key="index"
            @click="selectWeatherType = type"
            :style="
              selectWeatherType === type ? 'background:rgba(0,0,0,0.3);' : ''
            "
          >
            {{ type }}
          </div>
        </div>
        <div
          class="load_4cwYw back_5ndVv"
          v-if="weatherSlice[0] > 0"
          @click="changeSlice('jian')"
        >
          <i class="cos-icon cu-icon icon_roUEV OP_LOG_BTN" data-module="lgin">
            ＜
          </i>
        </div>
        <div
          class="load_4cwYw more_3kyUW"
          @click="changeSlice('add')"
          v-if="weatherSlice[0] < timeWeather.length - 10"
        >
          <i class="cos-icon cu-icon icon_roUEV OP_LOG_BTN" data-module="lgin"
            >＞</i
          >
        </div>
        <div class="air" v-if="selectWeatherType === '气温'">
          <div
            v-for="(air, index) in timeWeather.slice(
              weatherSlice[0],
              weatherSlice[1]
            )"
            :key="index"
            class="air-one"
          >
            <div>{{ air.time }}</div>
            <img :src="air.image" />
            <div>{{ air.tem }}</div>
            <div class="tag">{{ air.text }}</div>
          </div>
        </div>
        <div class="wind air" v-if="selectWeatherType === '风力'">
          <div
            v-for="(air, index) in timeWeather.slice(
              weatherSlice[0],
              weatherSlice[1]
            )"
            :key="index"
            class="air-one"
          >
            <div>{{ air.time }}</div>
            <div>{{ air.wind }}</div>
            <div class="back">
              <img :src="direction" :style="windDirectionStyle(air)" />
              <div>{{ air.windDirection }}</div>
            </div>
          </div>
        </div>
        <div class="precipitation air" v-if="selectWeatherType === '降水量'">
          <div
            v-for="(air, index) in timeWeather.slice(
              weatherSlice[0],
              weatherSlice[1]
            )"
            :key="index"
            class="air-one"
          >
            <div>{{ air.time }}</div>
            <div>{{ air.precipitation }}</div>
            <div class="back"></div>
          </div>
        </div>
        <div
          class="ultravioletRays air"
          v-show="selectWeatherType === '紫外线'"
        >
          <div
            v-for="(air, index) in timeWeather.slice(
              weatherSlice[0],
              weatherSlice[1]
            )"
            :key="index"
            class="air-one"
          >
            <div>{{ air.time }}</div>
            <div class="line" :style="getLineSty(index)">
              {{ data.slice(
              weatherSlice[0],
              weatherSlice[1]
            )[index] }}级
            </div>
          </div>
        </div>
      </div>
      <div class="prediction">
        <div class="top flex">
          <div>15天预报</div>
          <div class="flex toggle-button">
            <div
              :style="selectType === '趋势' ? 'background:white;' : ''"
              @click="selectType = '趋势';clickTime = ''"
            >
              趋势
            </div>
            <div
              :style="selectType === '列表' ? 'background:white;' : ''"
              @click="selectType = '列表';clickTime = ''"
            >
              列表
            </div>
          </div>
        </div>
        <div
          class="load_4cwYw back_5ndVv two"
          v-if="typeSlice[0] > 0 && selectType === '趋势'"
          @click="changeTypeSlice('jian')"
        >
          <i class="cos-icon cu-icon icon_roUEV OP_LOG_BTN" data-module="lgin">
            ＜
          </i>
        </div>
        <div
          class="load_4cwYw more_3kyUW two"
          @click="changeTypeSlice('add')"
          v-if="typeSlice[0] < fifteenDays.length - 7 && selectType === '趋势'"
        >
          <i class="cos-icon cu-icon icon_roUEV OP_LOG_BTN" data-module="lgin"
            >＞</i
          >
        </div>
        <div class="content flex" v-if="selectType === '趋势'">
          <div
            class="content-one"
            v-for="(fif, index) in fifteenDays.slice(
              typeSlice[0],
              typeSlice[1]
            )"
            :key="index"
            :style="clickTime === index ? 'background:rgb(221 221 221);' : ''"
            @click="clickTime = index"
          >
            <div>{{ fif.day }}</div>
            <div>{{ fif.time }}</div>
            <img :src="fif.tian1" />
            <div>{{ fif.min }}°</div>
            <div>{{ fif.max }}°</div>
            <img :src="fif.tian2" />
            <div>{{ fif.direction }}</div>
            <div>{{ fif.wind }}</div>
          </div>
        </div>
        <div class="content lie" v-if="selectType === '列表'">
          <div
            class="content-one flex"
            v-for="(fif, index) in fifteenDays"
            :style="clickTime === index ? 'background:rgb(221 221 221);' : ''"
            @click="clickTime = index"
            :key="index"
          >
            <div>{{ fif.day }}</div>
            <div>{{ fif.time }}</div>
            <img :src="fif.tian1" />
            <div>{{ fif.min }}°</div>
            <div>{{ fif.max }}°</div>
            <img :src="fif.tian2" />
            <div>{{ fif.direction }}</div>
            <div>{{ fif.wind }}</div>
          </div>
        </div>
        <div v-if="clickTime !== ''" class="text">
          <div class="title">
            {{
              selectType === "列表"
                ? fifteenDays[clickTime] && fifteenDays[clickTime].text
                : fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime]&&fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime].text
            }}
            {{
              selectType === "列表"
                ? fifteenDays[clickTime] && fifteenDays[clickTime].min
                : fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime]&&fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime].min
            }}
            ~{{
              selectType === "列表"
                ? fifteenDays[clickTime] && fifteenDays[clickTime].max
                :fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime]&& fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime].max
            }}
          </div>
          <div>风力风向</div>
          <div>
            {{selectType === "列表"
                ? fifteenDays[clickTime] && fifteenDays[clickTime].direction
                : fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime].direction
            }}{{selectType === "列表"
                ? fifteenDays[clickTime] && fifteenDays[clickTime].wind
                : fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime]&&fifteenDays.slice(typeSlice[0], typeSlice[1])[clickTime].wind }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {

  },
  data() {
    return {
      data: [4, 8, 9, 9, 6, 6, 5, 3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 3, 0, 0, 0, 4, 5, 4, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      weatherType: ['气温', '风力', '降水量', '紫外线'],
      selectWeatherType: '气温',
      weatherSlice: [0, 10],
      typeSlice: [0, 7],
      timeWeather: [],
      monn: 'https://gips1.baidu.com/it/u=368649220,551644837&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84',
      cloudy: 'https://gips2.baidu.com/it/u=4212037040,745107134&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84',
      sum: 'https://gips3.baidu.com/it/u=2101432901,1526676003&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84',
      yin: 'https://gips3.baidu.com/it/u=2471441282,2172258151&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84',
      rain: 'https://gips2.baidu.com/it/u=3385441121,2880448970&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f84_84',
      direction: 'https://search-operate.cdn.bcebos.com/00d4c7018608f525ccf439fc1de20b51.png',
      selectType: '趋势',
      fifteenDays: [],
      clickTime: ''
    }
  },
  created() {
    this.timeWeather = [
      { time: '现在', image: this.sum, tem: 30, text: '优', wind: '1级', windDirection: '东北风', precipitation: '0.0mm' }
    ]
    let date = new Date()
    let tian = ['cloudy', 'sum', 'yin', 'rain']
    for (let i = date.getHours() + 1; i < 24; i++) {
      this.timeWeather.push(
        { time: i + ':00', image: i > 18 && i < 22 ? this.monn : (i >= 22 || i <= 9 ? this.yin : this[tian[i % 4]]), tem: 30 + i % 3, text: '优', wind: '3-4级', windDirection: '东风', precipitation: '0.0mm' }
      )
    }
    this.timeWeather.push(
      { time: this.getTomorrow(date), image: this.yin, tem: 26, text: '优', wind: '4-5级', windDirection: '东风', precipitation: '0.0mm' }
    )
    for (let i = 1; i < 24; i++) {
      this.timeWeather.push(
        { time: i + ':00', image: i > 18 && i < 22 ? this.monn : (i >= 22 || i <= 9 ? this.yin : this[tian[i % 4]]), tem: 30 + i % 3, text: '优', wind: '4-5级', windDirection: '东南风', precipitation: '0.0mm' }
      )
    }
    this.timeWeather.push(
      { time: this.getTomorrow(new Date(`${date.getFullYear}/${this.getTomorrow(date)}`)), image: this.yin, tem: 26, text: '优', wind: '4-5级', windDirection: '东南风', precipitation: '0.0mm' }
    )
    for (let i = 1; i < 24; i++) {
      this.timeWeather.push(
        { time: i + ':00', image: i > 18 && i < 22 ? this.monn : (i >= 22 || i <= 9 ? this.yin : this[tian[i % 4]]), tem: 30 + i % 3, text: '优', wind: '4-5级', windDirection: '东南风', precipitation: '0.0mm' }
      )
    }
    //格式化日期
    Date.prototype.Format = function (fmt = "yyyy-MM-dd") {
      let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    //获取当前日期
    let today = new Date();
    // 获取前一天
    let yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2);
    //结束时间
    let newDate = date.setDate(date.getDate() + 12)
    let endTime = new Date(newDate).Format("yyyy-MM-dd"); //加完15天以后的时间
    let fifteenDays = this.getBetween(endTime, yesterday.Format("yyyy-MM-dd"))
    this.fifteenDays = fifteenDays.map((item, index) => {
      let day = index <= 2 ? ['昨天', '今天', '明天'][index] : (this.getDayZhou(new Date(`${date.getFullYear()}/${item}`).getDay()))
      const min = Math.floor(Math.random() * 10) + 20
      const tian1 = Math.round(Math.random() * 3)
      const tian2 = Math.round(Math.random() * 3)
      const type = { 'cloudy': '多云', 'sum': '晴天', 'yin': '阴天', 'monn': '黑', 'rain': '雨天' }
      return {
        day,
        time: item,
        min,
        max: min + Math.floor(Math.random() * 4) + 2,
        tian1: this[['cloudy', 'sum', 'yin', 'rain'][tian1]],
        tian2: this[['cloudy', 'sum', 'yin', 'rain'][tian2]],
        direction: ['西北风', '西风', '东北风', '西南风', '南风', '东南风', '东风', '北风', '西风'][Math.floor(Math.random() * 9)],
        wind: ['1级', '<3级', '3-4级', '4-5级'][Math.floor(Math.random() * 4)],
        text: `${tian1 === tian2 ? type[['cloudy', 'sum', 'yin', 'rain', 'monn'][tian1]] : (type[['cloudy', 'sum', 'yin', 'rain', 'monn'][tian1]] + '转' + type[['cloudy', 'sum', 'yin', 'rain', 'monn'][tian2]])}`
      }
    })

  },
  computed: {
    windDirectionStyle() {
      let temp = {
        '东北风': 225,
        '东风': 270,
        '东南风': 315

      }
      return (air) => {
        return {
          'transform': `rotate(${temp[air.windDirection]}deg)`
        }
      }
    },
    getLineSty() {

      const topColor = ['#51f243', '#78f229', '#a3f20c', '#c5dc05', '#d7c40c', '#ff8a1c', '#ff7929', '', ' #fc4b51', '#e1407c']

      return (index) => {
        return {
          'height': this.data.slice(this.weatherSlice[0], this.weatherSlice[1])[index] * 4 + 'px',
          'border-top': `4px solid ${topColor[this.data.slice(this.weatherSlice[0], this.weatherSlice[1])[index]]}`,
          'margin-top': (9 - this.data.slice(this.weatherSlice[0], this.weatherSlice[1])[index]) * 4 + 10 + 'px'
        }
      }
    }
  },
  methods: {
    changeTypeSlice(type) {
      this.clickTime = ''
      if (type === 'add') {
        this.typeSlice[0] += 7
        this.typeSlice[1] += 7
        if (this.typeSlice[0] >= this.fifteenDays.length) {
          this.typeSlice[0] -= 7
          this.typeSlice[1] -= 7
        }

      } else {
        this.typeSlice[0] -= 7
        this.typeSlice[1] -= 7
      }
    },
    changeSlice(type) {
      if (type === 'add') {
        this.weatherSlice[0] += 10
        this.weatherSlice[1] += 10
        if (this.weatherSlice[0] >= this.timeWeather.length) {
          this.weatherSlice[0] -= 10
          this.weatherSlice[1] -= 10
        }

      } else {
        this.weatherSlice[0] -= 10
        this.weatherSlice[1] -= 10
      }
    },
    getDayZhou(day) {

      return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][day]
    },
    getTomorrow(date) {
      let tomorrow = new Date(date.setDate(date.getDate() + 1));
      return `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`
    },
    getBetween(day1, day2) {
      let dateArr = new Array();
      let currentDate;
      let getDate = function (str) {
        let tempDate = new Date();
        let list = str.split("-");
        tempDate.setFullYear(list[0]);
        tempDate.setMonth(list[1] - 1);
        tempDate.setDate(list[2]);
        return tempDate;
      }
      let date1 = getDate(day1);
      let date2 = getDate(day2);
      if (date1 > date2) {
        let tempDate = date1;
        date1 = date2;
        date2 = tempDate;
      }
      date1.setDate(date1.getDate() + 1);
      dateArr = [];
      let i = 0;
      while (!(date1.getFullYear() == date2.getFullYear()
        && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
          .getDate())) {
        let dayStr = date1.getDate().toString();
        if (dayStr.length == 1) {
          dayStr = "0" + dayStr;
        }
        dateArr[i] = (date1.getMonth() + 1) + "/" + dayStr;
        i++;
        date1.setDate(date1.getDate() + 1);
      }
      currentDate = new Date(day1).Format('MM/dd');
      dateArr.push(currentDate)
      return dateArr;
    }
  }
}
</script>
<style lang="scss" scoped>
.tianqi {
  box-shadow: 0px 0px 10px #d5d5d5;
  margin: auto;
  margin-top: 10%;
  width: 600px;
  border-radius: 10px;
  background-image: #4783bd;
  color: white;
  padding: 20px;
  position: relative;
  // background: url('https://search-operate.cdn.bcebos.com/cd614b12ef78f515e478c2494086b370.png');
  object-fit: contain;
  img {
    width: 100%;
    position: absolute;
    top: 0;
    border-radius: 10px;
    left: 0;
    object-fit: cover;
    height: 100%;
  }
  .content {
    position: relative;
    .load_4cwYw.more_3kyUW {
      right: 0;
    }
    .load_4cwYw.back_5ndVv {
      left: 0;
    }

    .load_4cwYw {
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      background-color: #fff;
      height: 32px;
      width: 32px;
      border-radius: 16px;
      font-size: 16px;
      opacity: 0.8;
      cursor: pointer;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);
      z-index: 2;
      text-align: center;
      user-select: none;
      .icon_roUEV {
        color: #333;
        line-height: 32px;
        width: 16px;
        height: 32px;
        margin: 0 auto;
      }
      .cu-icon {
        font-family: cosmicIcon !important;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    .two {
      top: 70%;
    }
    .load_4cwYw:hover {
      opacity: 1;
    }
  }
  .top {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .top-weather {
    text-align: start;
    margin-top: 20px;
    .big {
      font-size: 62px;
    }

    .detail div:first-child {
      font-size: 16px;
    }
    .detail div:last-child {
      font-size: 22px;
      font-weight: 600;
    }
    .detail {
      .tag {
        background: #f0bc00;
        border-radius: 4px;
        font-size: 14px !important;
        font-weight: 500 !important;
        margin-left: 8px;
        padding: 4px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
  .select-weather {
    margin-top: 10px;

    .button-list {
      div {
        padding: 6px 10px;
        border-radius: 10px;
        font-size: 14px;
        margin-right: 4px;
        cursor: pointer;
      }
      div:hover {
        background: rgba(0, 0, 0, 0.2);
      }
    }
    .air {
      overflow-y: hidden;
      display: flex;
      overflow-x: hidden;
      width: 100%;
      margin-top: 10px;
      img {
        width: 30px;
        height: 30px;
        position: relative;
        margin-top: 10px;
        margin-bottom: 4px;
      }
      .air-one {
        width: 50px;
        margin-right: 10px;
        div {
          width: 50px;
          font-family: "宋体", Simsun;
        }
        .tag {
          background: #37d43c;
          border-radius: 4px;
          width: 20px;
          margin-left: 15px;
          font-family: "wei";
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .wind {
      .air-one {
        width: 50px;
        text-align: center;
        div {
          width: 50px;
          // margin-top: 10px;
        }
        div:nth-child(2) {
          margin-top: 10px;
          margin-bottom: 6px;
        }
      }
      .back {
        background: rgb(55 212 60 / 15%);
        border-radius: 4px;
        margin-bottom: 10px;
        padding: 4px 4px;
        font-size: 14px;
        img {
          width: 20px;
          height: 20px;
        }
        div {
          margin-top: 0 !important;
        }
      }
    }
    .precipitation {
      .air-one {
        div:nth-child(2) {
          margin-top: 10px;
          margin-bottom: 4px;
        }
        .back {
          background: rgb(82 207 227 / 50%);
          height: 40px;
          border-top: 4px solid #00dbfa;
          margin-bottom: 10px;
          border-radius: 4px;
        }
      }
    }
    .ultravioletRays {
      .air-one {
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
  .prediction {
    background: white;
    border-radius: 10px;
    margin-top: 10px;
    padding: 10px 20px;
    width: 100%;
    margin-left: -20px;
    color: black;
    .top {
      .toggle-button {
        background: #f2f3f5;
        border: 2px solid #f2f3f5;
        border-radius: 8px;

        div {
          padding: 3px 7px;
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }
    .content {
      cursor: pointer;
      // display: flex;
      width: 100%;
      // overflow-x: scroll;
      overflow-x: hidden;
      .content-one {
        width: 85.72px;
        padding: 10px;
        border-radius: 10px;
        box-sizing: border-box;
        div {
          width: 60px;
        }
        img {
          width: 30px;
          position: relative;
          height: 30px;
        }
      }
      .content-one:hover {
        background: #f2f3f5;
      }
    }

    .content::-webkit-scrollbar {
      width: 4px;
    }
    .content::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.2);
    }
    .content::-webkit-scrollbar-track {
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .lie {
      overflow-x: hidden;
      overflow-y: scroll;
      height: 205px;
      .content-one {
        width: 100%;
        div {
          width: calc(calc(100% - 60px) / 6);
          // text-align: left;
        }
      }
    }
    .text {
      background: #f7f7f8;
      text-align: left;
      padding: 20px;
      border-radius: 10px;
      div:nth-child(2) {
        margin-top: 10px;
      }
      .title {
        margin-top: 0;
        position: relative;
      }
      .title::before {
        content: " ";
        width: 150px;
        height: 10px;
        background: #bad6f3ad;
        display: block;
        position: absolute;
        top: 11px;
        border-radius: 10px;
      }
    }
  }
}
</style> 