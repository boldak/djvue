<template>
  <v-layout column>
    <v-combobox
      label="Theme Palette"
      v-model="model"
      :items="themes"
      @input="onChange"
      dense
    >
      <template
        v-if="item === Object(item)"
        slot="selection"
        slot-scope="{ item, parent, selected }"
      >
            <span v-for="c in item"   :style="`margin:0; padding:0; background:${c};  width:16px; height:20px;`">
            </span> 
        
      </template>
      <template
        slot="item"
        slot-scope="{ index, item, parent }"
      >
            <v-layout row >
              <span v-for="c in item"   :style="`margin:0; padding:0; background:${c};  width:16px; height:20px;`">
              </span> 
      
            </v-layout>
      </template>
    </v-combobox>
  
  </v-layout>  

</template>

<script>
  
  import themes from "./themes.js"

  export default {
    props:["value"],
    data: () => ({
      model: {},
      // isReverse:{},
      themes: themes
    }),
    
    computed:{
      // view() {
      //   let temp;
      //   if(this.model.color){
      //    temp = JSON.parse(JSON.stringify(this.model.color))
      //    if(this.isReverse) temp.reverse()
      //   }
      //   return temp
      // }
    },
    
    created(){
      // this.isReverse = (this.value) ? this.value.isReverse : false
      this.model = this.value
    },

    methods:{
      onChange(){
        if(this.model){
          // this.model.isReverse = this.isReverse;
          this.$emit("change", this.model)  
        }
      }
    }
  }
</script>
