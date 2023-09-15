src/components/BarGraph.vue：

<template>
  <div class="echarts-box">
    <div id="myEcharts" :style="{ width, height }"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {onMounted, onUnmounted} from "vue";

export default {
  name: "App",
  props: ["width", "height",'options'],
  setup(props) {
    let myEcharts = echarts;
    onMounted(() => {
      initChart();
    });

    onUnmounted(() => {
      myEcharts.dispose;
    });

    function initChart() {
      let chart = myEcharts.init(document.getElementById("myEcharts"), "purple-passion");
      chart.setOption(props.options);
      window.onresize = function () {
        chart.resize();
      };
    }

    return {
      initChart
    };
  }
};
</script>

