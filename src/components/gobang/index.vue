<template>
  <div class="mineDlearance">
    <div class="game">
      <div class="flex">
        <h1 class="top">五子棋</h1>
        <div v-if="isMachine" class="m-l-10">机器人小福正持黑棋与您作战</div>
      </div>

      <div class="game-main">
        <div v-for="(box, index) in boxs" :key="index" class="flex">
          <div
            v-for="(item, index2) in box"
            :key="index2"
            class="item-one"
            @click="clickBox(item)"
          >
            <div
              v-if="item.place"
              class="circle"
              :style="'background:' + (item.place === 1 ? 'white' : '#000')"
            ></div>
          </div>
        </div>
      </div>
      <el-button
        class="m-t-10"
        type="primary"
        v-if="!isMachine"
        @click="
          init();
          isMachine = true;
        "
      >
        人机对战
      </el-button>
    </div>
    <dialog-vue dialogTitle="提示" v-model:visible="visible">
      <template v-slot:body>
        {{ tip }}
      </template>
      <template v-slot:footer>
        <el-button @click="init">重新开始</el-button>
      </template>
    </dialog-vue>
  </div>
</template>
<script >
import { ref } from 'vue'
import dialogVue from '../comm/dialog.vue'
export default {
  components: {
    dialogVue
  },
  setup() {
    //机器人玩五子棋的思路是
    //当用户有三个连在一起时，挡住一边，有四个时，阻挡用户，其他情况机器人自己企图完成五个连线
    const isMachine = ref(false)//是否是机器人对战
    const score = ref(0)
    const row = ref(20)
    const col = ref(20)
    const visible = ref(false)
    const tip = ref('')
    const boxs = ref([[{ place: 0, x: 0, y: 0 }]])
    const curUser = ref(1)//只可以是1或者2  1表示白 2表示黑
    let airPlace = []//记录机器人下棋子的地方
    let previousBox = { place: 0, x: 0, y: 0 }
    let fourDetial = {}//机器人是否有四个连在一起
    function init() {
      curUser.value = 1
      visible.value = false
      airPlace = []
      boxs.value = []
      previousBox = { place: 0, x: 0, y: 0 }
      fourDetial = {}
      for (let i = 0; i < row.value; i++) {
        boxs.value.push([])
        for (let j = 0; j < col.value; j++) {
          boxs.value[i].push({ place: 0, x: i, y: j })
        }
      }
    }
    function clickBox(box) {
      if (box.place === 0 && ((!isMachine.value) || curUser.value === 1)) {
        boxs.value[box.x][box.y].place = curUser.value
        curUser.value = curUser.value === 1 ? 2 : 1
        previousBox = box
        validateWin()
        if (isMachine.value) {
          ariPoint()
          validateWin()
        }
      }


    }
    //机器人下棋
    function ariPoint() {

      //机器人四个连在了一起，那应该要放四个旁边
      console.log(fourDetial, 'fourDetial')
      if (fourDetial && JSON.stringify(fourDetial) !== '{}') {

        if (fourDetial.type === 1) {
          if (fourDetial.geyi) {
            for (let i = fourDetial.x; i > fourDetial.x - fourDetial.times + 1; i--) {
              if (boxs.value[i][fourDetial.y].place === 0) {
                boxs.value[i][fourDetial.y].place = 2
                fourDetial = determineEquare3(4, 2, { x: i, y: fourDetial.y, place: 2 })
                airPlace.push((i) * row.value + fourDetial.y)
                curUser.value = 1
                return
              }
            }
          }
          else
            if (boxs.value[fourDetial.x + 1]?.[fourDetial.y]?.place === 0) {
              boxs.value[fourDetial.x + 1][fourDetial.y].place = 2
              fourDetial = determineEquare3(4, 2, { x: fourDetial.x + 1, y: fourDetial.y, place: 2 })
              airPlace.push((fourDetial.x + 1) * row.value + fourDetial.y)
              curUser.value = 1
              return
            } else if (boxs.value[fourDetial.x - fourDetial.times]?.[fourDetial.y]?.place === 0) {
              boxs.value[fourDetial.x - fourDetial.times][fourDetial.y].place = 2
              fourDetial = determineEquare3(4, 2, { x: fourDetial.x - fourDetial.times, y: fourDetial.y, place: 2 })
              airPlace.push((fourDetial.x - fourDetial.times) * row.value + fourDetial.y)

              curUser.value = 1
              return
            }
        } else if (fourDetial.type === 2) {
          if (fourDetial.geyi) {
            for (let j = fourDetial.y; j > fourDetial.y - fourDetial.times + 1; j--) {
              if (boxs.value[fourDetial.x][j].place === 0) {
                boxs.value[fourDetial.x][j].place = 2
                fourDetial = determineEquare3(4, 2, { x: fourDetial.x, y: j, place: 2 })
                airPlace.push((fourDetial.x) * row.value + j)
                curUser.value = 1
                return
              }
            }
          }
          else if (boxs.value[fourDetial.x]?.[fourDetial.y + 1]?.place === 0) {
            boxs.value[fourDetial.x][fourDetial.y + 1].place = 2
            fourDetial = determineEquare3(4, 2, { x: fourDetial.x, y: fourDetial.y + 1, place: 2 })
            airPlace.push((fourDetial.x) * row.value + fourDetial.y + 1)

            curUser.value = 1
            return
          } else if (boxs.value[fourDetial.x]?.[fourDetial.y - fourDetial.times]?.place === 0) {
            boxs.value[fourDetial.x][fourDetial.y - fourDetial.times].place = 2
            fourDetial = determineEquare3(4, 2, { x: fourDetial.x, y: fourDetial.y - fourDetial.times, place: 2 })
            airPlace.push((fourDetial.x) * row.value + fourDetial.y - fourDetial.times)

            curUser.value = 1
            return
          }
        } else if (fourDetial.type === 3) {
          if (fourDetial.geyi) {
            let i
            for (let j = fourDetial.y - 1; j > fourDetial.y - fourDetial.times + 1; j--) {
              i = fourDetial.x - (fourDetial.y - j)
              if (boxs.value[i]?.[j]?.place === 0) {
                boxs.value[i][j].place = 2
                fourDetial = determineEquare3(4, 2, { x: i, y: j, place: 2 })
                airPlace.push((i) * row.value + j)
                curUser.value = 1
                return
              }
            }
          }
          else
            if (boxs.value[fourDetial.x + 1]?.[fourDetial.y + 1]?.place === 0) {
              boxs.value[fourDetial.x + 1][fourDetial.y + 1].place = 2
              fourDetial = determineEquare3(4, 2, { x: fourDetial.x + 1, y: fourDetial.y + 1, place: 2 })
              airPlace.push((fourDetial.x + 1) * row.value + fourDetial.y + 1)

              curUser.value = 1
              return
            } else if (boxs.value[fourDetial.x - fourDetial.times]?.[fourDetial.y - fourDetial.times]?.place === 0) {
              boxs.value[fourDetial.x - fourDetial.times][fourDetial.y - fourDetial.times].place = 2
              fourDetial = determineEquare3(4, 2, { x: fourDetial.x - fourDetial.times, y: fourDetial.y - fourDetial.times, place: 2 })
              airPlace.push((fourDetial.x - fourDetial.times) * row.value + fourDetial.y - fourDetial.times)

              curUser.value = 1
              return
            }
        } else if (fourDetial.type === 4) {
          if (fourDetial.geyi) {
            let i
            for (let j = fourDetial.y; j < fourDetial.y + fourDetial.times - 1; j++) {
              i = fourDetial.x - (j - fourDetial.y)
              if (boxs.value[i]?.[j]?.place === 0) {
                boxs.value[i][j].place = 2
                fourDetial = determineEquare3(4, 2, { x: i, y: j, place: 2 })
                airPlace.push((i) * row.value + j)
                curUser.value = 1
                return
              }
            }
          }
          else if (boxs.value[fourDetial.x + 1]?.[fourDetial.y - 1]?.place === 0) {
            boxs.value[fourDetial.x + 1][fourDetial.y - 1].place = 2
            fourDetial = determineEquare3(4, 2, { x: fourDetial.x + 1, y: fourDetial.y - 1, place: 2 })
            airPlace.push((fourDetial.x + 1) * row.value + fourDetial.y - 1)
            curUser.value = 1
            return
          } else if (boxs.value[fourDetial.x - fourDetial.times]?.[fourDetial.y + fourDetial.times]?.place === 0) {
            boxs.value[fourDetial.x - fourDetial.times][fourDetial.y + fourDetial.times].place = 2
            fourDetial = determineEquare3(4, 2, { x: fourDetial.x - fourDetial.times, y: fourDetial.y + fourDetial.times, place: 2 })
            airPlace.push((fourDetial.x - fourDetial.times) * row.value + fourDetial.y + fourDetial.times)

            curUser.value = 1
            return
          }
        }
      }
      const temp = determineEquare3()
      console.log(temp, 'temp')
      if (temp) {
        //阻挡用户

        if (temp.type === 1) {
          if (temp.geyi) {
            for (let i = temp.x; i > temp.x - temp.times + 1; i--) {
              if (boxs.value[i][temp.y].place === 0) {
                boxs.value[i][temp.y].place = 2
                fourDetial = determineEquare3(4, 2, { x: i, y: temp.y, place: 2 })
                airPlace.push((i) * row.value + temp.y)

              }
            }
          }
          else if (boxs.value[temp.x + 1]?.[temp.y]?.place === 0) {
            boxs.value[temp.x + 1][temp.y].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x + 1, y: temp.y, place: 2 })
            airPlace.push((temp.x + 1) * row.value + temp.y)

          } else if (boxs.value[temp.x - temp.times]?.[temp.y]?.place === 0) {
            boxs.value[temp.x - temp.times][temp.y].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x - temp.times, y: temp.y, place: 2 })
            airPlace.push((temp.x - temp.times) * row.value + temp.y)
          }
        } else if (temp.type === 2) {
          if (temp.geyi) {
            for (let j = temp.y; j > temp.y - temp.times + 1; j--) {
              if (boxs.value[temp.x][j].place === 0) {
                boxs.value[temp.x][j].place = 2
                fourDetial = determineEquare3(4, 2, { x: temp.x, y: j, place: 2 })
                airPlace.push((temp.x) * row.value + j)

              }
            }
          }
          else if (boxs.value[temp.x]?.[temp.y + 1]?.place === 0) {
            boxs.value[temp.x][temp.y + 1].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x, y: temp.y + 1, place: 2 })
            airPlace.push((temp.x) * row.value + temp.y + 1)
          } else if (boxs.value[temp.x]?.[temp.y - temp.times]?.place === 0) {
            boxs.value[temp.x][temp.y - temp.times].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x, y: temp.y - temp.times, place: 2 })
            airPlace.push((temp.x) * row.value + temp.y - temp.times)
          }
        } else if (temp.type === 3) {
          if (temp.geyi) {
            let i
            for (let j = temp.y - 1; j > temp.y - temp.times + 1; j--) {
              i = temp.x - (temp.y - j)
              if (boxs.value[i]?.[j]?.place === 0) {
                boxs.value[i][j].place = 2
                fourDetial = determineEquare3(4, 2, { x: i, y: j, place: 2 })
                airPlace.push((i) * row.value + j)

              }
            }
          }
          else if (boxs.value[temp.x + 1]?.[temp.y + 1]?.place === 0) {
            boxs.value[temp.x + 1][temp.y + 1].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x + 1, y: temp.y + 1, place: 2 })
            airPlace.push((temp.x + 1) * row.value + temp.y + 1)
          } else if (boxs.value[temp.x - temp.times]?.[temp.y - temp.times]?.place === 0) {
            boxs.value[temp.x - temp.times][temp.y - temp.times].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x - temp.times, y: temp.y - temp.times, place: 2 })
            airPlace.push((temp.x - temp.times) * row.value + temp.y - temp.times)
          }
        } else if (temp.type === 4) {
          if (temp.geyi) {
            let i
            for (let j = temp.y; j < temp.y + temp.times - 1; j++) {
              i = temp.x - (j - temp.y)
              if (boxs.value[i]?.[j]?.place === 0) {
                boxs.value[i][j].place = 2
                fourDetial = determineEquare3(4, 2, { x: i, y: j, place: 2 })
                airPlace.push((i) * row.value + j)

              }
            }
          }
          else if (boxs.value[temp.x + 1]?.[temp.y - 1]?.place === 0) {
            boxs.value[temp.x + 1][temp.y - 1].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x + 1, y: temp.y - 1, place: 2 })
            airPlace.push((temp.x + 1) * row.value + temp.y - 1)
          } else if (boxs.value[temp.x - temp.times]?.[temp.y + temp.times]?.place === 0) {
            boxs.value[temp.x - temp.times][temp.y + temp.times].place = 2
            fourDetial = determineEquare3(4, 2, { x: temp.x - temp.times, y: temp.y + temp.times, place: 2 })
            airPlace.push((temp.x - temp.times) * row.value + temp.y + temp.times)
          }
        }
      } else {
        //企图完成五个连线
        airFiveLine()

      }

      curUser.value = 1
    }
    //机器人企图连成五个的思路  如果有四个，放在四个旁边连成五个赢得比赛  如果有三个，放在三个旁边 如果有两个，放在两个旁边 如果有1个放在1个旁边  如果都没有，随机放一个地方   旁边是指横竖斜
    function airFiveLine() {
      if (airPlace.length === 0) {
        //机器人从来没有下过棋的时候放中间
        // if (boxs.value[Math.floor(row.value / 2)][Math.floor(col.value / 2)].place === 0) {
        //   boxs.value[Math.floor(row.value / 2)][Math.floor(col.value / 2)].place = 2
        //   airPlace.push(Math.floor(row.value / 2) * row.value + Math.floor(col.value / 2))
        // } else {
        //   boxs.value[Math.floor(row.value / 2)][Math.floor(col.value / 2) - 1].place = 2
        //   airPlace.push(Math.floor(row.value / 2) * row.value + Math.floor(col.value / 2) - 1)
        // }
        //机器人从来没有下过棋的时候放白棋旁边
        if (previousBox.x - 1 > 0) {
          boxs.value[previousBox.x - 1][previousBox.y].place = 2
          airPlace.push((previousBox.x - 1) * row.value + previousBox.y)
        } else {
          boxs.value[previousBox.x + 1][previousBox.y].place = 2
          airPlace.push((previousBox.x + 1) * row.value + previousBox.y)
        }
      } else {
        let time = [{ time: 0, pre: -1, geyi: false }, { time: 0, pre: -1, geyi: false }, { time: 0, pre: -1, geyi: false }, { time: 0, pre: -1, geyi: false }]
        airPlace.some((item, index, arr) => {
          let itemi = Math.floor(item / row.value)
          let itemj = item % row.value
          if (time[0].time < 4) {
            if (time[0].pre === -1 || arr[time[0].pre] === item - 1 || (arr[time[0].pre] === item - 2 && !time[0].geyi)) {
              if (arr[time[0].pre] === item - 2) {
                if (boxs.value[Math.floor((item - 1) / row.value)][(item - 1) % row.value].place === 0) {
                  time[0].geyi = true
                } else {
                  return false
                }

              }
              time[0].time++
              time[0].pre = index
              if (time[0].time >= 4) {
                if ((boxs.value[itemi][itemj + 1]?.place === 0 && boxs.value[itemi][itemj + 1]) || (boxs.value[itemi][itemj - time[0].times]?.place === 0 && boxs.value[itemi][itemj - time[0].time]))
                  return true
                else {
                  //虽然有四个横着，但是这四个横着两边都被挡住了，所以重新再来
                  time[0] = { time: 0, pre: -1, geyi: false }
                }
              }

            }
          }

          if (time[1].pre === -1 || arr[time[1].pre] === item - 1 || (arr[time[1].pre] === item - 2 && !time[1].geyi)) {
            if (arr[time[1].pre] === item - 2) {
              if (boxs.value[Math.floor((item - 1) / row.value)][(item - 1) % row.value].place === 0) {
                time[0].geyi = true
              } else {
                return false
              }
            }
            if ((arr[time[1].pre] === item - 1 || arr[time[1].pre] === item - 2) && time[1].time === 0) {
              time[1].time = 0
              time[1].geyi = false
            } else
              time[1].time++
            if (time[1].time > 3) {
              time[1].time = 0

            }
            time[1].pre = index

          }

          if (time[2].pre === -1 || arr[time[2].pre] === item - 1 || (arr[time[2].pre] === item - 2 && !time[2].geyi)) {
            if (arr[time[2].pre] === item - 2) {
              if (boxs.value[Math.floor((item - 1) / row.value)][(item - 1) % row.value].place === 0) {
                time[0].geyi = true
              } else {
                return false
              }
            }
            if ((arr[time[2].pre] === item - 1 || arr[time[2].pre] === item - 1) && time[2].time === 0) {
              time[2].time = 0
              time[2].geyi = false
            } else
              time[2].time++
            if (time[2].time > 2) {
              time[2].time = 0
            }
            time[2].pre = index
          }
          if (time[3].pre === -1 || arr[time[3].pre] === item - 1 || (arr[time[3].pre] === item - 2 && !time[3].geyi)) {
            if (arr[time[3].pre] === item - 2) {
              if (boxs.value[Math.floor((item - 1) / row.value)][(item - 1) % row.value].place === 0) {
                time[0].geyi = true
              } else {
                return false
              }
            }
            if ((arr[time[3].pre] === item - 1 || arr[time[3].pre] === item - 1) && time[3].time === 0) {
              time[3].time = 0
              time[3].geyi = false
            } else
              time[3].time++
            if (time[3].time > 1) {
              time[3].time = 0

            }
            time[3].pre = index
          }
        })
        time = time.sort((a, b) => b.time - a.time)
        let placeHas = time.some(item => {
          if (item.time > 0 && item.pre > -1) {
            const i = Math.floor(airPlace[item.pre] / row.value)
            const j = Math.floor(airPlace[item.pre] % row.value)

            if (boxs.value[i][j + 1]?.place === 0) {
              boxs.value[i][j + 1].place = 2
              airPlace.push(i * row.value + j + 1)
              fourDetial = determineEquare3(4, 2, { x: i, y: j + 1, place: 2 })
              return true
            }
            if (boxs.value[i][j - item.time]?.place === 0) {
              boxs.value[i][j - item.time].place = 2
              airPlace.push(i * row.value + j - item.time)
              fourDetial = determineEquare3(4, 2, { x: i, y: j - item.time, place: 2 })
              return true
            }
          }
        })
        if (placeHas) {
          airPlace = airPlace.sort((a, b) => a - b)
          return
        }
        time = [{ time: 0, pre: -1, index: -1 }, { time: 0, pre: -1, index: -1 }, { time: 0, pre: -1, index: -1 }, { time: 0, pre: -1, index: -1 }]
        airPlace.some((item, index) => {
          let itemi = Math.floor(item / row.value)
          let itemj = item % row.value
          if (time[0].time < 4) {
            if (time[0].pre === -1 || time[0].pre === item - row.value) {
              time[0].time++
              time[0].pre = item
              time[0].index = index
              if (time[0].time >= 4) {
                if ((boxs.value[itemi + 1][itemj]?.place === 0 && boxs.value[itemi + 1][itemj]) || (boxs.value[itemi - time[0].time][itemj]?.place === 0 && boxs.value[itemi - time[0].time][itemj]))
                  return true
                else {
                  //虽然有四个竖着，但是这四个竖着两边都被挡住了，所以重新再来
                  time[0] = { time: 0, pre: -1 }
                }
              }

            }
          }

          if (time[1].pre === -1 || time[1].pre === item - row.value) {
            if (time[1].pre === item - row.value && time[1].time === 0) {
              time[1].time = 0
            } else
              time[1].time++
            if (time[1].time > 3) {
              time[1].time = 0

            }
            time[1].pre = item
            time[1].index = index

          }

          if (time[2].pre === -1 || time[2].pre === item - row.value) {
            if (time[2].pre === item - row.value && time[2].time === 0) {
              time[2].time = 0

            } else
              time[2].time++
            if (time[2].time > 2) {
              time[2].time = 0
            }
            time[2].pre = item
            time[2].index = index

          }
          if (time[3].pre === -1 || time[3].pre === item - row.value) {
            if (time[3].pre === item - row.value && time[3].time === 0) {
              time[3].time = 0
            } else
              time[3].time++
            if (time[3].time > 1) {
              time[3].time = 0

            }
            time[3].pre = item
            time[3].index = index

          }
        })
        time = time.sort((a, b) => b.time - a.time)
        placeHas = time.some(item => {
          if (item.time > 0 && item.pre > -1) {
            const i = Math.floor(item.pre / row.value)
            const j = Math.floor(item.pre % row.value)

            if (boxs.value[i + 1]?.[j]?.place === 0) {
              boxs.value[i + 1][j].place = 2
              airPlace.push((i + 1) * row.value + j)
              fourDetial = determineEquare3(4, 2, { x: i + 1, y: j, place: 2 })

              return true
            }
            if (boxs.value[i - item.time]?.[j]?.place === 0) {
              boxs.value[i - item.time][j].place = 2
              airPlace.push((i - item.time) * row.value + j)
              fourDetial = determineEquare3(4, 2, { x: i - item.time, y: j, place: 2 })

              return true
            }
          }
        })

        if (placeHas) {
          airPlace = airPlace.sort((a, b) => a - b)
          return
        }

      }



    }
    //判断用户是否有横竖斜大于等于3个棋子的情况，只需要查看用户上一个棋子落下后是否造成这样的情况就行
    function determineEquare3(maxTime = 3, userPlace = 1, box = previousBox) {
      let times = 0
      let preP = -1
      let geyi = false
      let tempArr = []
      //竖
      for (let i = (box.x - 5 >= 0 ? box.x - 5 : 0); i < (box.x + 6 < col.value ? box.x + 6 : col.value); i++) {
        console.log(times, preP, geyi, tempArr[0], i, box, 'times,preP,geyi,tempArr[0],i,box,竖')
        if (boxs.value[i][box.y].place === userPlace) {
          if (preP === -1 || preP === i - 1 || (preP === i - 2 && !geyi)) {

            if (preP === i - 2) {
              if (boxs.value[i - 1][box.y].place === 0) {
                geyi = true
                times++
              } else {
                continue
              }

            }
            times++

          } else {
            times = 1
            geyi = false
          }
          preP = i
          if (times >= maxTime) {
            if (times === 3 && geyi) {
              continue
            }
            if (boxs.value[i + 1]?.[box.y].place !== 0 && boxs.value[i + 1]?.[box.y].place !== userPlace && boxs.value[i - times]?.[box.y].place !== 0) {
              break
            } else {
              tempArr[0] = tempArr[0]?.times > times ? tempArr[0] : { x: i, y: box.y, type: 1, times, geyi }
              if (boxs.value[i + 1]?.[box.y].place !== 0 || boxs.value[i - times]?.[box.y].place !== 0) {
                tempArr[0].priority = 2
              } else {
                tempArr[0].priority = 1
              }
            }

          }
        }
      }
      times = 0
      preP = -1
      geyi = false
      //横
      for (let j = (box.y - 5 >= 0 ? box.y - 5 : 0); j < (box.y + 6 < col.value ? box.y + 6 : col.value); j++) {
        console.log(times, preP, geyi, tempArr[0], j, box, 'times,preP,geyi,tempArr[0],j,box,横')

        if (boxs.value[box.x][j].place === userPlace) {
          if (preP === -1 || preP === j - 1 || (preP === j - 2 && !geyi)) {
            if (preP === j - 2) {
              if (boxs.value[box.x][j - 1]?.place === 0) {
                geyi = true
                times++
              } else {
                continue
              }
            }
            times++

          } else {
            times = 1
            geyi = false
          }
          preP = j
          if (times >= maxTime) {
            if (times === 3 && geyi) {
              continue
            }
            if (boxs.value[box.x]?.[j + 1]?.place !== 0 && boxs.value[box.x]?.[j + 1].place !== userPlace && boxs.value[box.x]?.[j - times]?.place !== 0) {
              break
            } else {
              tempArr[1] = tempArr[1]?.times > times ? tempArr[1] : { x: box.x, y: j, type: 2, times, geyi }
              if (boxs.value[box.x]?.[j + 1]?.place !== 0 || boxs.value[box.x]?.[j - times]?.place !== 0) {
                tempArr[1].priority = 2
              } else {
                tempArr[1].priority = 1
              }
            }
          }
        }
      }
      times = 0
      preP = -1
      geyi = false
      //左斜
      let i
      let j
      if (box.x - 5 >= 0 && box.y - 5 >= 0) {
        i = box.x - 5
        j = box.y - 5
      } else if (box.x - 5 >= 0 && box.y - 5 < 0) {
        j = 0
        i = box.x - (box.y - j)
      } else if (box.x - 5 < 0 && box.y - 5 >= 0) {
        i = 0
        j = box.y - (box.x - i)
      } else {
        if (box.x > box.y) {
          j = 0
          i = box.x - (box.y - j)
        } else {
          i = 0
          j = box.y - (box.x - i)
        }
      }
      for (j; j < (box.y + 6 < col.value ? box.y + 6 : col.value); j++) {
        console.log(times, preP, geyi, tempArr[0], i, j, box, 'times,preP,geyi,tempArr[0],i,j,box,左斜')

        if (boxs.value[i]?.[j]?.place === userPlace) {
          if (preP === -1 || preP === j - 1 || (preP === j - 2 && !geyi)) {

            if (preP === j - 2) {
              if (boxs.value[i - 1][j - 1]?.place === 0) {
                geyi = true
                times++
              } else {
                continue
              }
            }
            times++

          } else {
            times = 1
            geyi = false
          }
          preP = j
          if (times >= maxTime) {
            if (times === 3 && geyi) {
              i++
              continue
            }
            if (boxs.value[i + 1]?.[j + 1]?.place !== 0 && boxs.value[i + 1]?.[j + 1].place !== userPlace && boxs.value[i - times]?.[j - times]?.place !== 0) {
              break
            } else {
              tempArr[2] = tempArr[2]?.times > times ? tempArr[2] : { x: i, y: j, type: 3, times, geyi }
              if (boxs.value[i + 1]?.[j + 1]?.place !== 0 || boxs.value[i - times]?.[j - times]?.place !== 0) {
                tempArr[2].priority = 2
              } else {
                tempArr[2].priority = 1
              }
            }
          }
        }
        i++
      }
      //右斜

      if (box.x - 5 >= 0 && box.y + 5 < row.value) {
        i = box.x - 5
        j = box.y + 5
      } else if (box.x - 5 >= 0 && box.y + 5 >= row.value) {
        j = row.value - 1
        i = box.x - (row.value - 1 - box.y)
      } else if (box.x - 5 < 0 && box.y + 5 < row.value) {
        i = 0
        j = box.y + (box.x - i)
      } else {
        if (box.x > row.value - 1 - box.y) {
          j = row.value - 1
          i = box.x - (row.value - 1 - box.y)
        } else {
          i = 0
          j = box.y + (box.x - i)
        }
      }
      preP = -1
      times = 0
      geyi = false

      for (j; j > (box.y - 5 >= 0 ? box.y - 5 : 0); j--) {
        console.log(times, preP, geyi, tempArr[0], i, j, box, 'times,preP,geyi,tempArr[0],i,j,box,右斜')

        if (boxs.value[i]?.[j]?.place === userPlace) {
          if (preP === -1 || preP === j + 1 || (preP === j + 2 && !geyi)) {
            if (preP === j + 2) {
              if (boxs.value[i - 1][j + 1]?.place === 0) {
                geyi = true
                times++
              } else {
                continue
              }
            }
            times++

          } else {
            times = 1
            geyi = false
          }
          preP = j
          if (times >= maxTime) {
            if (times === 3 && geyi) {
              i++
              continue
            }
            if (boxs.value[i + 1]?.[j - 1]?.place !== 0 && boxs.value[box.x]?.[j - 1].place !== userPlace && boxs.value[i - times]?.[j + times]?.place !== 0) {
              break
            } else {
              tempArr[3] = tempArr[3]?.times > times ? tempArr[3] : { x: i, y: j, type: 4, times, geyi }
              if (boxs.value[i + 1]?.[j - 1]?.place !== 0 || boxs.value[i - times]?.[j + times]?.place !== 0) {
                tempArr[3].priority = 2
              } else {
                tempArr[3].priority = 1
              }
            }
          }

        }
        i++
      }
      console.log(tempArr, 'temp')
      tempArr = tempArr.sort((a, b) => b.times - a.times)
      if (tempArr[0]?.times >= 3) {
        if (tempArr[0].priority === 2) {
          let temp = null
          tempArr.map((item, index, arr) => {
            if (item?.times >= arr[0].times) {
              if (item.priority === 1) {
                temp = item
              }
            }
          })
          if (temp) {
            return temp
          }
          //挡住一边的三个没有必要去阻挡
          if (tempArr[0]?.times === 3) {
            return false
          }
        }

        return tempArr[0]
      }
      return false
    }

    //验证是否赢了
    function validateWin() {
      if(visible.value) return
      for (let i = 0; i < row.value; i++) {

        for (let j = 0; j < col.value; j++) {
          const place = boxs.value[i][j].place
          if (place) {
            if (boxs.value[i][j + 1]?.place === place) {
              if (boxs.value[i][j + 2]?.place === place) {
                if (boxs.value[i][j + 3]?.place === place) {
                  if (boxs.value[i][j + 4]?.place === place) {
                    // 横着五个，赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
            if (boxs.value[i + 1]?.[j].place === place) {
              if (boxs.value[i + 2]?.[j].place === place) {
                if (boxs.value[i + 3]?.[j].place === place) {
                  if (boxs.value[i + 4]?.[j].place === place) {
                    // 竖着五个赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
            if (boxs.value[i + 1]?.[j - 1]?.place === place) {
              if (boxs.value[i + 2]?.[j - 2]?.place === place) {
                if (boxs.value[i + 3]?.[j - 3]?.place === place) {
                  if (boxs.value[i + 4]?.[j - 4]?.place === place) {
                    // 左斜着的五个赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
            if (boxs.value[i + 1]?.[j + 1]?.place === place) {
              if (boxs.value[i + 2]?.[j + 2]?.place === place) {
                if (boxs.value[i + 3]?.[j + 3]?.place === place) {
                  if (boxs.value[i + 4]?.[j + 4]?.place === place) {
                    // 右斜着的五个赢了
                    tip.value = (place === 1 ? '白' : '黑') + '棋子赢了'
                    visible.value = true
                    i = row.value
                    j = col.value
                    break
                  }
                }
              }
            }
          }
        }
      }
    }
    init()
    return {
      score,
      boxs,
      init,
      clickBox,
      visible,
      tip,
      isMachine
    }
  }
}
</script>
<style lang="scss" scoped>
.mineDlearance {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  // align-items: center;

  .game {
    // background: #ccc;
    padding: 10px;
    height: 850px;
    .top {
      display: flex;
      justify-content: space-between;
    }
    .game-main {
      margin-top: 10px;
      .item-one {
        width: 40px;
        height: 40px;
        border: 1px solid #000;
        box-sizing: border-box;
        background: goldenrod;
        cursor: pointer;
        .circle {
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
    }
  }
}
</style>