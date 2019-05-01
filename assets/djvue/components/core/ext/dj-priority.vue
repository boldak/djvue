<template>
  <div>
      <v-container mt-2 v-if="items">
        <draggable class="list-group" element="div" v-model="items" :options="dragOptions" :move="onMove" @start="onStartDrag" @end="onEndDrag">
          <transition-group type="transition" :name="title" tag="div">
            <v-layout row v-for="item, index in items" :key="item.id" class="list-group-item" style="padding-bottom:0.5em;">
            	<v-flex xs12 style="margin:auto;"  class="handle subheading">
                  	<span v-if="item.priority" class="accent white--text font-weight-black pl-1 pr-1">{{item.priority}}</span> 
                    <span v-else><v-icon class="warning--text">mdi-help-circle-outline</v-icon></span> 
                    {{item.title}}
              	</v-flex>
            </v-layout>
          </transition-group>
        </draggable>
      </v-container>
  </div>
</template>

<script>

	import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  	import draggable from "modules/vue-draggable/vuedraggableES6.js";

  	export default {

  		mixins:[djvueMixin],
		
		props:["list"],

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
		      this.items = this.items.map( (item,index) => {
		      	item.priority = index + 1;
		      	return item
		      })

		      this.$emit("update", this.items)
		    },

		    onMove({ relatedContext, draggedContext }) {
		      return true
		    }
  		},

  		data:() => ({
  			items:null,
  			title:null
  		}),

  		watch:{
  			list(value){
  				if(!value) return
  				this.items = _.orderBy(JSON.parse(JSON.stringify(value)), "priority")
  			}
  		},


  		created(){
  			if(this.list) this.items = _.orderBy(JSON.parse(JSON.stringify(this.list)), "priority")
  			this.title = this.$djvue.randomName()
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
