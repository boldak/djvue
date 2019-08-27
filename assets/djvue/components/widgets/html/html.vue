<template>
   
    <div v-html="html"></div>
    
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  // import HtmlConfig from "./html-config.vue";
  // import _latex from "commonjs!modules/asciimath-to-latex/index.js"
  import _katex from "commonjs!modules/katex/dist/katex.min.js"
  import asciimath2latex from "commonjs!modules/asciimath-to-latex/index.js" 
  // import "commonjs!modules/katex/dist/katex.min.css"
  // import snippets from "./snippets.js"
  

  // Vue.prototype.$dialog.component('HtmlConfig', HtmlConfig)

   var  HtmlConfig;
  let _mode = Cookie.get( __application_Mode_Key ) || "production"
  if(_mode == "development"){
    // if(!Vue.prototype.$dialog._components["ChartConfigDialog"]){
      import("djvue/components/widgets/html/html-config.vue")
        .then( res => {
          HtmlConfig = res.default
          Vue.prototype.$dialog.component('HtmlConfig', HtmlConfig)
      })
    // } else {
    //   ChartConfigDialog = Vue.prototype.$dialog._components["ChartConfigDialog"]
    // }      
  }


  let compile = (template,context) => {
     _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    let result = _.template(template)(context)

    _.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;

    return result
    
  }

  const mathBlock = (code) => {
    let tex = ''
    code.split(/(?:\n\s*){2,}/).forEach((line) => { // consecutive new lines means a new formula
      try {
       tex += _katex.renderToString(line.trim())
      } catch (err) {
        tex += `<pre>${err}</pre>`
      }
    })
    // return `<div>${tex}</div>`
    return tex
  }


  

 export default  {
    
    name:"html-widget",

    icon: "mdi-language-html5",

    mixins:[djvueMixin, listenerMixin],

    methods:{

      $asciiMath (formula){
        formula = formula.split(/(?:\n\s*){2,}/).map((item) => { return asciimath2latex(item) }).join('\n\n')
        return mathBlock(formula)
      },

      $latex ( formula ){
        // formula = formula.split(/(?:\n\s*){2,}/).map((item) => { return asciimath2latex(item) }).join('\n\n')
        return mathBlock(formula)
        // return _katex.renderToString(_ascii2latex(formula))
      },

      $f (formula){
        return this.$asciiMath(formula)
      },

      onUpdate ({data, options}) {
       this.template = data;
      },

      onReconfigure (widgetConfig) {
       return this.$dialog.showAndWait(HtmlConfig, {config:widgetConfig})
      },

      onClear(){
        this.onUpdate({
          data: "<div></div>"
        })
      },

      onError (error) {
        this.template = `<div style="color:red; font-weight:bold;">${error.toString()}</div>`;
      },

      onDataSelect (emitter, data) {
        // console.log(JSON.stringify(data))
        this.template = data.selection.filter(item => item.selected).map(item => item.entity).join(", ")
        // this.emit("data-select", this, data+" redirected")
      } 

    },

    
    props:["config"],

    computed:{
      html(){

         try {
          return compile(this.template, this);  
        } catch(e) {
          this.$djvue.warning({
                      type:"error",
                      title:"Cannot compile template",
                      text:e.toString()
                    })
        }
      }

    },

    created(){ this.template = this.config.data.embedded || ""; },

    mounted(){ this.$emit("init") },
    
    data: () =>({
      template:""
    })

  }

</script>	
<style>
  span.mord.accent {
    background: transparent !important;
  }
</style>