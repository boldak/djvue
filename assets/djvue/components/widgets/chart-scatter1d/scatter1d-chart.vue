
<template>
    <div>
    <div v-if="loading" class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="secondary ligten-2"
          ></v-progress-circular>
    </div>    
    
    <v-layout v-else column justify-center>
      <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;"> 
        {{config.title}}
      </h3>
      <p v-if="options" class="caption font-italic font-weight-light ma-0 pb-2" style="text-align: center;">
        {{config.note}}
      </p>
      <echart 
        v-if="options" 
        :options="chartOptions" 
        :height="options.widget.height" 
        class="pa-1" 
        style="border:1px solid #dedede;"
      ></echart>
      <!-- <div v-if="options">
          <pre class="caption">{{JSON.stringify(options, null, "\t")}}</pre>
      </div> -->
  </div>  
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import ChartConfigDialog from "../widget-share/chart/chart-config.vue";
  import echart from "djvue/components/core/ext/echart.vue"

  Vue.prototype.$dialog.component('ChartConfigDialog', ChartConfigDialog)
   
 export default  {
    
    name:"scatter1d-chart-widget",

    icon: "mdi-chart-scatterplot-hexbin",

    mixins:[djvueMixin, listenerMixin],

    components:{ echart},
    
    computed:{
       chartOptions(){
         
         if(!this.options) return 
         let res = JSON.parse(JSON.stringify(this.options));
         
         // if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
         //    let s = this.selection.filter( d => d.selected)
         //    res.series = this.series.filter( d => _.find(s, e => e.entity.id == d.selector))
            
         // }
         // res.legend.data = res.series.map( d => d.name)
         
         res.title = this.series.map( (s, index) => ({
          textBaseline: 'middle',
          top: (index + 0.5) * 100 / this.series.length-5 + '%',
          text: s.name,
          textStyle:{
              fontSize: 12,
              fontWeight: "normal"
          }
         }))
         
         res.singleAxis = this.series.map( (s, index) => ({
          left: 150,
          type: 'category',
          boundaryGap: false,
          data: this.xAxis.data,
          top: (index * 100 / this.series.length) + '%',
          height: (100 / this.series.length - 7) + '%',
          // axisLabel: {
          //     interval:-2 
          // },
          axisLine: {
            show: true,
            lineStyle:{
              width:0.5
            }
          },
          axisTick: {
            show: false
          }
         }))

        let symbolSize =  this.symbolSize 
        res.series = this.options.series.map( (s, index) => ({
          singleAxisIndex: index,
          coordinateSystem: 'singleAxis',
          type: 'scatter',
          data: this.xAxis.data.map( (d,index) => ([d,s.data[index]])),
          symbolSize: dataItem =>  dataItem[1] * symbolSize
        }))

        res.tooltip.formatter =  d => {
          let x = d.data[0];
          let y = d.data[1];

          x = (_.isNumber(x)) ? x.toFixed(2) : x;
          y = (_.isNumber(y)) ? y.toFixed(2) : y;

          return x+", "+y
        }

        return res
      }
    },

    methods:{

       onUpdate ({data, options}) {

        if(!options) return

        data = data || {
          "symbolSize": 4,
          "xAxis": {
            "data": []
          },
          "series": []
        }
        
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        
       
        tempOptions.series = tempData.series;
        this.series = tempData.series;
        this.symbolSize = tempData.symbolSize
        this.xAxis = tempData.xAxis
        this.options = tempOptions;
        this.loading = false

      },

      onReconfigure (widgetConfig) {
       this.loading = true 
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
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      series:[],
      loading:true

    })

  }

</script> 
