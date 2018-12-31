<template>
	<div>
		<div v-if="!options || !answer" class="text-xs-center">
	    </div>

	   

			    <v-card flat color="transparent" v-else>
			    	<v-container>
						<v-layout row class="caption" color="warning" v-if="isValid != true">
							<v-spacer></v-spacer>
							<v-icon small color="warning">mdi-asterisk</v-icon>
							<span class="warning--text caption pa-2">{{isValid}}</span>
						</v-layout>	
						<v-layout column pl-2>
							<h3 :class="`headline ${(isValid != true)?'warning--text':'primary--text'}`">{{options.title}}</h3>
							<p class="body-1">{{options.note}}</p>
						</v-layout>
						<v-divider></v-divider>
						
						 <v-tabs
				            v-model="active"
				            color="transparent"
				          >
				            <v-tab key="response" ripple>Your Response</v-tab>
				            <v-tab key="statistic" ripple v-if="options.showResponsesStat">Statistic</v-tab>

				            <v-tab-item key="response" ripple>
								<v-radio-group v-model="answer.data[0]" style="width:100%;">
				      				  	<v-layout 
					      				  		align-center 
					      				  		justify-end 
					      				  		row 
					      				  		fill-height 
					      				  		v-for="alt in options.nominals" 
					      				  		style="padding-bottom: 0.5em; cursor: pointer;" 
					      				  		@click="select(alt.id)"
					      				  	>
														        		
								        		<div style="width:2em;">
								        				<v-radio :key="alt.id" :value="alt.id"></v-radio>	    		
									       		</div>
								        		<v-flex xs11>
								        			<div class="subheading pl-3">{{alt.title}}</div>
								        		</v-flex>
								        		<v-flex xs1 v-if="options.showUserInfo">
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
								 
							    </v-radio-group>    	
					        	<v-divider></v-divider>
					        	<v-text-field 
					        		v-if="options.addEnabled" 
					        		v-model="newAltTitle" 
					        		label="Type your response and press 'Enter'" 
					        		@keyup.enter="addAlternative"
					        	></v-text-field>	
						    	<v-divider v-if="options.addEnabled" ></v-divider>
						    </v-tab-item>
							<v-tab-item key="statistic" ripple v-if="options.showResponsesStat">
					    		<echart :options="statOptions" :height="height"></echart>
							</v-tab-item>			    	
			    	</v-container>
			    </v-card>
			
		</v-tabs>
		
	   <!--  <pre>
	    	{{JSON.stringify(answer,null,"\t")}}
	    </pre>	
 -->
	</div>	
</template>


<script>
  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import statMixin from "../mixins/statistic.mixin.js"
  
  
	
	export default {

		mixins:[djvueMixin, listenerMixin, statMixin],
		
		props:["config", "options", "answer", "stat"],

		computed:{
			
		    isValid(){
		    	if(!this.options) return "Not configured"
		    	if(!this.answer) return "No response data"	
		    	if(this.options.required && this.answer.data.length == 0) return `No response for this question but it is required.`
		    	return true	
		    }
		},

		methods:{

			
		    addAlternative(){
		    	let newAlt = {
		    		id: this.$djvue.randomName(),
		    		title: this.newAltTitle,
		    		user: this.app.user
		    	}

		    	this.options.nominals = this.options.nominals || []
		    	this.options.nominals.push(newAlt)
		    	this.newAltTitle = null	
		    	this.$emit("extend:options", this.options)
		    	this.select(newAlt.id)
		    },

		    select(nominal){
		    	this.answer.data = []
		    	this.answer.data.push(nominal)
		    	this.answer.valid = this.isValid;
		    	this.$emit("update:answer")
		     },

		    calculateStat(){
		    		let stats = this.stat.responses.filter( a => a &&  _.find(this.options.nominals, n => n.id == a[0]))
					let result = this.options.nominals.map( n => {
						let c = _.countBy(stats, s => s[0])[n.id]
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

		watch:{
			answer(value){
				this.answer.data = (this.answer.data) ? this.answer.data.filter( a => _.find(this.options.nominals, alt => alt.id == a)) : [] 
			}
		},

		
		data:() => ({
			active: null,
			newAltTitle: null,
			selection:[],
			height:null
		}),

		mounted(){ this.$emit("init") }
	}

</script>

<style>
	.v-input__control {
	    width: 100% !important;
	}

	.v-input--selection-controls .v-input__control {
	    width: 100% !important;
	}
</style>

