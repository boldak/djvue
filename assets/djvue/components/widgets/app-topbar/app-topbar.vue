<template>
 
   <v-toolbar v-if="options" dark dence flat color="primary darken-1" class="mt-0 mb-2 py-0" style="padding-top: 1em; font-weight:300;">
      <div class="headline font-weight-light">
        {{options.title}}
      </div>  
      <v-spacer></v-spacer>
      <div v-for="page in options.references">
        <router-link  v-if="page.id"  :to="`/${page.id || ''}`" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
            {{page.title}}
        </router-link>
        <a  v-if="page.url" :href="page.url" :target="page.target" class="white--text" style="text-decoration: none; padding: 0 0.5em;">
            {{page.title}}
        </a>
      </div>  
      
        <!-- <v-btn icon v-on:click="loadAppList()">
          <v-icon>apps</v-icon>
        </v-btn>

        <v-btn icon v-on:click="fullReload()">
          <v-icon>refresh</v-icon>
        </v-btn> -->
        <v-divider vertical v-if="options.login || options.locale || options.user"></v-divider>

        <v-tooltip bottom v-if="!app.user.isLoggedIn && options.login">
          <v-btn icon v-on:click="login()" slot="activator">
            <v-icon>mdi-google-plus</v-icon>
          </v-btn>
          <span>Login with Google</span>
        </v-tooltip>

        <v-menu offset-y v-if="options.locale">
          <v-btn 
            slot="activator"
            icon
          >
            <img :src="'img/'+$i18n.locale+'.png'" small>
          </v-btn>
          <v-list>
            <v-list-tile
              key="uk"
              @click="setLocale('uk')"
            >
              <img :src="'img/uk.png'" small>
            </v-list-tile>
            <v-list-tile
              key="en"
              @click="setLocale('en')"
            >
              <img :src="'img/en.png'" small>
            </v-list-tile>

          </v-list>
        </v-menu>

        <v-tooltip bottom v-if="app.user.isLoggedIn && options.user">
          <v-avatar size="32" class="ml-2" slot="activator" style="border: 1px solid rgba(255, 255, 255, 0.3);">
            <dj-img :src="app.user.photo" icon="mdi-account"></dj-img>
          </v-avatar>
          <span>{{app.user.name}}</span>
        </v-tooltip>  

      </v-toolbar>

</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import TopBarConfig from "./app-topbar-config.vue"
  // import snippets from "./snippets.js"


  Vue.prototype.$dialog.component('TopBarConfig', TopBarConfig)



 export default  {
    
    name:"app-topbar-widget",

    icon: "mdi-page-layout-header",

    mixins:[djvueMixin, listenerMixin],

   

    methods:{
        loadAppList() {
        this.$portal
          .get('api/app/get-list')
          .then(response => {
            // console.log(response)
          })
      },

      fullReload(){
        this.$djvue.fullReload()
      },

      login(){
        this.$djvue.login()
      },

      // onUpdate ({data, options}) {
      //   this.template = data;
      // },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(TopBarConfig, {config:widgetConfig})
      }

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