import echart from "djvue/components/core/ext/echart.vue";

export default {

  components: { echart },

  computed: {

    stats() {

      if (this.calculateStat && this.stat && this.stat.responses && this.options) {
        return this.calculateStat()
      } else {
        return {}
      }
    }

  },

  methods: {

    truncate(value, length) {
      length = length || 50;
      return (value.toString().length <= length) ?
        value.toString() :
        ((value.toString().length - length) > 10) ?
        value.toString().substring(0, length) + '...' :
        value.toString()
    },

    redrawStat() {
      let stats = (this.stats) ? JSON.parse(JSON.stringify(this.stats)) : {}
      this.statOptions = null;
      this.$nextTick(() => {
        this.statOptions = stats
        // console.log("REDRAW",JSON.stringify(stats))
      })
    }

  },

  watch: {
    active(value) { this.redrawStat() },

    statOptions(value) {
      // console.log("WATCH statOptions", JSON.stringify(value))
    }
  },

  data: () => ({
    statOptions: null
  })

}
