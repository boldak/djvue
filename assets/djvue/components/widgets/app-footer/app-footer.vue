<template>
  <v-footer
    v-if="options"
    height="auto"
    color="primary darken-1 white--text"
  >
    <v-layout column>
      <v-layout row>
        <v-flex xs12 md6 px-5 py-2>
          <h3 class="headline font-weight-light">{{options.title}}</h3>
          <p class="font-weight-thin"> 
            {{options.description}}
          </p>  
        </v-flex>
      </v-layout>
      
      <v-divider v-if="options.references && options.references.length > 0" class="theme--dark"></v-divider>
      
      <v-flex xs12>  
        
        <v-layout
          justify-center
          row
          wrap
          py-2
          style="font-weight:300;"
        >

          <div v-for="page in options.references">
            <router-link  v-if="page.id"  :to="`/${page.id || ''}`" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
                {{page.title}}
            </router-link>
            <a  v-if="page.url" :href="page.url" :target="page.target" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
                {{page.title}}
            </a>
          </div>  

      </v-flex>    
      
      <v-flex
        secondary
        darken-1
        py-3
        white--text
        xs12
        text-xs-right
        pr-5
        class="font-weight-thin"
      >
        <p class="ma-0" style="height: 1em;">
          <span class="body-1">DJVUE</span> <i class="caption">Online SPA Development Tools</i>
        </p>
        
        <!-- <p class="ma-0"> 
          Based on <a href="./app/Apps/about" target="_blank"><img src="./img/dj.png" style="height:24px;"/> platform </a>
        </p>
       -->
                   
        <p class="mt-1 mb-0 mx-0 caption font-weight-thin" style="height: 1em;"> 
          Copyright &copy; 2014-2019 <a href="mailto:boldak.andrey@gmail.com" target="_blank" class="white--text">Andrey Boldak</a>. 
        </p>
        <p class="ma-0 caption font-weight-thin" style="height: 1em;">  
          Licensed under the terms of the MIT License
        </p>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import FooterConfig from "./app-footer-config.vue"
 

  Vue.prototype.$dialog.component('FooterConfig', FooterConfig)



 export default  {
    
    name:"app-footer-widget",

    icon: "mdi-page-layout-footer",

    mixins:[djvueMixin, listenerMixin],

    methods:{
      //   loadAppList() {
      //   this.$portal
      //     .get('api/app/get-list')
      //     .then(response => {
      //       console.log(response)
      //     })
      // },

      // fullReload(){
      //   this.$djvue.fullReload()
      // },

      // login(){
      //   this.$djvue.login()
      // }

      // onUpdate ({data, options}) {
      //   this.template = data;
      // },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(FooterConfig, {config:widgetConfig})
      },

      // onError (error) {
      //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      // },

      // onDataSelect (emitter, data) {
      //   // console.log(JSON.stringify(data))
      //   this.template = data.filter(item => item.selected).map(item => item.entity).join(", ")
      //   // this.emit("data-select", this, data+" redirected")
      // }

    },

    
    props:["config"],

    computed:{
      options(){
        return this.config.data.embedded
      }

    },

    created(){ 
      // console.log(JSON.stringify(this.app, null, "\t"))
      // this.template = this.config.data.embedded || ""; 
    },

    mounted(){ this.$emit("init") },
    
    data: () =>({
      
      // template:""
    })

  }

</script> 
<style>
  a:hover{
    font-weight:500;
  }
</style>