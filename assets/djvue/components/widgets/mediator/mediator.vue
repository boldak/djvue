<template>
   <v-container fluid class="pa-1" v-show="!isProductionMode">

    <v-layout wrap v-if="!isProductionMode">
      <v-flex xs12>
        
        <editor       :content="config.data.script" 
                      lang="javascript" 
                      :sync="true"
                      @change="onUpdateSource"
                      style="border:1px solid #999"
        > 
        </editor>

      </v-flex>
    </v-layout>
    <v-layout>
        <v-spacer></v-spacer>
        <v-btn flat color="primary" v-on:click="_runScript()">
              Run
        </v-btn>  
     </v-layout>  
   
  </v-container>  
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import editor from 'djvue/components/core/ext/ace-editor.vue';


  var  components = {};
  let _mode = Cookie.get( __application_Mode_Key ) || "production"
  if(_mode == "development"){
      components.editor = () => import("djvue/components/core/ext/ace-editor.vue")
  }

  class MediatorError extends Error {
    constructor(message) {
      super(message);
      this.name = "Mediator Error";
    }
  }


  // import MediatorConfig from "./mediator-config.vue"
  
  // Vue.prototype.$dialog.component('MediatorConfig', MediatorConfig)
  
 export default  {
    
    name:"mediator-widget",

    icon: "mdi-language-javascript",

    components,

    mixins:[djvueMixin, listenerMixin],

    methods:{

      // onReconfigure (widgetConfig) {
      //  return this.$dialog.showAndWait(MediatorConfig, {config:widgetConfig})
      // },

      onUpdateSource (value) {
          this.config.data.script = value
          this.setNeedSave(true)
      },

      // onPageStart () {
      //  this._runScript();
      // },


      onRun () {
        return new Promise( (resolve, reject) => {
          try {
            this._runScript()
            resolve()
          } catch(e) {
            reject(e)
          }
        })
      },

      _runScript () {

        console.log(`Run script ${this.config.id}`)

        this.api = {
          selectWidgets: (filter) => {
            filter = filter || (item => true);
            if(!_.isFunction(filter)){
              let identifiers = (_.isArray(filter)) ? filter : [filter];
              filter = (item) => _.find(identifiers, i => item.config.id == i)  
            }

            let res = this.$djvue.selectWidgets( this.$root, item => item.config && filter(item)); 
            
            return (res.length == 0) 
                      ? undefined
                      : (res.length == 1)
                        ? res[0]
                        : res
          },
          
          on:this.on,
          off: this.off,
          emit: (event,data) => {this.emit(event,this,data)},
          
          progress: this.$djvue.progress,
          selectFile: this.$djvue.selectFile,
          confirm: this.$djvue.confirm,
          warning: this.$djvue.warning,
          dialog: this.$djvue.customDialog,
          
          
          runDps: (script, state, file) => this.$dps.run({ 
                      script, 
                      state:state||{},
                      file
                    })
                    // .then(res => {
                    //   res.data.$$error = (res.type=="error") ? res.data.message: undefined
                    //   return res.data
                    // })

        }

        try {

          eval(
            `
            (function() { 
              let selectWidgets = this.api.selectWidgets;
              let on = this.api.on;
              let off = this.api.off;
              let emit = this.api.emit;

              ${this.config.data.script} }
            )

            `
          ).apply(this)  

        } catch(e) {

          // this.$djvue.warning({
          //           type:"error",
          //           title:`Error mediator ${this.config.id}:${this.config.name} script error`,
          //           text:e.toString()
          //         })
          throw new MediatorError(` Mediator ${this.config.id}: ${e.toString()} `)
        }
      }

    },

    
    props:["config"],

  
    mounted(){
       this.$emit("init")
    }

  }

</script>	