<template>
        
  <v-flex>
   
      <v-autocomplete 
        v-model="keywords" 
        :items="availableKeywords" 
        color="primary" 
        label="Keywords" 
        multiple
        
        :search-input.sync="searchKeyword" 
        @keyup.enter="createKeyword(searchKeyword)"
      >
        <template slot="selection" slot-scope="data">
          <v-chip outline label color="primary" :selected="data.selected" close class="chip--select-multi" @input="removeKeyword(data.item)">
            {{ data.item }}
          </v-chip>
        </template>
        <template slot="item" slot-scope="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template v-else>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item"></v-list-tile-title>
            </v-list-tile-content>
          </template>
        </template>
        <template slot="no-data">
          <v-list-tile>
            <v-btn flat color="primary" @click="createKeyword(searchKeyword)">
              Create "{{searchKeyword}}"
            </v-btn>
          </v-list-tile>
        </template>
      </v-autocomplete>
  
  </v-flex>

</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  // import DataKeywordsConfigDialog from "./data-keywords-config.vue";
  
  // Vue.prototype.$dialog.component('DataKeywordsConfigDialog', DataKeywordsConfigDialog)

  var  DataKeywordsConfigDialog;
  let _mode = Cookie.get( __application_Mode_Key ) || "production"
  if(_mode == "development"){
    // if(!Vue.prototype.$dialog._components["ChartConfigDialog"]){
      import("djvue/components/widgets/data-keywords/data-keywords-config.vue")
        .then( res => {
          DataKeywordsConfigDialog = res.default
          Vue.prototype.$dialog.component('DataKeywordsConfigDialog', DataKeywordsConfigDialog)
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
         this.availableKeywords = data
      },

      createKeyword(keyword) {
        if(keyword && keyword.length>0){
          this.availableKeywords.push(keyword)
          this.keywords.push(keyword)  
        }
      },

      removeKeyword(item) {
        const index = this.keywords.indexOf(item)
        if (index >= 0) this.keywords.splice(index, 1)
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait( DataKeywordsConfigDialog, {config:widgetConfig} )
      }

      
    },

    watch:{
      keywords(value){
        this.emit("keywords-select", this, value)
      }  
    },

    data: () => ({
      keywords: [],
      availableKeywords: [],
      searchKeyword: null,
      
    }),

       
    mounted(){this.$emit("init")}

  }
</script>
