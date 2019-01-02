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
      this.statOptions = {};
      this.$nextTick(() => {
        this.statOptions = stats
      })
    }
    
  },

  watch: {
    active(value) { this.redrawStat() }
  },

  data: () => ({
    statOptions: null
  })

}