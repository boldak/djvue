<template>
   <v-flex xs12>
    <style> {{highlighted.css}} </style>
    <div v-html="highlighted.html"></div>
  </v-flex>  
</template>

<script>
  export default {
    
    name:"editor",

    props:["content","lang","theme"], 
    
    data: () => ({
        highlighted: null,
        highlight:null
    }),

    methods:{
    },

    created() {
      // const vm = this;
      // var lang = vm.lang;
      // var theme = vm.theme;
      this.highlight = ace.require("ace/ext/static_highlight");


      let mode = ace.require("ace/mode/"+ this.lang);
      mode = (mode) ? mode.Mode : mode;  
      let theme = ace.require("ace/theme/tomorrow");
      
      if(!mode){
          console.error("Highlighter mode: "+this.lang+" not supported")
          return
      }
      
      if(!theme){
          console.error("Highlighter theme: "+this.theme+" not supported")
      }

      let content = (this.content) ? JSON.parse(JSON.stringify(this.content)) : ""

      this.highlighted = this.highlight.renderSync(
              this.content,
              new mode(),
              theme
      );
      // console.log(this.highlighted.css)
      // console.log(this.highlighted.html)
      
      

      ace.require("ace/lib/dom").importCssString(
          this.highlighted.css
              .replace("font-size: 12px;","")
              .replace(
                  ".ace_static_highlight .ace_gutter-cell:before {",
                  ".ace_static_highlight .ace_gutter-cell:before { font-size: xx-small; padding-right: 0.5em; "
              ),
          "ace_highlight"
      );     
      
      // elm.html(highlighted.html)
      
      // var session = vm.session = editor.getSession();
      // editor.$blockScrolling = Infinity;
      // session.setMode('ace/mode/' + lang);
      // editor.setTheme('ace/theme/' + theme);
      // session.setValue(vm.content, 1);
      // session.on('change', () => {
      //    vm.$emit('change', session.getValue());
      // });
     
    },

    watch: {
      
      content: function (newContent) {
        let mode = ace.require("ace/mode/"+ this.lang);
        mode = (mode) ? mode.Mode : mode;  
        let theme = ace.require("ace/theme/tomorrow");
        
        if(!mode){
            console.error("Highlighter mode: "+this.lang+" not supported")
            return
        }
        
        if(!theme){
            console.error("Highlighter theme: "+this.theme+" not supported")
        }

        let content = (newContent) ? JSON.parse(JSON.stringify(newContent)) : ""

        this.highlighted = this.highlight.renderSync(
                content,
                new mode(),
                theme
        );
        
        ace.require("ace/lib/dom").importCssString(
            this.highlighted.css
                .replace("font-size: 12px;","")
                .replace(
                    ".ace_static_highlight .ace_gutter-cell:before {",
                    ".ace_static_highlight .ace_gutter-cell:before { font-size: xx-small; padding-right: 0.5em; "
                ),
            "ace_highlight"
        );     
      },

      // theme: function (newTheme) {
      //   const vm = this;
      //   vm.editor.setTheme('ace/theme/' + newTheme);
      // }
    }
  }

</script>

<style scoped>
  .editor {
    width: 100%;
    height: 400px;
    font-size: 16px;
  }
</style>
