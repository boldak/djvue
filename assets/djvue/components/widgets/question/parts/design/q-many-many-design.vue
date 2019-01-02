<template>
	<div>
		<div v-if="!options" class="text-xs-center">
	        <v-progress-circular
	          indeterminate
	          color="secondary ligten-2"
	        ></v-progress-circular>
	    </div>  
		
		<v-tabs v-else
            v-model="active"
            color="transparent"
          >
            <v-tab key="general" ripple>General</v-tab>
            <v-tab key="alt" ripple>Alternatives</v-tab>
            <v-tab key="rules" ripple>Rules</v-tab>
            <v-tab key="statistic" ripple>Statistic</v-tab>
            
            
            <v-tab-item key="general" ripple>
            	<v-card flat>
            		<v-container>
            			<h3 class="headline">Many of many selection</h3>
	            		<v-switch
	            		  :hint="(options.required) ? 'All constraints will be checked' : 'Response validation will be disabled'"
	            		  persistent-hint
					      label="Required"
					      v-model="options.required"
					      @change="$emit('update:options',options)"
					    ></v-switch>
					    <v-divider></v-divider>
					    
					    <v-textarea v-model="options.title" label="Question"></v-textarea>
					    <v-textarea v-model="options.note" label="Note"></v-textarea>
					    
					    
					</v-container>    
            	</v-card>	
            </v-tab-item>

            <v-tab-item key="alt" ripple>
            	<v-card flat>
            		<v-container>
            			<v-switch
	            		  :hint="(options.addEnabled) ? 'Respondent can add new variants' : ''"
	            		  persistent-hint
					      label="Custom response"
					      v-model="options.addEnabled"
					      @change="$emit('update:options',options)"
					    ></v-switch>
					    <v-divider></v-divider>
					    <v-switch
					    	v-if="options.addEnabled"
	            		  :hint="(options.showUserInfo) ? 'Show info about respondents' : ''"
	            		  persistent-hint
					      label="Show respondent info"
					      v-model="options.showUserInfo"
					      @change="$emit('update:options',options)"
					    ></v-switch>
					    <v-divider v-if="options.addEnabled"></v-divider>
					    <v-switch
					    	v-if="options.addEnabled"
	            		  :hint="(options.userCollaboration) ? 'Respondents will collaborate' : 'Respondents will be isolated'"
	            		  persistent-hint
					      label="Users collaboration"
					      v-model="options.userCollaboration"
					      @change="$emit('update:options',options)"
					    ></v-switch>
					    <v-divider v-if="options.addEnabled"></v-divider>


					    <v-layout column wrap pt-2>

					    	<v-toolbar flat color="transparent" dense>
      
						       <v-btn fab dark icon absolute bottom left small color="primary" @click="reverseSelection()">
						          <v-icon>mdi-check-outline</v-icon>
						       </v-btn>

						       <v-btn fab dark small icon absolute bottom left color="primary" @click="addAlternative()" :disabled="!newAltTitle" class="ml-5">
								  <v-icon dark>mdi-plus</v-icon>
							   </v-btn>
						        
						      <v-btn fab dark icon absolute bottom right small color="primary" @click="deleteItems" :disabled="selection.length == 0">
						        <v-icon>mdi-trash-can-outline</v-icon>
						      </v-btn>

						    </v-toolbar> 
						    <v-divider></v-divider>

						  <v-container mt-2>  
						      <draggable class="list-group" element="div" v-model="options.nominals" :options="dragOptions" :move="onMove" @start="onStartDrag" @end="onEndDrag">
						        <transition-group type="transition" name="alts" tag="div">
						        	<v-layout row v-for="alt in options.nominals" :key="alt.id" class="list-group-item" style="padding-bottom:0.5em; border-bottom:1px solid #e0e0e0;">
						        		
						        		<v-flex xs1 style="margin:auto;">
						        			<v-layout row>
							        			<v-icon class="handle">more_vert</v-icon>
							        			<v-checkbox secondary hide-details v-model="alt.selected" style="margin:0; padding:0;" @change="select()"></v-checkbox>
						        			</v-layout>
						        		</v-flex>
						        		<v-flex style="margin:auto;">
						        			<v-text-field v-model="alt.title" @change="onChange()" hide-details height="2em" style="margin:0; padding:0;"></v-text-field>
						        		</v-flex>
						        		<v-flex xs1 style="margin:auto;" v-if="options.showUserInfo">
						        			<v-layout v-if="alt.user" column>
						        				<v-tooltip top>
						        					<v-avatar slot="activator">
							        					<dj-img  
							        						:src="alt.user.photo" 
							        						:icon="(alt.user.icon)?alt.user.icon : 'mdi-account'"  
							        						style="margin:auto;"
							        					></dj-img>
						        					</v-avatar>
						        					<span>{{alt.user.name}}</span>
						        				</v-tooltip>	
					        				</v-layout>
						        		</v-flex>
						        		
						        			
						        	</v-layout>	
						          
						        </transition-group>
						      </draggable>
						   </v-container>   
					    </v-layout>
					    		
					    <v-text-field v-model="newAltTitle" label="New alternative" @keyup.enter="addAlternative"></v-text-field>
					    
											    
            		</v-container>	
            	</v-card>
            </v-tab-item>
            <v-tab-item key="rules" ripple>
            	<v-card flat>
            		<v-container>
            			<v-input label="Min" persistent-hint hint="Min alternatives shuld be selected">
            				<div style="padding: 0 0 0 1em;">
            					<input 
            						type="number" 
            						style="border: 1px solid #e0e0e0;" 
            						v-model="options.rule.min"
            						min=0
            						:max="options.rule.max"
            						@input="$emit('update:options', options)"
            					></input>
            				</div>	
            			</v-input>
            			<v-divider></v-divider>
            			<v-input class="mt-2" label="Max" persistent-hint hint="Max alternatives may be selected">
            				<div style="padding: 0 0 0 1em;">
            					<input 
            						type="number" 
            						style="border: 1px solid #e0e0e0;" 
            						v-model="options.rule.max"
            						:min="options.rule.min"
            						:max="options.nominals.length"
            						@input="$emit('update:options', options)"
            					></input>
            				</div>	
            			</v-input>
            			<v-divider></v-divider>
            			
            		</v-container>
            	</v-card>
            </v-tab-item>

            <v-tab-item key="statistic" ripple>
            	<v-card flat>
            		<v-container>
            			<v-switch
	            		  :hint="(options.showResponsesStat) ? 'Show statistical distribution in production mode' : ''"
	            		  persistent-hint
					      label="Statistical hints"
					      v-model="options.showResponsesStat"
					      @change="$emit('update:options',options)"
					    ></v-switch>
					    <v-divider></v-divider>
            			<echart :options="statOptions" :height="height"></echart>
            		</v-container>
            	</v-card>		
            </v-tab-item>	
        
        </v-tabs>    
		<!-- <pre>
	    	{{JSON.stringify(stat,null,"\t")}}
	    </pre>	 -->
	</div>	
</template>


<script>
  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import draggable from "modules/vue-draggable/vuedraggableES6.js";
  import statMixin from "../mixins/statistic.mixin.js"
	
	export default {

		mixins:[djvueMixin, listenerMixin, statMixin],
		
		props:["config", "options", "stat"],

		components:{
			draggable
		},

		computed:{
			
			dragOptions() {
		    	return {
			        animation: 150,
			        group: {
			          name: "alts"
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
		      this.$emit("update:options", this.options)
		    },

		    onMove({ relatedContext, draggedContext }) {
		      return true
		    },

		    addAlternative(){
		    	let newAlt = {
		    		id: this.$djvue.randomName(),
		    		title: this.newAltTitle
		    	}

		    	this.options.nominals = this.options.nominals || []
		    	this.options.nominals.push(newAlt)
		    	this.newAltTitle = null	
		    	this.$emit("update:options", this.options)
		    },

		    select(){
		    	this.selection = (this.options.nominals) ? this.options.nominals.filter( n => n.selected) : []
		    },

		    reverseSelection(){
		    	this.options.nominals.forEach( n => {
		    		n.selected = !n.selected
		    	})
		    	this.select()	
		    },

		    deleteItems(){
		    	this.selection.forEach( s => {
		    		let index = _.findIndex(this.options.nominals, n => n.id == s.id)
		    		if( index >=0 ){
		    			this.options.nominals.splice(index,1)
		    		}
		    	})
		    	this.select()
		    	this.$emit("update:options", this.options)
		    },

		    onChange(){
		    	this.$emit("update:options", this.options)	
		    },

		    calculateStat(){
		    	if(!this.options.nominals) return {}
		    		// console.log(JSON.stringify(this.stat.responses, null, "\t"))
		    		let s = this.stat.responses.filter( a => a) // &&  _.find(this.options.nominals, n => n.id == a[0]))
					let stats = []
					s.forEach( item => {
						stats = stats.concat(item)
					})
					let result = this.options.nominals.map( n => {
						let c = _.countBy(stats)[n.id]
						return {
							id: n.id,
							title: n.title,
							value: ((c) ? c : 0) / ((stats.length == 0) ? 1 : stats.length)
						}	
					})
					let statOptions =  {
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: {
					        type: 'value',
					        min:0,
					        max:1.0
					    },
					    yAxis: {
					        type: 'category',
					        data: []
					    },
					    series: [
					        {
					            name: '',
					            type: 'bar',
					            data: []
					        }
					    ]
					}

					statOptions.yAxis.data = result.map( r => this.truncate(r.title)).reverse()
					statOptions.series[0].data = result.map( r => r.value).reverse()
					// statOptions.color = [this.$vuetify.theme.primary]

					// this.statOptions = statOptions
					this.height = (this.options.nominals) ? this.options.nominals.length*36+50 : null
					return statOptions
				}		
		},

		

				
		data:() => ({
			active: null,
			newAltTitle: null,
			selection:[],
			height:null
		}),

		created(){
			if(this.options){
				this.select()
			}
		},

		mounted(){ this.$emit("init") }
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