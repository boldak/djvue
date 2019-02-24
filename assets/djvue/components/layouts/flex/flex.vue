<template>
  <div class="ma-3">
    
    <v-layout column>




      <v-layout v-for="(s,index) in app.currentPage.sections" column xs12 mb-3 :style="(!isProductionMode)?'border:2px dashed #dedede;':''">
        <v-layout row pb-1 style="margin-top:-1em;" v-if="!isProductionMode">
            
            <v-spacer></v-spacer>
            <div style="background: #fff;
                        margin: 0 1em 0 0;
                        display: inline-flex;
                        border: 1px solid #dedede;"
            >
            <v-btn-toggle  v-model="s.align" mandatory class="elevation-0" style="background:transparent;">
              <v-btn small flat color="primary" class="ma-0" value="justify-start">
                <v-icon small>mdi-format-align-left</v-icon>
              </v-btn>
              <v-btn small flat color="primary" class="ma-0" value="justify-center">
                <v-icon small>mdi-format-align-center</v-icon>
              </v-btn>
              <v-btn small flat color="primary" class="ma-0" value="justify-end">
                <v-icon small>mdi-format-align-right</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-divider vertical style="background:#dedede;"></v-divider>
            <v-menu bottom left>
              <v-btn small flat slot="activator" color="primary" class="ma-0"style="min-width: 1em !important;">
                <v-icon small>mdi-table-row-plus-after</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click="addSection(index,1)">
                  <v-list-tile-title>1 column</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="addSection(index,2)">
                  <v-list-tile-title>2 columns</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="addSection(index,3)">
                  <v-list-tile-title>3 columns</v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="addSection(index,4)">
                  <v-list-tile-title>4 columns</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>            
            
            <v-divider vertical style="background:#dedede;"></v-divider> 
            <v-btn small flat 
              color="primary" 
              class="ma-0" 
              style="min-width: 1em !important;" 
              @click="deleteSection(index)"
              :disabled="app.currentPage.sections.length == 1"
            >
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>  
                
        </v-layout>
        
             

          <v-layout row wrap :class="s.align" fill-height>
            
            <v-flex v-for="h in s.holders" :class="`xs${h.width}`" pa-1>
              <v-layout row pb-1 style="margin-top:-1em;" v-if="!isProductionMode">
                <v-spacer></v-spacer>
                
                <v-btn small flat 
                  color="primary" 
                  class="ma-0"
                  style="min-width: 1em !important;" 
                  @click="changeWidth(s,h,-1)"
                  :disabled="collapseWidthDisabled(s,h)" 
                >
                  <v-icon small class="mdi-rotate-45">mdi-arrow-collapse</v-icon>
                </v-btn>

                <v-btn small flat 
                  color="primary" 
                  class="ma-0" 
                  style="min-width: 1em !important;" 
                  @click="changeWidth(s,h,1)"
                  :disabled="expandWidthDisabled(s,h)"
                >
                  <v-icon small class="mdi-rotate-45">mdi-arrow-expand</v-icon>
                </v-btn>

              </v-layout>  
              
              <dj-holder :name="h.name" @init="onInitChild"></dj-holder>
            </v-flex>
          
          </v-layout>

            
      </v-layout>  
      

    </v-layout>
  </div>
</template>
<script>

import layoutMixin from "djvue/mixins/core/layout.mixin.js"

export default {
  
  components: {
    "dj-holder": () => import("djvue/components/core/holder.vue")
  },

  mixins: [layoutMixin],



 
  methods: {

    deleteSection(index){
      let section = this.app.currentPage.sections[index];
      section.holders.forEach(h => {
        this.app.currentPage.holders[h.name] = undefined;
      })
      this.app.currentPage.sections.splice(index,1)
    },

    emitResizeEvent(){
      let resizeEvent = document.createEvent('UIEvents')
      resizeEvent.initUIEvent('resize', true, false, window, 0)
      window.dispatchEvent(resizeEvent)
      this.$nextTick(() => {
        resizeEvent = document.createEvent('UIEvents')
        resizeEvent.initUIEvent('resize', true, false, window, 0)
        window.dispatchEvent(resizeEvent)
      })
    },

    addSection(sectionIndex,columns){


      let newSection = {
        align:"justify-start",
        holders:[]
      }

      for(let i=0; i < columns; i++){
        let h = {
          name:this.$djvue.randomName(),
          width: Number.parseInt(12/columns)
        }
        newSection.holders.push(h)
        this.app.currentPage.holders[h.name] = { widgets:[] }
      }

      this.app.currentPage.sections.splice(sectionIndex+1, 0, newSection)

      this.saveAppConfig()
      .then( () => { 
        this.$djvue.warning({
          type:"info",
          title:"Page will be reloaded"
        }).then( () => {
          this.fullReload()
        })

        
      })

      // this.$djvue.fullReload()

    },
   
    expandWidthDisabled(s,h){
      let sum = _.sum(s.holders.map( d => d.width))
      let max = _.max(s.holders.filter(d => d.name != h.name ).map(d=> d.width))
      return (h.width == 12) || ((sum == 12) && (max == 1))
    },

    collapseWidthDisabled(s,h){
      return h.width == 1 
    },

    changeWidth(s,h,value){
      h.width += value
      if(value > 0){
        let sum = _.sum(s.holders.map( d => d.width))
        let max = _.max(s.holders.filter(d => d.name != h.name ).map(d=> d.width))
        let h1 = _.find(s.holders.filter(d => d.name != h.name ), d => d.width == max)
        if(sum > 12) h1.width -= value
      }
      this.emitResizeEvent()
      this.setNeedSave(true)
    },
   
    onBeforeInit() {
      let h = []
      this.app.currentPage.sections.forEach( d => {
        d.holders.forEach( d1 => {
           h.push(d1.name) 
        })
      })

      this._waitList = h
    },

    
  },  
 
  watch:{
    "currentPage.sections":{
      handler(){ this.setNeedSave(true)},
      deep:true
    }
  },
 
  getPageTemplate(){
      
      return {
        layout:"flex",
        sections:[
          {
            align:"justify-start",
            holders:[
              {
                name:"default",
                width:12
              }
            ]
          }
        ],
        holders: {
          "default": {
            widgets:[]
          }
        }
      }
    }


}

</script>
