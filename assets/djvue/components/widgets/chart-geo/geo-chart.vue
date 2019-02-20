<template>
   
      <v-layout column justify-center pb-2>
        <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;"> 
          {{config.title}}
        </h3>
        <p v-if="options" class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
          {{config.note}}
        </p>
        <div v-if="options" style="border:1px solid #dedede;">
          <echart  :options="chartOptions" :height="options.widget.height"></echart>
        </div>
      </v-layout>  
     
   
</template>



<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import GeoChartConfigDialog from "./geo-chart-config.vue";
  import echart from "djvue/components/core/ext/echart.vue"
  import getGeoJson from "./maps.js"
  import geo_util from "./utils.js"

  Vue.prototype.$dialog.component('GeoChartConfigDialog', GeoChartConfigDialog)
   
 export default  {
    
    name:"bar-chart-widget",

    icon: "mdi-map",

    mixins:[djvueMixin, listenerMixin],

    components:{ echart},
    
    computed:{
       chartOptions(){
         
         if(!this.options) return 
         let res = JSON.parse(JSON.stringify(this.options));
  
         if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length > 0 && this.selection.length > 0){
            
            let s = this.selection.filter( d => d.selected)
            res.series[0].data = this.serie.filter( d => _.find(s, e => e.entity.id == d.selector))
         
         } else {
            res.series[0].data = this.serie
         }

       
        let selection = res.series[0].data.map( d => {
          let f = _.find(this.features, g => g.id == d.selector)
          if(!f) console.log("NOT FOUND", d.selector)
          return f
        })

        res.series[0].center = geo_util.getCenter(selection)
        res.series[0].zoom = geo_util.getZoom(selection, this.mapBounds)

        res.tooltip = {
          trigger: 'item',
          formatter: d => `${d.name}${(Number.isNaN(d.value)) ? '' : ': '+d.value}`
        }  


        return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        
        let map = getGeoJson(this.config.options.map.scope, this.config.options.map.locale);
      
        this.features = map.features;
        this.mapBounds = geo_util.getBounds(this.features)

        
        if(!echarts.getMap(this.config.options.map.name)){
            echarts.registerMap(this.config.options.map.name, map)
        }



       
        tempOptions.series[0].data = tempData.serie;
        tempOptions.visualMap.min = _.min(tempData.serie.map( d => d.value))
        tempOptions.visualMap.max = _.max(tempData.serie.map( d => d.value))
        tempOptions.visualMap.inRange.color = this.config.options.color; 
        this.serie = tempData.serie;
        this.options = tempOptions;

      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(GeoChartConfigDialog, {config:widgetConfig})
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      onDataSelect (emitter, data) {
        this.selection = JSON.parse(JSON.stringify(data.selection))
      }
    },

    
    props:["config"],

    
    mounted(){      
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      serie:null,
      mapBounds: null,
      features:[]
    })

  }

</script> 




