<template>
  <div class="ma-3">
    <v-layout column>
      
      <v-layout row wrap :class="topAlign" fill-height mb-3>
        <v-flex :class="topClass" pa-1 style="border:2px dashed #dedede;">
          <v-layout row pb-1>
              <v-spacer></v-spacer>
              <v-btn icon small flat color="primary" class="ma-0" @click="topSize += (topSize == 12) ? 0 : 1">
                <v-icon small>mdi-arrow-expand-horizontal</v-icon>
              </v-btn>
              <v-btn icon small flat color="primary" class="ma-0" @click="topSize += (topSize == 1) ? 0 : -1">
                <v-icon small>mdi-arrow-collapse-horizontal</v-icon>
              </v-btn>
              <v-btn icon small flat color="primary" class="ma-0" @click="topAlign = 'justify-start'">
                <v-icon small>mdi-format-align-left</v-icon>
              </v-btn>
              <v-btn icon small flat color="primary" class="ma-0" @click="topAlign = 'justify-center'">
                <v-icon small>mdi-format-align-center</v-icon>
              </v-btn>
              <v-btn icon small flat color="primary" class="ma-0" @click="topAlign = 'justify-end'">
                <v-icon small>mdi-format-align-right</v-icon>
              </v-btn>    
          </v-layout>
          <dj-holder name="Top" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
      
      <v-layout row wrap>  
        <v-flex class="xs4" pa-1>
          <dj-holder name="Column 1" @init="onInitChild"></dj-holder>
        </v-flex>
        <v-flex class="xs4" pa-1>
          <dj-holder name="Column 2" @init="onInitChild"></dj-holder>
        </v-flex>
        <v-flex class="xs4" pa-1>
          <dj-holder name="Column 3" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
      <v-layout row wrap>  
        <v-flex class="xs12" pa-1>
          <dj-holder name="Bottom" @init="onInitChild"></dj-holder>
        </v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>
<script>
import mixin from "djvue/mixins/core/layout.mixin.js"

export default {
  components: {
    "dj-holder": () => import("djvue/components/core/holder.vue")
  },

  mixins: [mixin],

  computed:{
    topClass(){
      return `xs${this.topSize}`
    },
    topAlign(){
      return `${this.topAlign}`
    }
  },

  methods: {

    onBeforeInit() {
      this._waitList = ["Top", "Column 1", "Column 2", "Column 3", "Bottom"]
    }
  },

  data:() => ({
    topSize:6,
    topAlign:"justify-center"
  })

}

</script>
