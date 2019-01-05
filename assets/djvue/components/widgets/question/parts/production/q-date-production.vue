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
            <v-container fluid grid-list-md pa-0>
              <v-layout row wrap v-if="options">
                <v-flex d-flex xs12 sm12 md8 lg5>
                  <v-date-picker
                        v-model="answer.data[0]"
                        full-width
                        landscape
                        class="mt-3"
                        :locale="l"
                  ></v-date-picker>
                </v-flex>
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
        {{JSON.stringify(statOptions,null,"\t")}}
      </pre>
 -->
  </div>
</template>

<script>
import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";
import statMixin from "../mixins/statistic.mixin.js"
import eventDynamic from "../../event-dynamic.js"



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
      let s = this.stat.responses.filter(a => a)
      let stats = [];

      s.forEach(v => {
        stats = stats.concat(v)
      })

      let result = eventDynamic(stats); 

      let statOptions = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          type: 'category'
        },

        yAxis: {
          type: 'value'
        },

        series: [{
          name: '',
          type: 'bar',
          itemStyle:{
            opacity:0.5
          },
          data: []
        }]
      }

      statOptions.xAxis.data = result.map(r => r.title)
      statOptions.series[0].data = result.map(r => r.value)
      
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
    newAltTitle: null,
    selection: [],
    height: null,
    l: null
  }),

  mounted() { 
    // this.l = (this.$i18n.locale == "uk") ? "ua-uk" : null  
    this.$emit("init") 
  }
}

</script>
</style>
