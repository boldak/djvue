<template>
  <div>
    <v-layout column justify-center>
      <h3 class="primary--text body-2 pa-0" style="text-align: center;"> 
        {{config.title}}
      </h3>
      <p class="caption font-italic font-weight-light ma-0 pa-0" style="text-align: center;">
        {{config.note}}
      </p>
      <echart v-if="options" :options="options" :height="options.widget.height"></echart>
  </div>  
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import LineChartConfigDialog from "./line-chart-config.vue";
  import echart from "djvue/components/core/ext/echart.vue"

  Vue.prototype.$dialog.component('LineChartConfigDialog', LineChartConfigDialog)
   
 export default  {
    
    name:"line-chart-widget",

    icon: "mdi-chart-line",

    mixins:[djvueMixin, listenerMixin],

    components:{ echart },
    
   
    methods:{

      onUpdate ({data, options}) {
        const tempOptions = JSON.parse(JSON.stringify(options));
        const tempData = JSON.parse(JSON.stringify(data));
        tempOptions.legend.data = tempData.legend;
        tempOptions.xAxis.data = tempData.xAxis;
        tempOptions.series = tempData.series;
        this.options = tempOptions;
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(LineChartConfigDialog, {config:widgetConfig})
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      // onDataSelect (emitter, data) {
      //   console.log("onDataSelect", this.config.id, data)
      //   setTimeout(()=> {
      //     this.template = data
      //   },1000)
      //   this.emit("data-select", this, data+" redirected")
      // }

    },

    
    props:["config"],

  
  
    mounted(){ 
      this.$emit("init") 
    },
    
  
    data: () =>({
      options:null
    })
  }

</script> 

