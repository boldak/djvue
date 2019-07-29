
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
    
    name:"scatter-chart-widget",

    icon: "mdi-chart-scatterplot-hexbin",

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
         // console.log(res)
         return res
      }
    },

    methods:{

       onUpdate ({data, options}) {
        let tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        
       
        // tempOptions.series = tempData.series;
        tempOptions = _.extend(tempOptions, tempData)
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
      series:[]

    })

  }

</script> 
