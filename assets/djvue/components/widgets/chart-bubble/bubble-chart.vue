
<template>
    <div>
    <v-layout column justify-center>
      <h3 class="primary--text body-2 pt-2 pb-0" style="text-align: center;"> 
        {{config.title}}
      </h3>
      <p v-if="options" class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
        {{config.note}}
      </p>
      <echart v-if="options" :options="chartOptions" :height="options.widget.height"></echart>
      <!-- <div v-if="options">
          <pre class="caption">{{JSON.stringify(options, null, "\t")}}</pre>
      </div> -->
  </div>  
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
 // import ChartConfigDialog from "../widget-share/chart/chart-config.vue";
  import echart from "djvue/components/core/ext/echart.vue"

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
    
    name:"bubble-chart-widget",

    icon: "mdi-chart-bubble",

    mixins:[djvueMixin, listenerMixin],

    components:{ echart},
    
    computed:{
       chartOptions(){
         if(!this.options) return 
         let res = JSON.parse(JSON.stringify(this.options));
         
         if(this.config.dataSelectEmitters && this.config.dataSelectEmitters.length>0){
            
            let s = this.selection.filter( d => d.selected)
            res.series = this.series.filter( d => _.find(s, e => e.entity.id == d.selector))
            
         }
         res.legend.data = res.series.map( d => d.name)

         res.series = res.series.map( s => {
            s.symbolSize = data => Number.parseInt((data[2]*this.zoom+5).toFixed(0))
           
            s.label = { normal: 
              {
                show: true,
                formatter: param => param.data[3],
                position: 'top'
              }
            }

            return s
         })

        return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        
        let values = [];
        tempData.series.forEach( s => {
          values = values.concat(s.data.map( d => d[2]))
        })

        let max = _.max(values)
        let min = _.min(values)


        let height = this.config.options.widget.height || 250

        this.zoom = (height*0.2-5)/(max-min)
       
        tempOptions.series = tempData.series;
        this.series = tempData.series;
        this.options = tempOptions;

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
      this.$emit("init") 
    },
    
     data: () =>({
      options:null,
      selection:[],
      series:[],
      zoom:1

    })

  }

</script> 
