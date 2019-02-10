<template>
  <v-layout column>
    <v-flex xs12 style="border:1px solid #dedede; background:#ffffff;">
        <echart v-if="options" :options="chartOptions" :height="options.widget.height"></echart>
    </v-flex>
  </v-layout>  
</template>



<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import ioMixin from "./io.mixin.js";
  import DsOntologyConfigDialog from "./ds-value-explorer-config.vue";
  import echart from "djvue/components/core/ext/echart.vue"


  Vue.prototype.$dialog.component('DsOntologyConfigDialog', DsOntologyConfigDialog)
   
 export default  {
    
    name:"ds-ontology-widget",

    icon: "mdi-triforce",

    mixins:[djvueMixin, listenerMixin, ioMixin],

    components:{ echart },
    
    computed:{
        
        chartOptions(){
          
          if(!this.options) return {}
          
          let res = JSON.parse(JSON.stringify(this.options));
          

          // res.series[0].label.normal.formatter = d => {
          //       let tooltip = `{title|${d.data.name}}`+"\n"
          //       if(d.data.values){
          //         let range = (d.data.range) 
          //           ? d.data.range.split(",").map( d => Number.parseFloat(d.trim()))
          //           : undefined;

          //         let rows = d.data.values.map( r => {
                    
          //           let cls = "norange"
                    
          //           if (range) {
                     
          //             let norm;

          //             if( (range[1] - range[0]) >= 0 ){
          //               norm = (r.value - range[0]) / (range[1] - range[0])
          //             } else {
          //               norm = - (r.value - range[1]) / (range[0] - range[1])
          //             }
                      
          //             // r.norm= norm.toFixed(3)
                      
          //             if( norm >= 0 ) {
          //               cls = ( norm <= 0.25 ) ? "low" : ( norm >= 0.75 ) ? "high" : "middle"  
          //             } else {
          //               cls = ( norm <= -0.75 ) ? "low" : ( norm >= -0.25 ) ? "high" : "middle"
          //             }
          //           }
                    

          //           let row = Object.keys(r)
          //                 .map( k => ( k == "value") 
          //                       ? Number.parseFloat(r[k]).toFixed(3) 
          //                       : ( k == "id" ) 
          //                           ? this.getName(r[k])
          //                           : r[k]
          //                 )          
          //                 .join("\t\t\t")
          //           return `{${cls}|${row}}`      
          //         }).join("\n") 
                  
          //         tooltip += rows  
          //       }

          //       return tooltip
          // }


          return res
      }  
    },

    methods:{

       updateOptions ({data, options}) {
        if(!data) return 
        
        const tempOptions = JSON.parse(JSON.stringify(options));
        this.data = data;
        tempOptions.series[0].data = [data];
        
        this.options = tempOptions;
      },

     onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(DsOntologyConfigDialog, {config:widgetConfig})
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      loadTree(){
       this.getOntology()
        .then(res => {
          this.updateOptions({data:res, options:this.config.options})
        })  

      }

    },
    
    props:["config"],
    
    mounted(){      
      this.$emit("init") 
    },

    watch:{
           
      "config.options.widget.height"(){
        this.$nextTick( ()=> {
            this.updateOptions({data:this.data, options:this.config.options})
        })
      },

      "config.metadata.concepts"(value){
        if( value )
          this.$nextTick( ()=> {
              this.loadTree()
          })  
      }

    },

    created(){
      if( this.config.metadata.concepts){
        this.loadTree()
      }
    },

    
     data: () =>({
     
      options:null,
      selection:[],
      series:[],
      indicator_select:null,
      country_selection:[],
      year_select:null,
      indicators:null,
      countries:null,
      years:null,
      indicator_filter:''

    })

  }

</script> 
