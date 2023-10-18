<template>
  <div class="box">
    <div class="top">
      <div class="flex flex-space">
        <div class="v-shape-left" @click="changeDate('jian')"></div>
        <div class="date m-l-10">
          {{ getDate().year }}-{{
            getDate().month <= 9 ? "0" + getDate().month : getDate().month
          }}
          <span class="v-shape-top" @click="open"></span>
        </div>
        <div class="v-shape-right m-l-10" @click="changeDate('add')"></div>
      </div>
    </div>
    <div class="select-time" v-show="visible">
      <div class="year">
        <div
          class="item"
          @click="changeYear(item)"
          v-for="item in years"
          :key="item.value"
          :style="
            this.select.getFullYear() === item.value ? 'background:red;' : ''
          "
        >
          {{ item.value }}
        </div>
      </div>
      <div class="month">
        <div
          class="item"
          @click="changeMonth(item)"
          v-for="item in month"
          :key="item.value"
          :style="
            this.select.getMonth() + 1 === +item.value ? 'background:red;' : ''
          "
        >
          {{ item.value }}
        </div>
      </div>
    </div>

    <div class="two" @click="visible = false">
      <div class="one flex">
        <div v-for="d in day" :key="d" class="one-item">{{ d }}</div>
      </div>
      <div
        v-for="num in [1, 2, 3, 4, 5, 6]"
        :key="num"
        class="m-t-10"
        @click="visible = false"
      >
        <div class="flex">
          <div
            v-for="(r, index) in getDay()[num - 1]"
            :key="index"
            class="one-item height"
            :style="
              'color:' +
              r.color +
              ';' +
              ((r.color ? '' : checkNowDate(r.value))
                ? 'background:red;color:white;border-radius:30px;'
                : '')
            "
          >
            <div>{{ r.value }}</div>
            <div style="font-size: 14px">
              {{ getLunar(r, num - 1).dateStr.split("月")[1] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {getLunar} from './calendar'
import { getLunar } from 'chinese-lunar-calendar'
export default {
  data() {
    return {
      day: ['一', '二', '三', '四', '五', '六', '日'],
      select: new Date(),
      years: [],
      month: [],
      visible: false
    }
  },
  created() {
    for (let i = 1901; i <= 2050; i++) {
      this.years.push({ value: i })
    }
    for (let i = 1; i <= 12; i++) {
      this.month.push({ value: i <= 9 ? '0' + i : i })
    }
  },
  computed: {

  },
  methods: {
    open() {
      this.visible = !this.visible

      const year = document.getElementsByClassName('year')[0]
      const month = document.getElementsByClassName('month')[0]
      const yearIndex = this.select.getFullYear() - 1901
      const monthIndex = this.select.getMonth()
      year.scrollTop = 25 * yearIndex
      month.scrollTop = monthIndex * 23



    },
    getLunar(r, num) {
      if (r.color) {
        if (num === 0) {
          if (this.select.getMonth() === 0) {

            return getLunar(this.select.getFullYear() - 1, 12, r.value)

          } else {
            return getLunar(this.select.getFullYear(), this.select.getMonth(), r.value)

          }
        } else {
          if (this.select.getMonth() === 11) {
            return getLunar(this.select.getFullYear() + 1, 1, r.value)

          } else {
            return getLunar(this.select.getFullYear(), this.select.getMonth() + 2, r.value)

          }
        }
      }
      return getLunar(this.select.getFullYear(), this.select.getMonth() + 1, r.value)


    },
    changeYear(year) {
      this.select = new Date(`${year.value} ${this.select.getMonth() + 1}-01`)
      this.visible = false
    },
    changeMonth(month) {
      this.select = new Date(`${this.select.getFullYear()} ${month.value}-01`)
      this.visible = false
    },
    checkNowDate(day) {
      if (this.select.getFullYear() !== new Date().getFullYear() || this.select.getMonth() !== new Date().getMonth()) return false

      if (new Date().getDate() === day) {
        return true
      }
      return false
    },
    changeDate(type) {
      this.visible = false
      if (type === 'add') {
        if (!this.select) {
          let date = new Date()
          if (date.getMonth() === 11) {
            this.select = new Date(`${date.getFullYear() + 1} ${1}-01`)
          } else {
            this.select = new Date(`${date.getFullYear()} ${date.getMonth() + 2}-01`)

          }
        } else {
          if (this.select.getMonth() === 11) {
            this.select = new Date(`${this.select.getFullYear() + 1} ${1}-01`)
          } else {
            this.select = new Date(`${this.select.getFullYear()} ${this.select.getMonth() + 2}-01`)
          }
        }
      } else {
        if (!this.select) {
          let date = new Date()
          if (date.getMonth() === 0) {
            this.select = new Date(`${date.getFullYear() - 1} ${12}-01`)
          } else {
            this.select = new Date(`${date.getFullYear()} ${date.getMonth()}-01`)

          }
        } else {
          if (this.select.getMonth() === 0) {
            this.select = new Date(`${this.select.getFullYear() - 1} ${12}-01`)
          } else {
            this.select = new Date(`${this.select.getFullYear()} ${this.select.getMonth()}-01`)

          }
        }
      }
    },
    getDate() {
      let date = this.select ? this.select : new Date()
      return { year: date.getFullYear(), month: date.getMonth() + 1, date: date.getDate(), day: date.getDay() }
    },
    getDay() {
      let date = this.getDate()
      let oneDate
      let lastMonth

      oneDate = new Date(`${date.year} ${date.month}-01`).getDay()
      if (oneDate === 0) oneDate = 7
      lastMonth = this.forMonetYeayGetDays(new Date(`${date.year} ${date.month - 1}-01`))
      let result = [[], [], [], [], [], []]
      for (let i = oneDate - 2; i >= 0; i--) {
        result[0][i] = { value: lastMonth, color: '#ccc' }
        lastMonth--
      }
      result[0][oneDate - 1] = { value: 1 }
      let last = 6 - (oneDate - 1) + 2
      for (let i = oneDate; i <= 6; i++) {
        result[0][i] = { value: i - (oneDate - 1) + 1 }
      }
      let nowDay = this.forMonetYeayGetDays(this.select ? this.select : new Date())
      let i = 1
      while (last <= nowDay) {
        result[i].push({ value: last })
        last++
        if (result[i].length === 7) {
          i++
        }
      }
      if (i === 5) {
        let l = result[i].length
        for (let j = l; j < 7; j++) {
          result[i].push({ value: j - l + 1, color: '#ccc' })
        }
      } else {

        let l = result[i].length
        for (let j = l; j < 7; j++) {
          result[i].push({ value: j - l + 1, color: '#ccc' })
        }
        for (let j = 0; j < 7; j++) {
          result[5].push({ value: result[4][6].value + j + 1, color: '#ccc' })
        }
      }
      return result

    },
    forMonetYeayGetDays(date) {
      if ([1, 3, 5, 7, 8, 10, 12].includes(date.getMonth() + 1)) {
        return 31
      }
      if ([4, 6, 9, 11].includes(date.getMonth() + 1)) {
        return 30
      }
      let year = date.getFullYear()
      if (year % 4 == 0 && year % 100 !== 0 || year % 400 === 0) {
        return 29
      }
      return 28
    }
  }
}
</script>
<style lang="scss" scoped>
.v-shape-top {
  @include triangle($direction: top);
  cursor: pointer;
}

.v-shape-top:before {
  @include triangleB($direction: top);
}
.v-shape-left {
  @include triangle($direction: left);
  cursor: pointer;
}

.v-shape-left:before {
  @include triangleB($direction: left, $border-color: #f6f7f8);
}
.v-shape-right {
  @include triangle($direction: right);
  cursor: pointer;
}

.v-shape-right:before {
  @include triangleB($direction: right, $border-color: #f6f7f8);
}
.box {
  position: relative;
  width: 400px;
  height: 382px;
  background: #f6f7f8;
  margin: auto;
  margin-top: 100px;
  .top {
    width: 100%;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    .date {
      border: 1px solid #e0e1e1;
      border-radius: 20px;
      padding: 4px 13px;
      box-sizing: border-box;
      width: 100px;
      background: #e3e4e5;
      color: #5a5a5a;
      display: flex;
      span {
        margin-top: 3px;
        margin-left: 3px;
      }
    }
  }
}
.two {
  padding: 0 20px;
  .one-item {
    width: calc(calc(400px - 40px) / 7);
    text-align: center;
  }
  .height {
    height: 40px;
    padding-top: 4px;
    box-sizing: border-box;
  }
}
.select-time {
  position: absolute;
  width: 100px;
  height: 220px;
  box-shadow: 0px 0px 5px #c1c1c1;
  margin: auto;
  background: white;
  left: 151px;
  //
  display: flex;
  .year {
    width: 50%;
    margin-top: 4px;
    height: 210px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .item {
    text-align: center;
    padding: 4px 0px;
    cursor: pointer;
  }
  .item:hover {
    background: #ececec;
  }
  .month {
    width: 50%;
    margin-top: 4px;
    height: 210px;
    overflow-y: scroll;
  }
  .year::-webkit-scrollbar {
    width: 4px;
  }

  .year::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
    background: #c4c4c4;
  }

  .year::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: white;
  }
  .month::-webkit-scrollbar {
    width: 4px;
  }

  .month::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    opacity: 0.2;
    background: #c4c4c4;
  }

  .month::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: white;
  }
}
</style>