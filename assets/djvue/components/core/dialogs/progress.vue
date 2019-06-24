<template>
  <v-card>
    <v-card-text>
      <div v-if = "opts.value"> 
        <div class="text-xs-center subheading secondary--text font-weight-light">
          {{percents}}
        </div>  
        
        <v-progress-linear
          color="secondary"
          height="4"
          :value="opts.value"
          class="mt-0 mb-2"
        ></v-progress-linear>

        <div class="text-xs-center subheading  primary--text font-weight-light">
          {{opts.text}}
        </div>

      </div>  


      <v-layout row v-if="!opts.value">
        <v-flex xs2>
          <v-progress-circular
            indeterminate
            color="secondary lighten-2"
          ></v-progress-circular>

        </v-flex>  
        <v-flex xs10 class="headline primary--text font-weight-light">
          {{opts.text}}
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
    
    computed:{
      percents: function(){
        return this.opts.value.toFixed(0)+"%"
      }
    },
    
   data: () => ({
    opts: {text:"wait one moment"},
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
      this.opts = options || {text:"wait one moment"}
      this.opts = _.isString(this.opts) ? {text:this.opts} : this.opts

      if(this.opts.maxStage) this.maxStage = this.opts.maxStage
      
      if(this.maxStage){
        this.stage = this.opts.stage || (this.stage+1)
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