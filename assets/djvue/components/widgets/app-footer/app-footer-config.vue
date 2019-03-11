<template>
    <config-dialog 
      :icon="config.icon"
      :title="`app-topbar-widget: ${config.id} ${config.name}`"
      :resolve="resolve"
      :reject="reject"
      :config="config"
      :editorTree="editorTree"
    ></config-dialog>  
 </template> 




<script>
import components from "./parts/index.js";
import mixin from "djvue/mixins/core/configDialog.mixin.js"



export default {
	
  name: "HtmlConfig",
  
  components:{ "config-dialog": Vue.createConfigDialog(components)},

  mixins:[mixin],
  
	props:["config"],

	
  data () {
      return {
        editorTree:[
          {
            name: "Configuration",
            children: [
              {
                name: 'Widget',
                editor:"name-editor"
              },
              {
                name: "Options",
                editor:"options-editor"
              }
            ]
          }
        ],
      }
    }
}

</script>