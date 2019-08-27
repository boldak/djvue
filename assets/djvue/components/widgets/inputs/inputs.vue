<template>
   <v-card flat style="border:1px solid #dedede;"  v-if="opts.length > 0">
      <!-- <pre class="caption">
        {{opts}}
      </pre>   -->
          
      <div class="ma-1 px-1">
        <div v-for="field,index in opts" v-show="isShowed(field)">
          
          <v-flex v-if="field.type == 'text'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-textbox"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :rules="field.rules"
                class="body-1"
              ></v-text-field>
          </v-flex>

          <v-flex v-if="field.type == 'password'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-textbox-password"
                :append-icon="field.showChars ? 'visibility' : 'visibility_off'"
                :type="field.showChars ? 'text' : 'password'"
                @click:append="field.showChars = !field.showChars"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
                class="body-1"
              ></v-text-field>
          </v-flex>

          <v-flex v-if="field.type == 'email'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-email-outline"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
                class="body-1"
              ></v-text-field>
          </v-flex>

          <v-flex v-if="field.type == 'url'">
              <v-text-field
                v-model="field.value"
                prepend-icon="mdi-web"
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
                class="body-1"
              ></v-text-field>
          </v-flex>


          <v-flex v-if="field.type == 'textarea'">
              <v-textarea 
                prepend-icon="mdi-text"
                v-model="field.value" 
                :label="field.label"
                :disabled="field.disabled"
                :required="field.required"
                :error-messages="messages[index].join(' ')"
                :rules="field.rules"
                class="body-1"
              ></v-textarea>
          </v-flex>

          <v-flex v-if="field.type == 'switch'">
            <v-switch
              :label="field.label"
              v-model="field.value"
              :disabled="field.disabled"
              color="primary"
              class="body-1"
            ></v-switch>
          </v-flex>

          <v-flex v-if="field.type == 'range'">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control">
                <div class="v-text-field">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light"
                    :class = "(messages[index].length>0) ? 'error--text': ''" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}}
                  </label>
            
                  <v-range-slider 
                    class="mx-3"
                    v-model="field.value"
                    :disabled="field.disabled"
                    :max="field.range[1]" 
                    :min="field.range[0]" 
                    :step="field.step" 
                    thumb-size="24" 
                    thumb-label="always" 
                    thumb-color="primary" 
                    ticks="always" 
                    tick-size="2"
                    :error-messages="messages[index].join(' ')"
                    :rules="field.rules"
                  ></v-range-slider>
                </div>
              </div>
            </div>      
          </v-flex>  

          <v-flex v-if="field.type == 'date'">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control">
                <div class="v-text-field py-1">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}} {{(field.multiple) ? field.value.join(", ") : ""}}
                  </label>
                        
                  <v-date-picker
                        :aria-label="field.label"
                        v-model="field.value"
                        full-width
                        landscape
                        :multiple="field.multiple"
                        class="v-card--flat"
                        style="border: 1px solid #dedede;"
                        :error-messages="messages[index].join(' ')"
                        

                  ></v-date-picker>
                  <!-- :event-color="date => date[9] % 2 ? 'red' : 'yellow'" -->
                        <!-- :events="functionEvents" -->
                </div>
              </div>
            </div>      
          </v-flex>  

          <v-flex v-if="field.type == 'time'">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control" style="display:block;">
                <div class="v-text-field py-1">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light" 
                    :class = "(messages[index].length>0) ? 'error--text': ''" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}}
                  </label>
                  <v-time-picker 
                    v-model="field.value" 
                    landscape
                    format="24hr"
                    :multiple="field.multiple"
                    full-width
                    class="v-card--flat"
                    style="border: 1px solid #dedede;"
                    :error-messages="messages[index].join(' ')"
                  ></v-time-picker>      
                </div>
                <div class="v-messages theme--light error--text">
                  <div class="v-messages__wrapper">
                    <div class="v-messages__message">
                      {{messages[index].join(' ')}}
                    </div>
                  </div>
                </div>
              </div>
            </div>      
          </v-flex>

          <v-flex v-if=" field.type == 'select' ">
            <v-autocomplete
              v-model="field.value"
              :items="field.items"
              :filter="field.filter"
              color="primary"
              :label="field.label"
              :multiple="field.multiple"
              :clearable= "field.multiple" 
              :item-text="field.itemText"
              :item-value = "item => item"
              :error-messages="messages[index].join(' ')"
              class="body-1"
            >
          </v-flex>  

          <v-flex v-if=" field.type == 'number' ">
            <div class="v-input v-text-field v-input--is-label-active v-input--is-dirty theme--light">
              <div class="v-input__control" style="display:block;">
                <div class="v-text-field py-1">
                  <label 
                    aria-hidden="true" 
                    class="v-label v-label--active theme--light" 
                    :class = "(messages[index].length>0) ? 'error--text': ''" 
                    style="left: 0px; right: auto; position: absolute;">
                      {{field.label}}
                  </label>
                  <v-input
                    :error-messages="messages[index].join(' ')"
                  >
                      <input 
                        type="number" 
                        style="border: 1px solid #e0e0e0; width:100%; padding:2px;" 
                        v-model="field.value"
                        :min="field.range[0]"
                        :max="field.range[1]"
                      ></input>
                  </v-input>  
                </div>
              </div>
            </div>      
          </v-flex>        
        </div> 
      </div>   





      
      

      <!-- <v-flex xs12 pl-3 pr-3 justify-center>
        <input type="file" label="file" v-on:change="fileChanged"/>
      </v-flex>   -->
      
      
     <!--  <v-divider></v-divider>
        <pre class="body-1">{{messages}}</pre> -->
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="secondary" @click="resolve" :disabled = "!valid">Apply</v-btn>
      </v-card-actions>
      
  </v-card>
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
    
    name:"inputs-widget",

    icon: "mdi-file-document-box-outline",

    mixins:[djvueMixin, listenerMixin],

           
    data: () => ({
      valid: true,
      opts:[],
      messages:[],
      rules:{
        required: value => (!_.isUndefined(value) && (value !== null) && (value !== "")) || "Required." ,
        valid_email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },

        valid_url: value => {
          const pattern = /^((https?:\/\/)([a-zA-Z0-9]+[a-zA-Z0-9_-]*)(:\d{0,4})?([a-zA-Z0-9_\-\/\%\=\{\}\?\+\&\.\:]*))$/
          return pattern.test(value) || 'Invalid url.'
        },

        valid_range: value => {
          return (value.length == 2) || "Required."
        },

        valid_one_selection: value => value != null || "Required." ,

        valid_multiple_selection: value => value.length > 0 || "Required."   
      }
    }), 
    
    watch:{
      opts:{
        handler(value){
          
          let res = true
          value.forEach( (option, index) => {
            if(option.required){
              let temp = true
              this.messages[index] = []
              option.rules.forEach( rule => {
                let ruleResult = rule(option.value)
                if( ruleResult != true){
                  this.messages[index].push(ruleResult)
                } 
                temp = temp && (ruleResult == true)
              })
              res = res && temp  
            } 
          })
          this.valid = res
        },
        deep:true
      }    
    },

    methods:{

      onUpdate ({data, options}) {
        if(!data) {
          this.opts = []
          return
        }  
        // console.log("data", data)
        this.opts = this.normalizeOptions(data)
        // console.log("opts", this.opts)
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(ChartConfigDialog, {config:widgetConfig}) 
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      // onDataSelect (emitter, data) {
      //   this.selection = JSON.parse(JSON.stringify(data.selection))
      // }


      isShowed (field) {
        // console.log(field)
        let deps = field.show || []
        deps = _.isArray[deps] ? deps : [deps]
        deps = deps.map( d => {
          let f = _.find(this.opts, f => f.id == d)
          return (f) ? f.value : true
        })
        // console.log(deps.reduce( (r,d) => d && r, true))
        return deps.reduce( (r,d) => d && r, true)
      },

      defaultFilter( item, queryText ){
        return _.includes(item.toLowerCase(), queryText.toLowerCase())
      },

      customFilter(itemText) {
        return  ( item, queryText ) => _.includes(item[itemText].toLowerCase(), queryText.toLowerCase())
      },

      // validation(){
      //   return this.opts.reduce( (option, res) => res && option.rules.reduce( (rule, rr) => rr && rule(option.value)))
      // },

      
      normalizeOptions(options){
        
        let res = []

        if(!options || !options.field) return []

        _.keys(options.field).forEach( o => {

          
          let type = options.field[o].type || "text"
          let value = options.field[o].value || null
          let rules = (options.field[o].required)
                      ? [this.rules.required].concat((options.field[o].rules) ? options.field[o].rules : [])
                      : undefined

          if (options.field[o].type == "range"){
            value = value || []
          }

          if (options.field[o].type == "date"){
            if (options.field[o].multiple){
              if ( value ){
                if ( _.isArray(value)){
                    value = value.map( v => moment(new Date(v)).format("YYYY-MM-DD"))
                } else {
                  value = [moment(new Date(value)).format("YYYY-MM-DD")]
                }
              } else {
                value = [moment(new Date()).format("YYYY-MM-DD")]
              }
            } else {
              value = (value) ? moment(new Date(value)).format("YYYY-MM-DD") : moment(new Date()).format("YYYY-MM-DD")  
            }
          }

          if (options.field[o].type == "select"){
            value = value || ((options.field[o].multiple) ? [] : null)
          }

          if (options.field[o].required && (options.field[o].type == "url")){
            rules = rules.concat(this.rules.valid_url)
          }

          if (options.field[o].required && (options.field[o].type == "email")){
            rules = rules.concat(this.rules.valid_email)
          }

          if (options.field[o].required && (options.field[o].type == "range")){
            rules = rules.concat(this.rules.valid_range)
          }

           if (options.field[o].required && (options.field[o].type == "select") && (options.field[o].multiple)){
            rules = rules.concat(this.rules.valid_multiple_selection)
          }

          let range = options.field[o].range || []
          if (options.field[o].type == "range"){
            range = (options.field[o].type == "range" && options.field[o].range && _.isArray(options.field[o].range) && options.field[o].range.length == 2)
                    ? options.field[o].range
                    : [0,1]
          }


           res.push( {
            id: o,
            type,
            value,
            label: options.field[o].label || o,
            items: options.field[o].items || [],
            range,
            step:  (options.field[o].range && _.isArray(options.field[o].range) && options.field[o].range.length == 2 && !_.isUndefined(options.field[o].step))
                    ? options.field[o].step
                    : 0.1,       
            showChars: false,
            show: options.field[o].show,
            disabled: options.field[o].disabled || false,
            required: options.field[o].required || false,
            rules,
            items: (options.field[o].items)
                      ? options.field[o].items
                      : [],
            multiple: (options.field[o].multiple)
                        ? options.field[o].multiple
                        : false,
            itemText: (options.field[o].itemText)
                        ? options.field[o].itemText
                        : undefined,
            filter: (options.field[o].itemText)
                        ? this.customFilter(options.field[o].itemText)
                        : this.defaultFilter                        

           })
           this.messages.push([])
        })
       
        return res
      },

      getOptions(options){

        return _.zipObject(options.map( d => d.id), options)
      }, 


      resolve(){
        this.emit('apply', this.getOptions(this.opts))
      }

    },

    created(){
      // this.opts = this.normalizeOptions(_.extend(this.options))
    },

    mounted(){ this.$emit("init") },
  }
</script> 

