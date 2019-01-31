<template>
  <div v-else class="echart" :style="style"></div>
</template>
<script>
export default {

  name: "echart",

  computed: {
    style() {
      return {
        height: (this.height || 250) + "px"
      }
    }
  },


  props: ["options", "height"],

  watch: {
    options: {
      handler: function(value) {
        // console.log("WATCH",value)
        if (value)
          this.$nextTick(() => {
            this.chart.setOption(value)
          })
        this.chart.resize()
      },
      deep: true
    },

    height(value) {
      this.$nextTick(() => {
        this.chart.resize({
          height: value
        })
      })
    }
  },

  mounted() {

    // console.log("MOUNTED", this.options)

    this.chart = echarts.init(this.$el)
    this.resizeHandler = () => this.chart.resize();

    if (window.attachEvent) {
      window.attachEvent('onresize', this.resizeHandler);
    } else {
      window.addEventListener('resize', this.resizeHandler);
    }

    if (this.options) {
      this.chart.setOption(this.options)
    }

  },

  beforeDestroy() {
    if (window.attachEvent) {
      window.detachEvent('onresize', this.resizeHandler);
    } else {
      window.removeEventListener('resize', this.resizeHandler, false);
    }
  },


  data: () => ({
    chart: null,
    resizeHandler: null
  })
}

</script>
<style scoped>
.echart {
  width: 100% !important;
}

</style>
