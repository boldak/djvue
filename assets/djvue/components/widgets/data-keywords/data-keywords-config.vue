<template>
    <config-dialog 
      :icon="config.icon"
      :title="`data-keywords-widget: ${config.id} ${config.name}`"
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
	
  name: "DataKeywordsConfig",
  
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
                name: "Data",
                editor:"source-editor"
              }
            ]
          }
        ],
      }
    }
}

</script>