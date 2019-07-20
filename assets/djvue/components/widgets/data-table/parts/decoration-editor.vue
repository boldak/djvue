<template>
	<v-layout column wrap pa-2>

          <v-switch
            label="Use colors"
            v-model="config.options.useColors"
            color="primary"
            @change="onchangeColorSettings"
          ></v-switch>

          <v-combobox
            v-if="showColorSettings"
            v-model="config.options.colorMode"
            :items="['row', 'column', 'table']"
            label="Use colors for"
          ></v-combobox>

          <v-flex xs12 md8 v-if="showColorSettings">
            <palette-picker :value = "config.options.palette" @change="onChangePalette"></palette-picker>
          </v-flex>
          
          <v-combobox
            v-if="showColorSettings"
            v-model="config.options.headerTextOrientation"
            :items="['horizontal', 'vertical']"
            label="Header Text Orientation"
          ></v-combobox>



     </v-layout>      
</template>	

<script>
import palettePicker from "djvue/components/core/ext/palette-picker.vue"
	export default {
		
    name:"name-editor",
		
    props:["config"],
    
    data:()=> ({
      showColorSettings: false
    }),

    methods:{
      onChangePalette(value){
        this.config.options.palette = value
      },
      onchangeColorSettings(value){
        this.showColorSettings = value
      }
    },

    components:{
      "palette-picker": palettePicker
    },

    created(){
      this.showColorSettings =  this.config.options.useColors
      this.config.options.headerTextOrientation = this.config.options.headerTextOrientation || "horizontal" 
    }
	}
</script>