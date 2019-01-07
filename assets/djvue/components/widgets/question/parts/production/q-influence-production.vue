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
            <!--  <v-layout>
              <v-flex :class="`xs${options.effects.length+3}`"> -->
            <v-card class="mt-3">
              <v-layout align-center row>
                <v-flex xs2 class="primary lighten-1">
                </v-flex>
                <v-flex pa-2 class="text-xs-center subheading primary white--text">
                  Effect
                </v-flex>
              </v-layout>
              <v-layout align-center row class="primary white--text">
                <v-flex xs2 pa-2 class="text-xs-center subheading primary">
                  Factor
                </v-flex>
                <v-flex v-for="e in options.effects" :class="`xs${Math.trunc(10/options.effects.length)} text-xs-center`">
                  <span class="caption">{{e.title}}</span>
                </v-flex>
              </v-layout>
              <v-layout align-center row v-for="f in options.factors">
                <v-flex xs2 pa-2 class="primary white--text caption" style="min-height: 5em;">
                  {{f.title}}
                </v-flex>
                <v-flex xs1 v-for="e in options.effects" :class="`xs${Math.trunc(10/options.effects.length)} text-xs-center`">
                  <v-menu>
                    <span :style="getStyle(f,e)" slot="activator" class="elevation-2">{{ getValue(f,e) }}</span>
                    <v-layout column>
                      <div v-for="v in scale" :style="`${v.style} padding:0.25em 1em;cursor:pointer;`" @click="setValue(f,e,v.value)">{{ v.value }}</div>
                    </v-layout>
                  </v-menu>
                </v-flex>
              </v-layout>
            </v-card>
            <!--     </v-flex>
            </v-layout> -->
          </v-tab-item>
          <v-tab-item key="statistic" ripple v-if="options.showResponsesStat">
            <v-card  flat color="transparent" class="mt-3" style="border: 1px solid #dcdcdc !important;">
              
              <v-layout align-center row>
                <v-flex xs2 pa-2 class="text-xs-center headline">
                </v-flex>
                <v-flex 
                    v-for="e in options.effects" 
                    :class="`xs${Math.trunc(10/options.effects.length)} text-xs-center`" 
                    style="min-height:3em; border-left:1px solid #dedede;"
                >
                  <span class="caption">{{e.title}}</span>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout align-center row v-for="f in options.factors" style="border-bottom:1px solid #dcdcdc;">
                <v-flex xs2 pa-2 class="caption">
                  {{f.title}}
                </v-flex>
                <v-flex 
                    xs1 
                    v-for="e in options.effects" 
                    :class="`xs${Math.trunc(10/options.effects.length)} text-xs-center`"
                    style="min-height:150px; border-left: 1px solid #dcdcdc;"
                >
                  <echart v-if="getChartOptions(f,e)" :options="getChartOptions(f,e)" :height="height"></echart>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
      </v-container>
    </v-card>
    </v-tabs>
    <!-- <pre> -->
    <!-- {{JSON.stringify(statOptions,null,"\t")}} -->
    <!-- {{JSON.stringify(options,null,"\t")}} -->
    <!-- </pre> -->
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

      if (this.options.required) {
        if (this.answer.data.length > 0) {
          return true
        } else {
          return `No response for this question but it is required.`
        }
      } else {
        return true
      }

    },

    scale() {

      let s = JSON.parse(JSON.stringify(this.options.scale))
      s.push({
        value: null,
        style: this.options.undefinedValue.style + "padding:0.25em 1em;height:2em;",
        title: ""
      })
      return s

    }
  },

  methods: {


    getValue(factor, effect) {

      let f = _.find(this.answer.data, a => a.factor == factor.id && a.effect == effect.id)

      let value = (!_.isUndefined(f)) ? f.value : null;

      let s = _.find(this.scale, s => s.value == value)

      s = (s) ? s : { value: null, title: ""}

      let res = (this.options.showValue) ?
        (_.isNumber(s.value)) ?
        s.value.toFixed(0) :
        "" :
        ""

      res += (this.options.showTitle) 
                ? (s.title) 
                    ? (this.options.showValue) 
                        ? (s.title == "") 
                            ? "" 
                            : `(${s.title})` 
                        : s.title 
                    : (this.options.showValue) 
                        ? "" 
                        : s.value 
                : ""

      return res

    },

    getStyle(factor, effect) {
      let f = _.find(this.answer.data, a => a.factor == factor.id && a.effect == effect.id)
      let value = (!_.isUndefined(f)) ? f.value : null;
      let s = _.find(this.options.scale, s => s.value == value)
      return (s) ? s.style + "padding:0.25em 1em;" : this.options.undefinedValue.style + "padding:0.25em 1em;height:2em;"
    },

    setValue(factor, effect, value) {
      let index = _.findIndex(this.answer.data, a => a.factor == factor.id && a.effect == effect.id)
      if (index >= 0) {
        this.answer.data.splice(index, 1, { factor: factor.id, effect: effect.id, value: value })
      } else {
        this.answer.data.push({ factor: factor.id, effect: effect.id, value: value })
      }
      if (this.answer && this.answer.valid != this.isValid) this.answer.valid = this.isValid;
      this.$emit("update:answer", this.answer)
    },

    getChartOptions(factor, effect) {
      let f = _.find(this.statOptions, s => s.factor.id == factor.id && s.effect.id == effect.id)
      if (f) return f.chartOptions
      return null
    },

    calculateStat() {
      if (!this.options.factors || !this.options.effects) return {}

      let s = this.stat.responses.filter(a => a)

      let stats = []
      s.forEach(item => {
        stats = stats.concat(item)
      })

      let r = []

      this.options.factors.forEach(f => {
        this.options.effects.forEach(e => {
          r.push({
            factor: f,
            effect: e,
            values: stats
                      .filter(s => s.factor == f.id && s.effect == e.id && s.value && _.find(this.options.scale, v => v.value == s.value))
                      .map(s => s.value)
          })
        })
      })

      r = r.filter(s => s.values.length > 0)

      r.forEach(s => {
        let c = _.countBy(s.values);
        s.data = this.options.scale.map(v => ({
          title: v.value,
          value: (c[v.value]) ? c[v.value] : 0
        }))
      })

      // r.forEach(s => {
      //   s.chartOptions = {

      //     tooltip: {
      //       trigger: 'item',
      //       formatter: "{a} <br/>{b}: {c} ({d}%)"
      //     },

      //     color: this.options.scale.map(v => v.background),
      //     series: [{
      //       type: 'pie',

      //       name: `${s.factor.title} => ${s.effect.title}`,
      //       radius: ['5%', '25%'],
      //       data: s.data.map(d => ({ name: d.title, value: d.value }))
      //     }]
      //   }
      // })



      r.forEach(s => {
        s.chartOptions = {
          color:[this.$vuetify.theme.primary],
          angleAxis: {
              type: 'category',
              data: this.options.scale.map( d => d.value ),
                axisLabel:{
                  margin: 2,
                  fontSize: 8,
                  fontWeight: "bold",
                  color:this.$vuetify.theme.secondary
                }
          },
          radiusAxis: {
            splitNumber:1,
            axisLine:{
                show:false
            },
            axisLabel:{
              show:false
            }
          },
          polar: {
          },
          series: [{
              type: 'bar',
              itemStyle: {
                opacity: 0.5
              },
              data: s.data.map(d => d.value ),
              coordinateSystem: 'polar'
          }]
        }
      })    


      this.height = 150;

      return r

    }

  },

  data: () => ({
    active: null,
    height: null
  }),

  mounted() { this.$emit("init") }
}

</script>
