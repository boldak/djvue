<template>
  <div>
    <div v-if="!options || !answer" class="text-xs-center">
    </div>
    <v-card flat color="transparent" v-else>
      <v-container>
        <v-layout row class="caption" color="warning" v-if="isValid != true">
          <v-spacer></v-spacer>
          <v-icon small color="warning">mdi-asterisk</v-icon>
          <span class="warning--text caption pa-2">{{isValid}}</span>
        </v-layout>
        <v-layout column pl-2>
          <h3 :class="`headline ${(isValid != true)?'warning--text':'primary--text'}`">{{options.title}}</h3>
          <p class="body-1">{{options.note}}</p>
        </v-layout>
        <v-divider></v-divider>
        <v-tabs v-model="active" color="transparent">
          <v-tab key="response" ripple>Your Response</v-tab>
          <v-tab key="statistic" ripple v-if="options.showResponsesStat">Statistic</v-tab>
          <v-tab-item key="response" ripple>
            <v-container>
              <v-layout row align-end>
                <v-rating v-model="answer.data[0]" :length="options.scale.length" :empty-icon="`mdi-${options.icon}-outline`" :full-icon="`mdi-${options.icon}`" color="primary" background-color="secondary lighten-2"></v-rating>
                <span v-if="answer.data[0] && (options.showValue || (options.showTitle && !options.scale[answer.data[0]-1].title))"
									    		class=" primary--text caption"
									    >
									    	{{answer.data[0]}}
									    </span>
                <span v-if="answer.data[0] && options.showTitle && options.scale[answer.data[0]-1].title"
									    	class="primary--text caption"
									    >
									    	( {{options.scale[answer.data[0]-1].title}} )
									    </span>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item key="statistic" ripple v-if="options.showResponsesStat">
            <echart :options="statOptions" :height="height"></echart>
          </v-tab-item>
      </v-container>
    </v-card>
    </v-tabs>
    <!-- <pre>
	    	{{JSON.stringify(stat,null,"\t")}}
	    </pre>	 -->
  </div>
</template>
<script>
import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"



export default {

  mixins: [djvueMixin, listenerMixin, statMixin],

  props: ["config", "options", "answer", "stat"],

  computed: {

    isValid() {
      if (!this.options) return "Not configured"
      if (!this.answer) return "No response data"
      if (this.options.required && this.answer.data.length == 0) return `No response for this question but it is required.`
      return true
    }
  },



  methods: {

    calculateStat() {
      let s = this.stat.responses.filter(a => a) // &&  _.find(this.options.nominals, n => n.id == a[0]))
      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let result = this.options.scale.map((n, index) => {
        let c = _.countBy(stats)[n.value]
        return {
          title: `${n.value} ${(n.title) ? ' ('+n.title+')': ''}`,
          value: ((c) ? c : 0) / ((stats.length == 0) ? 1 : stats.length)
        }
      })
      let statOptions = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 1.0
        },
        yAxis: {
          type: 'category',
          data: []
        },
        series: [{
          name: '',
          type: 'bar',
          data: []
        }]
      }

      statOptions.yAxis.data = result.map(r => this.truncate(r.title)).reverse()
      statOptions.series[0].data = result.map(r => r.value).reverse()
      // statOptions.color = [this.$vuetify.theme.primary]

      // this.statOptions = statOptions
      this.height = (this.options.nominals) ? this.options.nominals.length * 36 + 50 : null
      return statOptions
    }

  },

  watch: {

    'answer.data': {
      handler(value, oldValue) {
        if (!oldValue) return
        if (this.answer && this.answer.valid != this.isValid) this.answer.valid = this.isValid;
        this.$emit("update:answer")
      },
      deep: true
    }

  },


  data: () => ({
    active: null,
    newAltTitle: null,
    selection: [],
    height: null
  }),

  mounted() { this.$emit("init") }
}

</script>
</style>
