<template>
  <v-card>
    <v-toolbar card dense dark color="primary" class="lighten-2">
          <v-toolbar-title class="font-weight-light">{{opts.title}}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div v-if = "opts.value"> 
        <div class="text-xs-center subheading secondary--text font-weight-light">
          {{opts.value.toFixed(0)}}%
        </div>  
        
        <v-progress-linear
          color="secondary"
          height="6"
          :value="opts.value"
          class="mt-0 mb-2"
        ></v-progress-linear>

        <div style="height:5em; overflow: hidden;">
          <div class="body-1 primary--text font-weight-light" v-for="msg in opts.text">
            {{ msg }}
          </div>
        </div>  

      </div>  


      <v-layout row v-if="!opts.value">
        <v-flex xs1 class="text-xs-center">
          <v-progress-circular
            indeterminate
            size="24"
            color="secondary lighten-2"
          ></v-progress-circular>

        </v-flex>  
        <v-flex xs10 class="primary--text font-weight-light pa-1">
          {{ opts.text[0] }}
        </v-flex>
      </v-layout>

    </v-card-text>
  </v-card>

</template>

<script>
 import progressLayout from "./simpleDialogLayout.vue";
 import listenerMixin from "djvue/mixins/core/listener.mixin.js";

  export default {
    
    name:"warningDialog",
    mixins:[listenerMixin],

    props:["options"],
    
    // computed:{
    //   percents: function(){
    //     return `${this.opts.value.toFixed(0)}%`
    //   }
    // },
    
   data: () => ({
    opts: {text:[]},
    maxStage:null,
    stage:0
   }),
    
  methods:{
    
    resolve(){
      this.$emit('submit', true)
    },

    reject(){
      this.$emit('submit', false)
    },

    setOptions(options){
      
      options = options || {text:"wait one moment"}
      
      options = _.isString(options) ? {text:options} : options
      
      this.opts.text = [ moment(new Date()).format("HH:mm:ss")+" "+options.text].concat(this.opts.text)

      this.opts.title = options.title || this.opts.title || "Progress"

      if(options.maxStage) this.maxStage = options.maxStage
      
      if(this.maxStage){
        this.stage = options.stage || (this.stage+1)
      }  
      
      if(this.stage && this.maxStage){
        this.opts.value = 100 * Math.min(this.stage, this.maxStage)/ this.maxStage
      }
    }  
  },

  layout: progressLayout,

  created(){
    
    this.setOptions(this.options)

    this.on({
      event:"progress-dialog-cancel", 
      callback: () => {
        this.resolve()
      },
      rule: () => true
    })

    this.on({
      event:"progress-dialog-set", 
      callback: (options) => {
        this.setOptions(options)
      },
      rule: () => true
    })
  }

    


}
</script>