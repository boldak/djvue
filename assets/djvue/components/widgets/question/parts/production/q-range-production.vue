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
              <v-layout column v-if="options" class="mt-4">
                <v-range-slider
                  v-model="answer.data[0]"
                  :max="options.range[1]"
                  :min="options.range[0]"
                  :step="options.step"
                  thumb-size="36"
                  thumb-label="always"
                  thumb-color="accent"
                  ticks="always"
                  tick-size="2"
                ></v-range-slider>
                </v-layout>  
              </v-container>
          </v-tab-item>
          <v-tab-item key="statistic" ripple v-if="options.showResponsesStat">
            <echart :options="statOptions" :height="height"></echart>
          </v-tab-item>
      </v-container>
    </v-card>
    </v-tabs>
   <!--  <pre>
	    	{{JSON.stringify(statOptions,null,"\t")}}
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
      if (this.options.required && (this.answer.data.length == 0)) return `No response for this question but it is required.`
      return true
    }
  },



  methods: {

     calculateStat() {
      let s = this.stat.responses.filter(a => a)


      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let left = stats.map(item => item[0])
      let right = stats.map(item => item[1])

      let r = _.union(_.uniq(left),_.uniq(right)).sort((a,b) => a-b).map(item=>({title:item}))

      let result = r.map((n, index) => {
        let l = _.countBy(left)[n.title]
        let r = _.countBy(right)[n.title]

        return {
          title: n.title,
          left: ((l) ? l : 0),
          right: ((r) ? r : 0)
        }
      })
      let statOptions = {
        legend: {
          data:['Left boundary', 'Right boundary']
        },
        
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        
        xAxis: {
          type: 'value',
        },
        
        yAxis: {
          type: 'value'
        },
        
        series: []
      }

      statOptions.series.push({
        name: 'Left boundary',
        type: 'line',
        step: 'middle',
        areaStyle:{
          opacity:0.25
        },
        data: result.map(item => [item.title, item.left]),
        markLine: {
          data: [{
            xAxis: (_.sum(left) / left.length)
          }]
        }
      })
      statOptions.series.push({
        name: 'Right boundary',
        type: 'line',
        step: 'middle',
        areaStyle:{
          opacity:0.25
        },
        data: result.map(item => [item.title, item.right]),
        markLine: {
          data: [{
            xAxis: (_.sum(right) / right.length)
          }]
        }
      })

      this.height = 250;
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
    selection: [],
    height: null
  }),

  mounted() { this.$emit("init") }
}

</script>
</style>
