<template>
   <v-card>

      <v-toolbar card dense dark flat color="secondary lighten-2">
          <v-icon large>mdi-animation-play-outline</v-icon>
          <v-toolbar-title>{{options.title}}</v-toolbar-title>
      </v-toolbar>

      <v-flex xs12 pl-3 pr-3 justify-center>
        <input type="file" label="file" v-on:change="fileChanged"/>
      </v-flex>  
      
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="secondary" @click="reject">Cancel</v-btn>
        <v-btn flat color="secondary" @click="resolve" :disabled="!file">Upload and Run</v-btn>
      </v-card-actions>
      
      </v-card>
</template>

<script>
 import layout from "./simpleDialogLayout.vue";

  export default {
    
    name:"selectFileDialog",

    props:["options"],
    
    data: () => ({
      file: null,
      multiple: false
    }),

    methods:{
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

      resolve(){
        this.$emit('submit', this.file)
      },

      reject(){
        this.$emit('submit', null)
      }  
    },

    layout: layout

    


  }
</script>