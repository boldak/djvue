<template>
  <v-card>
    <v-toolbar dark color="primary darken-2">
      <v-icon large>mdi-download</v-icon>
      <v-toolbar-title>Import App</v-toolbar-title>
    </v-toolbar>
    <v-container>
      
      <v-layout row align-center>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
             <v-text-field label="App name" v-model="name"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row align-center>
        <v-flex xs1 pl-3 pr-3 justify-center>
        </v-flex>
        <v-flex xs11 pl-3 pr-3 justify-center>
            <input type="file" label="file" v-on:change="fileChanged"/>
        </v-flex>
      </v-layout>


    </v-container>  
    

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="reject">Cancel</v-btn>
      <v-btn flat color="primary" @click="resolve">Import</v-btn>
    </v-card-actions>

  </v-card>
</template>
<script>
import djvueMixin from "djvue/mixins/core/djvue.mixin.js"
import extIcon from "modules/ext-icons/index.js"

export default {

  name: "ImportAppDialog",

  mixins: [djvueMixin],

  props:["appList"],

  data: () => ({

    name:null,
    file:null

  }),

  methods: {

    
    fileChanged(e) {
      if (e) {
          if (e.target.files) {
            if (!this.multiple && e.target.files[0]) {
              this.file = e.target.files[0];
            } else if (this.multiple) {
              this.file = e.target.files
            } else {
              this.file = null
            }
          } else {
            this.file = null
          }
      }

    },

    isValid(){
      
      if(!this.name){
        this.$djvue.warning({
          type:"error",
          title:"Cannot import app",
          text:"Empty app name detected"
        })
        return false
      }

      if(_.findIndex(this.appList, a => a.name.toUpperCase() == this.name.toUpperCase())>=0){
        this.$djvue.warning({
          type:"error",
          title:"Cannot import app",
          text:"App name doublicates detected"
        })
        return false
      }

      if(!this.file){
        this.$djvue.warning({
          type:"error",
          title:"Cannot import app",
          text:"Configuration file not selected"
        })
        return false
      }

      return true
   
    },

    reject() {
      this.$emit('submit', null)
    },

    resolve() {
      if(this.isValid()){
        this.$emit('submit', {name:this.name, file:this.file})  
      }
    }

  },

  created() {
    // this.getResources()
  }

}

</script>
