<template>
  <div>
    <v-layout column wrap pt-2>
      <v-toolbar flat color="transparent" dense>
        <v-btn fab dark icon absolute bottom left small color="primary" @click="reverseSelection()">
          <v-icon>mdi-check-outline</v-icon>
        </v-btn>
        <v-btn fab dark small icon absolute bottom left color="primary" @click="addItem()" :disabled="!newItemTitle" class="ml-5">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-btn fab dark icon absolute bottom right small color="primary" @click="deleteItems" :disabled="selection.length == 0">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-container mt-2>
        <draggable class="list-group" element="div" v-model="items" :options="dragOptions" :move="onMove" @start="onStartDrag" @end="onEndDrag">
          <transition-group type="transition" :name="title" tag="div">
            <v-layout row v-for="item in items" :key="item.id" class="list-group-item" style="padding-bottom:0.5em; border-bottom:1px solid #e0e0e0;">
              <v-flex xs1 style="margin:auto;">
                <v-layout row>
                  <v-icon class="handle">more_vert</v-icon>
                  <v-checkbox secondary hide-details v-model="item.selected" style="margin:0; padding:0;" @change="select()"></v-checkbox>
                </v-layout>
              </v-flex>
              <v-flex style="margin:auto;" xs11>
                <v-text-field v-model="item.title" @change="onChange()" hide-details height="2em" style="margin:0; padding:0;" class="pl-4"></v-text-field>
              </v-flex>
            </v-layout>
          </transition-group>
        </draggable>
      </v-container>
    </v-layout>
    <v-text-field v-model="newItemTitle" :label="`New ${title}`" @keyup.enter="addItem" :disabled="items.length >= (this.maxLength || 10)">
    </v-text-field>
  </div>
</template>

<script>

	import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  	import draggable from "modules/vue-draggable/vuedraggableES6.js";

  	export default {

  		mixins:[djvueMixin],
		
		props:["list", "title", "maxLength"],

		components:{
			draggable
		},

		computed:{
			
			dragOptions() {
		    	return {
			        animation: 150,
			        group: {
			          name: this.title
			        },
			        ghostClass: "ghost",
			        dragClass: "drag",
			        handle: ".handle"
		      	}
		    }

		},

		methods:{

			onStartDrag() {
		      this.isDragging = true
		    },

		    onEndDrag() {
		      this.isDragging = false
		      this.$emit("update", this.items)
		    },

		    onMove({ relatedContext, draggedContext }) {
		      return true
		    },

		    addItem(){
		    	if(this.items.length >= (this.maxLength || 10)) return;
		    	let newItem = {
		    		id: this.$djvue.randomName(),
		    		title: this.newItemTitle
		    	}

		    	this.items = this.items || []
		    	this.items.push(newItem)
		    	this.newItemTitle = null	
		    	this.$emit("update", this.items)
		    },

		    select(){
		    	this.selection = (this.items) ? this.items.filter( n => n.selected) : []
		    },

		    reverseSelection(){
		    	this.items.forEach( n => {
		    		n.selected = !n.selected
		    	})
		    	this.select()	
		    },

		    deleteItems(){
		    	this.selection.forEach( s => {
		    		let index = _.findIndex(this.items, n => n.id == s.id)
		    		if( index >= 0 ){
		    			this.items.splice(index,1)
		    		}
		    	})
		    	this.selection = []
		    	this.$emit("update", this.items)
		    },

		    onChange(){
		    	this.$emit("update", this.items)	
		    }
  		},

  		data:() => ({
  			newItemTitle: null,
			selection:[],
			items:null
  		}),

  		created(){
  			this.items = this.list || []
  			this.selection = []
  		}
  	}	


</script>

<style scoped>

.drag {
  opacity: 0.3;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0 !important;
}

.list-group {
  /*min-height: 20px;*/
}

.list-group-item {}

.list-group-item i {}


</style>
