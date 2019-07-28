<template>
  <v-container pa-0 style="border: 1px solid #dcdcdc;" v-if="!isProductionMode">
    <v-layout row>
      <v-flex xs11>
        <v-tabs v-model="currentScript" @input="onChangeTab" color="transparent" class="secondary--text" right>
          <v-tabs-slider color="accent"></v-tabs-slider>
          <v-tab v-for="item in tabs" :href="'#tab-' + item" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-flex>
      <v-flex xs1>
        <v-menu class="right">
          <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="showSnippets = true" :disabled="scripts.length==0" v-if="!showSnippets">
              <v-list-tile-title>
                <v-icon>mdi-arrow-expand-right</v-icon> Expand snippets
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="showSnippets = false" :disabled="scripts.length==0" v-if="showSnippets">
              <v-list-tile-title>
                <v-icon>mdi-arrow-collapse-left</v-icon> Collapse snippets
              </v-list-tile-title>
            </v-list-tile>
            <v-divider></v-divider>
            
            <v-flex>
              <v-dialog v-model="createDpsDialog" persistent max-width="50%">
                <v-list-tile @click="" slot="activator">
                  <v-list-tile-title>
                    <v-icon>mdi-plus</v-icon> Create script...
                  </v-list-tile-title>
                </v-list-tile>
                <v-card>
                  <v-toolbar dense color="secondary lighten-2" dark flat>
                    <v-icon>mdi-plus</v-icon>
                    <v-toolbar-title>Create DPS</v-toolbar-title>
                  </v-toolbar>
                  <v-flex xs12 pl-3 pr-3 justify-center>
                    <v-text-field label="Script name" v-model="newScriptName"></v-text-field>
                  </v-flex>  

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="reject">Cancel</v-btn>
                    <v-btn flat color="secondary" @click="resolve">Create</v-btn>
                  </v-card-actions>
                </v-card>


              </v-dialog>
            </v-flex>  

            <v-flex>
              <v-dialog v-model="renameDpsDialog" persistent max-width="50%">
                <v-list-tile @click="" slot="activator" :disabled="scripts.length==0">
                  <v-list-tile-title>
                    <v-icon>mdi-square-edit-outline</v-icon> Rename script...
                  </v-list-tile-title>
                </v-list-tile>
                <v-card>
                  <v-toolbar dense color="secondary lighten-2" dark flat>
                    <v-icon>mdi-square-edit-outline</v-icon>
                    <v-toolbar-title>Rename DPS {{(selected) ? selected.name : ''}} </v-toolbar-title>
                  </v-toolbar>
                  <v-flex xs12 pl-3 pr-3 justify-center>
                    <v-text-field label="New script name" v-model="newScriptName"></v-text-field>
                  </v-flex>  

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="rejectRename">Cancel</v-btn>
                    <v-btn flat color="secondary" @click="resolveRename">Rename</v-btn>
                  </v-card-actions>
                </v-card>


              </v-dialog>
            </v-flex>  
            
            
            <v-list-tile @click="runScript" :disabled="scripts.length==0">
              <v-list-tile-title>
                <v-icon>mdi-play</v-icon> Run script
              </v-list-tile-title>
            </v-list-tile>

            <v-flex :disabled="scripts.length==0">
              <v-dialog v-model="selectFileDialog" persistent max-width="50%">
                <v-list-tile @click="" slot="activator">
                  <v-list-tile-title>
                    <v-icon>mdi-animation-play-outline</v-icon> Run script with upload...
                  </v-list-tile-title>
                </v-list-tile>
                <v-card>
                  <v-toolbar dense color="secondary lighten-2" dark flat>
                    <v-icon>mdi-animation-play-outline</v-icon>
                    <v-toolbar-title>Select File</v-toolbar-title>
                  </v-toolbar>
                  <v-flex xs12 pl-3 pr-3 justify-center>
                    <input type="file" label="file" v-on:change="fileChanged"/>
                  </v-flex>  

                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="secondary" @click="rejectFile">Cancel</v-btn>
                    <v-btn flat color="secondary" @click="resolveFile" :disabled="!file">Upload and Run</v-btn>
                  </v-card-actions>
                </v-card>


              </v-dialog>
            </v-flex>  
            
            <v-divider></v-divider>


            <v-list-tile @click="deleteScript" :disabled="scripts.length==0">
              <v-list-tile-title>
                <v-icon>mdi-trash-can-outline</v-icon> Delete script
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-layout>
    
    <v-divider></v-divider>
    
    <v-layout row v-if="scripts.length == 0" justify-center>
      <h3 class="secondary--text"> NO DPS AVAILABLE </h3>
    </v-layout>
      
    <v-layout row>
      <v-flex v-if="showSnippets" style="height:400px; overflow:auto">
        <v-toolbar dark flat color="primary" height=36>
          <v-btn icon @click="showSnippets = false">
            <v-icon small>mdi-arrow-collapse-left</v-icon>
          </v-btn>
          <v-toolbar-title class="subheading white--text"> Snippets </v-toolbar-title>
        </v-toolbar>
        </v-toolbar>
        <snippet-tree :editor="editor"></snippet-tree>

      </v-flex>
      <v-divider vertical v-if="showSnippets"></v-divider>
      <v-flex v-bind:class="{ 'xs9':showSnippets, 'pa-0':showSnippets, 'xs12':!showSnippets}">
        <v-tabs-items v-model="currentScript">
          <v-tab-item v-for="item in tabs" :value="'tab-' + item" :key="item">
            <v-card flat>
              <editor 
                v-show="selected" 
                :content="selected.script" 
                lang="dps" 
                :sync="true" 
                @change="onUpdateScript"
                @mount = "setEditor"
              >
              </editor>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-system-bar status>
      <v-progress-circular indeterminate color="secondary lighten-4" v-if="process" size=18></v-progress-circular>
      <v-icon v-else-if="success" color="success" size=18>mdi-sync</v-icon>
      <v-icon v-else-if="!success" color="error" size=18>mdi-sync-off</v-icon>
      {{app.config.dpsURL}}
      <v-spacer></v-spacer>
      <div class="secondary white--text pr-2 pl-2">{{lang}}</div>
    </v-system-bar>
    <v-divider v-if="dpsResult"></v-divider>
    <v-layout row v-if="dpsResult" style="max-height:35em; overflow:auto;">
      <v-flex v-if="success">
        <highlight :content="result" :lang="lang">
        </highlight>
      </v-flex>
      <pre class="error--text pl-2" v-else>
        {{result.message}}
      </pre>  
    </v-layout>
    
  </v-container>
</template>

<script>

import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
import listenerMixin from "djvue/mixins/core/listener.mixin.js";

import editor from 'djvue/components/core/ext/ace-editor.vue';
import highlight from 'djvue/components/core/ext/ace-highlight.vue';
import SnippetTree from "./dps-snippets-tree.vue"

export default {

  name: "dps-suite-widget",

  icon: "mdi-card-text-outline",

  mixins: [djvueMixin, listenerMixin],

  components: { 
    "snippet-tree": SnippetTree,
    editor, 
    highlight 
  },

  methods: {

    setEditor(editor){
      this.editor = editor;
    },

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

    rejectFile(){
      this.selectFileDialog = false
    },

    resolveFile(){
      this.process = true;
      this.dpsResult = null;
      this.selectFileDialog = false;
      this.$dps.run({
          script: this.selected.script,
          state:{},
          file:this.file
        })
        .then(res => {
          this.process = false;
          this.success = true
          this.dpsResult = res.data;
        })
        .catch(e => {
          this.process = false;
          this.success = false;
          this.dpsResult = {message: e.toString()}
        })
    },

    onUpdateScript(value) {
      this.selected.script = value
      this.setNeedSave(true)
    },

    checkDpsURL() {
      this.process = true;
      this.$http.get(this.app.config.dpsURL)
        .then(() => {
          this.process = false;
          this.success = true;
        })
        .catch(() => {
          this.process = false;
          this.success = false;
          this.dpsResult= {message: "Data processing server not available."}
        })
    },

    runScript() {
      this.process = true;
      this.dpsResult = null;
      this.$dps.run({
          script: this.selected.script
        })
        .then(res => {
          this.process = false;
          this.success = true;
          this.dpsResult = res
        })
        .catch(e => {
          this.process = false;
          this.success = false;
          this.dpsResult = {message: e.toString()}
        })
    },

    onChangeTab(href){
      this.selected = _.find(this.scripts, s => s.name ==href.substring(4))
      this.dpsResult = null
    },

    deleteScript(){
      this.$djvue.confirm({
        type:"warning",
        text:`Delete dps ${this.selected.name}`,
        rejectText:"Cancel",
        resolveText:"Delete"
      })
      .then(() => {
        let index = _.findIndex(this.scripts, s => s.name == this.selected.name)
        let selectedIndex = (this.scripts.length == 1) 
          ? -1 
          : (index==(this.scripts.length-1)) 
              ? this.scripts.length-2
              : index;

        this.scripts.splice(index,1)
        this.selected = this.scripts[selectedIndex]      
        this.currentScript = "tab-"+this.selected.name
        this.setNeedSave(true)
      })
    },

    reject(){
      this.createDpsDialog = false
    },

    rejectRename(){
      this.renameDpsDialog = false
    },

    validateScriptName(name){
      if( !name || name=="" ) return false;
      return _.findIndex(this.scripts, s => s.name == name) == -1
    },

    resolve(){
      if(this.validateScriptName(this.newScriptName)){
        this.createDpsDialog = false
        this.scripts.push({
          name: this.newScriptName,
          script:
`
/**
 **
 **     DATA PROCESSING SCRIPT: ${this.newScriptName}
 **     SERVICE: ${this.app.config.dpsURL}
 **
 **/
`
        })

        this.selected = _.findIndex(this.scripts, s => s.name == this.newScriptName)
        this.currentScript = "tab-"+this.newScriptName
        this.newScriptName = null
        this.setNeedSave(true)
        
      } else {
        this.$djvue.warning({
          type:"error",
          title:"Cannot create dps",
          text:"Script name is empty or doublicates detected."
        })
      }
      
    },

    resolveRename(){
      if(this.validateScriptName(this.newScriptName)){
        this.renameDpsDialog = false
        this.selected.name = this.newScriptName
        this.currentScript = "tab-"+this.newScriptName
        this.newScriptName = null
        this.setNeedSave(true)
        
      } else {
        this.$djvue.warning({
          type:"error",
          title:"Cannot rename dps",
          text:"Script name is empty or doublicates detected."
        })
      }
      
    }        




    // onUpdate ({data, options}) {
    //   this.template = data;
    // },

    // onReconfigure (widgetConfig) {
    //  return this.$dialog.showAndWait(HtmlConfig, {config:widgetConfig})
    // },

    // onError (error) {
    //   this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
    // },

    // onDataSelect (emitter, data) {
    //   // console.log(JSON.stringify(data))
    //   this.template = data.selection.filter(item => item.selected).map(item => item.entity).join(", ")
    //   // this.emit("data-select", this, data+" redirected")
    // } 

  },


  props: ["config"],

  computed: {
    tabs() {
      return this.scripts.map(s => s.name)
    },

    result() {

       let supportedMode = {
            text:           "text", 
            string:         "text", 
            xml:            "xml", 
            csv:            "csv", 
            javascript:     "javascript", 
            json:           "json",
            object:         "json",
            "function":     "json", 
            dps:            "dps",
            dataset:        "json",
            error:          "json",
            table:          "json",
            help:           "json",
            html:           "html", 
            json:           "json", 
            error:          "json",
            bar:            "json",
            hbar:           "json",
            line:           "json",
            area:           "json",
            scatter:        "json",
            radar:          "json",
            deps:           "json",
            pie:            "json"    
        }

      let mode = supportedMode[this.dpsResult.type]
      let content;
      if( mode ){
        if(mode == "json"){
          content = (this.dpsResult.data) ? JSON.stringify(this.dpsResult.data, null, "\t") : JSON.stringify(this.dpsResult)
        } else {
          // console.log(this.dpsResult)
          content = (this.dpsResult.data) ? this.dpsResult.data : this.dpsResult
        }
      } else {
        mode = "json"
        content = JSON.stringify(this.dpsResult, null, "\t")
      }

      if(this.dpsResult.type=="error"){
        this.success = false
        content = (this.dpsResult.message) ? this.dpsResult : this.dpsResult.data
      }

      this.lang = mode;
      return content
    }  
  },

  created() {
    // console.log(this.config.scripts)
    this.scripts = this.config.scripts;
    if (this.scripts.length>0) this.selected = this.scripts[0]
    this.checkDpsURL()
  },

  mounted() { this.$emit("init") },

  data: () => ({
    scripts: [],
    selected: null,
    currentScript: null,
    process: false,
    success: false,
    showSnippets: false,
    dpsResult: null,
    createDpsDialog:false,
    renameDpsDialog:false,
    selectFileDialog: false,
    newScriptName:null,
    lang:"json",
    file:null,
    editor:null
  })

}

</script>
