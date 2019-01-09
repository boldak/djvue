<template>
  <div>
    <div v-if="!options" class="text-xs-center">
      <v-progress-circular indeterminate color="secondary ligten-2"></v-progress-circular>
    </div>
    <v-tabs v-else v-model="active" color="transparent">
      <v-tab key="general" ripple>General</v-tab>
      <v-tab key="fe" ripple>Factors & Effects</v-tab>
      <v-tab key="scale" ripple>Scale</v-tab>
      <v-tab key="statistic" ripple>Statistic</v-tab>
      <v-tab-item key="general" ripple>
        <v-card flat>
          <v-container>
            <h3 class="headline">Association</h3>
            <v-switch :hint="(options.required) ? 'All constraints will be checked' : 'Response validation will be disabled'" persistent-hint label="Required" v-model="options.required" @change="$emit('update:options',options)"></v-switch>
            <v-divider></v-divider>
            <v-textarea v-model="options.title" label="Question"></v-textarea>
            <v-textarea v-model="options.note" label="Note"></v-textarea>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="fe" ripple>
        <v-card flat>
          <v-container fluid grid-list-md pa-0>
            <v-layout row wrap>
              <v-flex xs12>
                <v-container pa-3 ma-0>
                  <v-layout column>
                    <h4 class="subheading">Entities</h4>
                    <dj-list :list="options.entities" title="entity" @update="onChangeEntities"></dj-list>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="scale" ripple>
        <v-card flat>
          <v-container>
            <v-select :items="[3,5,7,9]" label="Maximum rate value" v-model="max" @change="generateScale">
            </v-select>
            <v-layout row v-for="s in options.scale" :style="(s.style)?s.style:''">
              <v-text-field :label="`${s.value} title`" v-model="s.title" @input="$emit('update:options',options)"></v-text-field>
            </v-layout>
            <v-divider></v-divider>
            <v-switch label="Show value" v-model="options.showValue" @change="$emit('update:options',options)"></v-switch>
            <v-divider></v-divider>
            <v-switch label="Show title" v-model="options.showTitle" @change="$emit('update:options',options)"></v-switch>
            <v-divider></v-divider>
            <palette-picker :value = "options.palette" @change="onChangePalette"></palette-picker>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item key="statistic" ripple>
        <v-card flat>
          <v-container>
            <v-switch
    		  :hint="(options.showResponsesStat) ? 'Show statistical distribution in production mode' : ''"
    		  persistent-hint
		      label="Statistical hints"
		      v-model="options.showResponsesStat"
		      @change="$emit('update:options',options)"
		    ></v-switch>
		    <v-divider></v-divider>
		    <v-card  flat color="transparent" class="mt-3" style="
              border-top: 1px solid #dcdcdc !important; 
              border-left: 1px solid #dcdcdc !important;
              border-right: 1px solid #dcdcdc !important;">
              
              <v-layout align-center row>
                <v-flex xs2 pa-2 class="text-xs-center headline">
                </v-flex>
                <v-flex 
                    v-for="e in options.entities" 
                    :class="`xs${Math.trunc(10/options.entities.length)} text-xs-center`" 
                    style="min-height:3em; border-left:1px solid #dedede;"
                >
                  <span class="caption">{{e.title}}</span>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout align-center row v-for="f in options.entities" style="border-bottom:1px solid #dcdcdc;">
                <v-flex xs2 pa-2 class="caption">
                  {{f.title}}
                </v-flex>
                <v-flex 
                    xs1 
                    v-for="e in options.effects" 
                    :class="`xs${Math.trunc(10/options.entities.length)} text-xs-center`"
                    style="min-height:150px; border-left: 1px solid #dcdcdc;"
                >
                  <echart v-if="getChartOptions(f,e)" :options="getChartOptions(f,e)" :height="height"></echart>
                </v-flex>
              </v-layout>
            </v-card>
        </v-card>
      </v-tab-item>
    </v-tabs>
   <!--  <pre>
	    	{{JSON.stringify(options,null,"\t")}}
	    </pre>	 -->
  </div>
</template>
<script>

import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";
import djList from "djvue/components/core/ext/dj-list.vue"
import palettePicker from "djvue/components/core/ext/palette-picker.vue"
import statMixin from "../mixins/statistic.mixin.js"
import colorUtility from "../../color-utility.js"

export default {

  mixins: [djvueMixin, listenerMixin, statMixin],

  props: ["config", "options", "stat"],

  components: {
    "dj-list": djList,
    "palette-picker": palettePicker
  },

  methods: {

  	generateScaleStyle(){
      if(!this.options.scale || !this.options.palette.color) return
  		if(this.options.scale.length>0 && this.options.palette.color.length>0){
  			this.options.scale.forEach( v => {
  				v.color = colorUtility.color(this.options.scale, v.value, this.options.palette, this.$vuetify.theme)
  				v.background = colorUtility.background(this.options.scale, v.value, this.options.palette, this.$vuetify.theme)
  				v.style = `color: ${colorUtility.color(this.options.scale, v.value, this.options.palette, this.$vuetify.theme)};`
  					+ `background: ${colorUtility.background(this.options.scale, v.value, this.options.palette, this.$vuetify.theme)};`
  					// + `border: 2px solid ${colorUtility.border(this.options.scale, v.value, this.options.palette, this.$vuetify.theme)};`
  			})
  		}

  		this.options.undefinedValue = {
  			style: `color: ${colorUtility.color(this.options.scale, null, this.options.palette, this.$vuetify.theme)};`
  					+ `background: ${colorUtility.background(this.options.scale, null, this.options.palette, this.$vuetify.theme)};`
  					// + `border: 2px solid ${colorUtility.border(this.options.scale, null, this.options.palette, this.$vuetify.theme)};`
  		}
  	},


    onChangeEntities(items) {
      this.options.entities = items
      this.$emit("update:options", this.options)
    },

    onChangePalette(palette) {
      this.options.palette = palette
      this.$nextTick(() => {
      	this.generateScaleStyle()
      	this.$emit("update:options", this.options)	
      })
    },

    onChange() {
      this.$emit("update:options", this.options)
    },


    generateScale() {
      if (this.max != this.options.scale.length) {
        let newScale = [];
        for (let i = 0; i < this.max; i++) {
          newScale.push({ value: i + 1 })
        }
        // newScale.push({value:null})
        // newScale.push({})
        
        this.options.scale = newScale
        this.generateScaleStyle()
        this.onChange()
      }
    },

    getChartOptions(e1,e2){
      let f = _.find(this.statOptions, s => s.e1.id == e1.id && s.e2.id == e2.id)
      if(f) return f.chartOptions
      return null  
    },

     calculateStat() {
      if (!this.options.entities) return {}

      let s = this.stat.responses.filter(a => a)

      let stats = []
      s.forEach(item => {
        stats = stats.concat(item)
      })

      let r = []

      this.options.entities.forEach(f => {
        this.options.entities.forEach(e => {
          r.push({
            e1: f,
            e2: e,
            values: stats
                      .filter(s => s.e1 == f.id && s.e2 == e.id && s.value && _.find(this.options.scale, v => v.value == s.value))
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

  watch:{
    options:{
      deep:true,
      handler(value){
        if(!value) return
        if(this.max != value.scale.length) this.max = value.scale.length 
        this.generateScaleStyle();
        this.onChange()
      }
    }
  },




  data: () => ({
    active: null,
    height: null,
    max: null
  }),

  created(){
  	// this.max = this.options.scale.length;
  	// this.generateScaleStyle();
  },

  mounted() { this.$emit("init") }
}

</script>
