<template>
   
      <v-layout column justify-center pb-2>
        <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;"> 
          {{config.title}}
        </h3>
        <p v-if="options" class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
          {{config.note}}
        </p>
        <div v-if="options" style="border:1px solid #dedede; background:#03a9f40f;">
          <echart  :options="chartOptions" :height="options.widget.height"></echart>
        </div>
                
      </v-layout>  
     
   
</template>



<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  // import ChartConfigDialog from "../widget-share/chart/chart-config.vue";
  import echart from "djvue/components/core/ext/echart.vue";
  import getGeoJson from "./maps.js";
  

  // Vue.prototype.$dialog.component('ChartConfigDialog', ChartConfigDialog)
  
  var  ChartConfigDialog;
  let _mode = Cookie.get( __application_Mode_Key ) || "production"
  if(_mode == "development"){
    // if(!Vue.prototype.$dialog._components["ChartConfigDialog"]){
      import("djvue/components/widgets/widget-share/chart/chart-config.vue")
        .then( res => {
          ChartConfigDialog = res.default
          Vue.prototype.$dialog.component('ChartConfigDialog', ChartConfigDialog)
      })
    // } else {
    //   ChartConfigDialog = Vue.prototype.$dialog._components["ChartConfigDialog"]
    // }      
  }
   
 export default  {
    
    name:"geo-markers-chart-widget",

    icon: "mdi-map-marker",

    mixins:[djvueMixin, listenerMixin],

    components:{ echart},
    
    computed:{
       chartOptions(){
         
         if(!this.options) return 
         let res = _.extend({}, this.options);
  
         // if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length > 0 && this.selection.length > 0){
            
         //    let s = this.selection.filter( d => d.selected)
         //    res.series[0].data = this.serie.filter( d => _.find(s, e => e.entity.id == d.selector))
         
         // } else {
            // res.series[0].data = this.serie
         // }

        res.series.forEach( s=> {
          if( s.type == "scatter" && s.coordinateSystem == "geo")
          s.label.normal.formatter = d => `${d.data[3]} ${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`
        })

        let boundedPoints = _.flattenDeep( res.series
                                .filter( s => s.type == "scatter" && s.coordinateSystem == "geo")
                                .map( s => s.data.map(p => ({x:p[0],y:p[1]})))
                            )    
       
        if(boundedPoints.length > 1){
          res.geo.boundingCoords = [
            [
              _.min(boundedPoints.map( d => d.x)),
              _.min(boundedPoints.map( d => d.y))
            ],
            [
              _.max(boundedPoints.map( d => d.x)),
              _.max(boundedPoints.map( d => d.y))
            
            ]
          ] 

          res.geo.boundingCoords = [
            [
              res.geo.boundingCoords[0][0] - 0.1 * (res.geo.boundingCoords[1][0] - res.geo.boundingCoords[0][0]),
              res.geo.boundingCoords[0][1] - 0.1 * (res.geo.boundingCoords[1][1] - res.geo.boundingCoords[0][1])
            ],
            [
              res.geo.boundingCoords[1][0] + 0.1 * (res.geo.boundingCoords[1][0] - res.geo.boundingCoords[0][0]),
              res.geo.boundingCoords[1][1] + 0.1 * (res.geo.boundingCoords[1][1] - res.geo.boundingCoords[0][1])
            ]
          ]  
        } 
        
        if(boundedPoints.length == 1){
           res.geo.boundingCoords = [
            [
              _.min(boundedPoints.map( d => d.x)) - 1,
              _.min(boundedPoints.map( d => d.y)) - 1
            ],
            [
              _.max(boundedPoints.map( d => d.x)) + 1,
              _.max(boundedPoints.map( d => d.y)) + 1
            ]
          ]           
        }

        
          res.series.forEach( s => {
            if( s.type == "scatter" && s.coordinateSystem == "geo"){
              s.tooltip = {
                trigger: 'item',
                formatter: d => `${d.data[3]}${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`
              }   
              if(s.symbolSizeRange)
                s.symbolSize = data => {
                  let v = (_.max(s.symbolSizeRange) - _.min(s.symbolSizeRange)) * (data[2]- this.valueRange.min)/(this.valueRange.max - this.valueRange.min + 0.0000000001) + _.min(s.symbolSizeRange)
                  return v
                }  
              } else {
                s.symbolSize = s.symbolSize || 6
              }
             if( s.type == "lines"){
              s.tooltip = {
                trigger: 'item',
                formatter: d => {
                  console.log(d)
                  return `${d.data.originName}-${d.data.destName} : ${d.data.value}`
                }  
              }
             } 
          })
                  
          // res.series.forEach( s => {
          //   if( s.type == "lines" && s.lineStyle && s.lineStyle.normal &&  s.lineStyle.normal.widthRange){
          //       console.log("s.lineStyle.normal.widthRange")
          //       let values = s.data.map( d => d.value)
          //       let range = [_.min(values),_.max(values)]
          //       s.lineStyle.normal.width = d => {
          //         let v = (_.max(s.lineStyle.normal.widthRange) - _.min(s.lineStyle.normal.widthRange))*(d.value - _.min(range))/(_.max(range)-_.min(range))+_.min(s.lineStyle.normal.widthRange)
          //         console.log(d,range,v)
          //         return v
          //       }
          //   }    
          // })

         res.tooltip = {
          trigger: 'item',
          formatter: d => `${d.data[3]}${(Number.isNaN(d.data[2])) ? '' : ': '+d.data[2]}`
        }  

        res.legend ={
          backgroundColor:"rgba(127,127,127,0.4)",

          data: res.series.map( (s,index) => {
            s.name = (s.name) ? s.name : `Serie ${index}`
            return s.name
          })
        }
        
        return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        if(!options) return

        // data = data || []
        
        const tempOptions =  _.extend(_.extend({},options), data);
                
        let map = getGeoJson(this.config.options.map.scope, this.config.options.map.locale);
      
        if (!echarts.getMap(this.config.options.map.name)){
            echarts.registerMap(this.config.options.map.name, map)
        }

        let series = tempOptions.series
                        .filter( s => s.type == "scatter" && s.coordinateSystem == "geo")
                        .map( s => ({
                          min: _.min(s.data.map(v=>v[2])),
                          max: _.max(s.data.map(v=>v[2])),
                        }))
      
        this.valueRange = {
          min: _.min( series.map( s => s.min) ),
          max: _.max( series.map( s => s.max) )
        }

        if (tempOptions.colorScale){
          tempOptions.visualMap.min = this.valueRange.min - 0.1 * (this.valueRange.max - this.valueRange.max)
          tempOptions.visualMap.max = this.valueRange.max + 0.1 * (this.valueRange.max - this.valueRange.max)
          tempOptions.visualMap.inRange.color = this.config.options.color;
          tempOptions.visualMap.precision = 3  
        } else {
          tempOptions.visualMap = undefined
        }
         
        this.options = _.extend({},tempOptions);
        // console.log("options",this.options)
        

      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(ChartConfigDialog, {config:widgetConfig})
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
    // console.log("mount markers")     
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      serie:null,
      valueRange:[]
    })

  }

</script> 




