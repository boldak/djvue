<template>
  <div>
            <v-autocomplete
              v-model="selection"
              :items="items"
              :filter="filter"
              color="primary"
              :label="config.options.widget.label"
              :multiple="config.options.widget.multiple"
              clearable
              v-if="source"
            >
              <template
                slot="selection"
                slot-scope="data"
              >
                <v-chip
                  outline color="primary"
                  :selected="data.selected"
                  close
                  label
                  class="chip--select-multi"
                  @input="remove(data.item)"
                >
                  {{ data.item.title }}
                </v-chip>
              </template>
              <template
                slot="item"
                slot-scope="data"
              >
                <template>
                  <v-list-tile-content>{{data.item.title}}</v-list-tile-content>
                </template>
                
              </template>
            </v-autocomplete>
            
    </div>        
  </template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import DataSelectorConfigDialog from "./data-selector-config.vue";
  
  Vue.prototype.$dialog.component('DataSelectorConfigDialog', DataSelectorConfigDialog)

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
         this.mapper = options.mapper;
         
         this.$nextTick(()=>{
             this.selection = (this.config.options.widget.multiple) ? [this.items[0]] : this.items[0] 
         })
      
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait( DataSelectorConfigDialog, {config:widgetConfig} )
      },

      filter( item, queryText ){
        return _.includes(item.title.toLowerCase(), queryText.toLowerCase())
      },

      remove (item) {
        if(this.selection.length == 1) return
        const index = this.selection.indexOf(item)
        if (index >= 0) this.selection.splice(index, 1)
      }
    },

    watch:{
      selection(value){
        
        let res = {
          selection:this.items.map(item => ({
              entity:item,
              selected: (_.findIndex((_.isArray(value) ? value : [value]), t => t == item)>=0)
          }))
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
