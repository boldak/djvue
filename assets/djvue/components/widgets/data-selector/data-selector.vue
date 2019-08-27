<template>
  <div>
           <!--  <v-autocomplete
              v-model="selection"
              :items="items"
              :filter="filter"
              color="primary"
              :label="config.options.widget.label"
              :multiple="config.options.widget.multiple"
              :clearable= "config.options.widget.multiple" 
              v-if="source"
              :item-text="text"
              :item-value = "item => item"

            > -->

            <v-autocomplete
              v-model="selection"
              :items="items"
              :filter="filter"
              color="primary"
              :label="config.options.widget.label"
              :multiple="config.options.widget.multiple"
              :clearable= "config.options.widget.multiple" 
              v-if="source"
              item-text="title"
              :item-value = "item => item"
              class="body-1"

            >
              <!-- <template
                slot="selection"
                slot-scope="data"
                
              >
                <v-chip
                  v-if = "config.options.widget.multiple"
                  outline color="primary"
                  :selected="data.selected"
                  close
                  label
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  {{ data.item.title }}
                </v-chip>
                <div v-else class="primary--text">
                  {{ data.item.title }}
                </div>  
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <template>
                  <v-list-tile-content>{{data.item.title}}</v-list-tile-content>
                </template>
                
              </template> -->
            </v-autocomplete>
            <!-- <pre class="body-1">{{selection}}</pre> -->
            
    </div>        
  </template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  // import DataSelectorConfigDialog from "./data-selector-config.vue";
  
  // Vue.prototype.$dialog.component('DataSelectorConfigDialog', DataSelectorConfigDialog)

  var  DataSelectorConfigDialog;
  let _mode = Cookie.get( __application_Mode_Key ) || "production"
  if(_mode == "development"){
    // if(!Vue.prototype.$dialog._components["ChartConfigDialog"]){
      import("djvue/components/widgets/data-selector/data-selector-config.vue")
        .then( res => {
          DataSelectorConfigDialog = res.default
          Vue.prototype.$dialog.component('DataSelectorConfigDialog', DataSelectorConfigDialog)
      })
    // } else {
    //   ChartConfigDialog = Vue.prototype.$dialog._components["ChartConfigDialog"]
    // }      
  }

  export default {
    
    props:["config"],

    mixins:[djvueMixin, listenerMixin],

    computed:{
      items(){
        if(!this.source) return
        return this.source
      }
    },

    
    methods: {

      onUpdate ({data, options}) {
         
         this.source = data
         // this.mapper = options.mapper;
         
         this.$nextTick(()=>{
             this.selection = (this.config.options.widget.multiple) ? [this.items[0]] : this.items[0] 
         })
      
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait( DataSelectorConfigDialog, {config:widgetConfig} )
      },

      onClear(){
        this.onUpdate({
          data: []
        })
      },

      filter( item, queryText ){
        return _.includes(item.title.toLowerCase(), queryText.toLowerCase())
      },

      text(item){
        // console.log("item:", item)
        return item.title
      },

      remove (item) {
        if(this.selection.length == 1) return
        const index = this.selection.indexOf(item)
        if (index >= 0) this.selection.splice(index, 1)
      }
    },

    watch:{
      selection(value){
        // console.log("selection", value)
        if(!value) return
        // if (value.length == 0) return
        let res = {
          selection:
          _.sortBy(
              this.items.map( item => {
                item.index = _.findIndex((_.isArray(value) ? value : [value]), t => t == item)
                return  {
                      entity:item,
                      selected: (_.findIndex((_.isArray(value) ? value : [value]), t => t == item)>=0)
                  }
              }),
            d => d.entity.index
          )  

        }  
        this.emit("data-select", this, res)
      }  
    },

    data: () => ({
      selection:[],
      source:null
    }),

       
    mounted(){this.$emit("init")}

  }
</script>
