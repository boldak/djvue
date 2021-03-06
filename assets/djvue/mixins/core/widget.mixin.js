
import listenerMixin from "djvue/mixins/core/listener.mixin.js";
import initiableMixin from "djvue/mixins/core/initiable.mixin.js"


export default {

	props:["config"],

	mixins:[listenerMixin, initiableMixin],

	data:()=>({
		widgetWrapper:true,
		data:{},
		pageStarted: false,
		options:{
			widget:{
				visible: true
			}
		}
	}),
	
	methods:{

		

		onBeforeInit() { this._waitList = [""] },

        onChildsInitiated() { this.$emit("init", this.config.id) },

		isSameWidget(widget) { return this.config.id == widget.config.id },

	    _reconfigure (widget) {
			  
		    if(this.$refs.instance.onReconfigure){
            	
            	let c =  this.$djvue.extend({},widget.config)
            	
            	this.$refs.instance.onReconfigure(c)
            		.then( newConfig => { 
            			// this.config = newConfig
            			if(newConfig)
            				this.emit(
            					"holder-update-widget-config",
            					this,
            					{
            						widget: this,
            						newConfig: this.$djvue.extend({},newConfig)
            					}
            				)
            		})
            		.catch(()=> {})
            }		
          
        },


	    _updateConfig () {

	    		if(!this.pageStarted && this.isProductionMode) return
	    		// console.log("UPDATE CONFIG")	
	    		
	      		// this.doRemoveSubscriptions();
	      		// this.doInitSubscriptions();

	      		new Promise( (resolve,reject) => {
				
				if(!this.config.data){
					reject("no data")
				}

				if(this.config.data.source == "url"){
					this.$http
						.get(this.config.data.url)
						.then(res => {
							this.hasError = false;
							resolve(res.data)
						})
						.catch((error) => {
							this.hasError = true;
							this.$djvue.warning({
					            type:"error",
					            title:"Cannot load data",
					            text:error.toString()
					          })
							if ( this.$refs.instance && this.$refs.instance.onError ) this.$refs.instance.onError(error)
							
						})
					return	
				}
				
				if(this.config.data.source == "dps"){
					// console.log("DPS", JSON.stringify(this.config.data.script))
					this.$dps.run({
						script:this.config.data.script
					})
						.then (response => {
							this.hasError = false;
							resolve(response.data)
						})
						.catch (error => {
							this.$djvue.warning({
					            type:"error",
					            title:"Cannot run dps",
					            text:error.toString()
					          })
							if ( this.$refs.instance && this.$refs.instance.onError ) this.$refs.instance.onError(error)
						})
					// resolve("dps")
					return
				}
				
				if(this.config.data.source == "embedded") {
					this.hasError = false;
					resolve(this.config.data.embedded)
					return
				}

				// reject("no data source")
			}).then( data => {
					// console.log("RESOLVED")
					this.update({data, options:this.config.options})				
			})

		},

		run () {
			// this.$nextTick(()=>{
				// console.log(this.$refs.instance)
				if(this.$refs.instance && this.$refs.instance.onRun) return this.$refs.instance.onRun()
				return new Promise((resolve, reject)=>{resolve()})	
			// })
		},

		update (state) {

			if(!state) state = {
				data:this.data, 
				options:this.options
			};
			
			if(!state.data) state.data = Object.assign({},this.data);
			if(!state.options) state.options = Object.assign({},this.options);

			this.data = state.data;
			this.options = state.options;

			this.$nextTick(()=>{
				// console.log(this.$refs.instance)
				if(this.$refs.instance && this.$refs.instance.onUpdate) this.$refs.instance.onUpdate(state)
			})
		},

		hide () {
			this.$nextTick(()=> {
				this.hidden = true
			})
		},

		show () {
			this.$nextTick(()=> {
				this.hidden = false
				this.$nextTick(()=> {
					this.update({
						data:this.data, 
						options:this.options
					})	
				})
			})
		},

		clear(){
			this.$nextTick(()=>{
				if(this.$refs.instance && this.$refs.instance.onClear) return this.$refs.instance.onClear()
			})
		},

		setOption(path,value){
			_.set(this.options, path, value)
		},

		_delete () {
			let rule = (this.$refs.instance && this.$refs.instance.isDeleteAvailable)?this.$refs.instance.isDeleteAvailable:(()=>true)
			if( rule.apply(this.$refs.instance)){
				if(this.$refs.instance && this.$refs.instance.onDelete) this.$refs.instance.onDelete()
				this._removeSubscriptions()
				return true	
			}
			return false
		},

		_removeSubscriptions () { this.off() },

		_initSubscriptions () {

			this.on({
				event:"app-config-save", 
				callback: () => {
					if(this.$refs.instance && this.$refs.instance.onSaveAppConfig)  this.$refs.instance.onSaveAppConfig()
				},
				rule: () => true
			})

			this.on({
				event:"widget-update", 
				callback: this._updateConfig,
				rule: () => true
			})
			
			this.on({
				event:"widget-reconfigure", 
				callback: this._reconfigure,
				rule: this.isSameWidget
			})

			this.on({
	    		event: "page-start", 
	    		callback: () => {
	    			// console.log("widget page-start",this.config.name)
	    			this.pageStarted = true;
	    			this._updateConfig()		
	    			if(this.$refs.instance && this.$refs.instance.onPageStart)  this.$refs.instance.onPageStart()
		    	},
		    	rule: () => true		
    		})

    		this.on({
	    		event: "page-stop", 
	    		callback: () => {
	    			if(this.$refs.instance && this.$refs.instance.onPageStop)  this.$refs.instance.onPageStop()
		    	},
		    	rule: () => true		
    		})

    		this.dataSelectEmitters = this.config.dataSelectEmitters || [];
    		this.dataSelectEmitters = (_.isArray(this.dataSelectEmitters)) ? this.dataSelectEmitters : [this.dataSelectEmitters];
    		this.dataSelectEmitters.forEach( emitter => {
    			this.on({
		    		event: "data-select", 
		    		callback: (emitter, data) => {
		    			if(this.$refs.instance && this.$refs.instance.onDataSelect)  this.$refs.instance.onDataSelect(emitter,data)
			    	},
			    	rule: emitter		
    			})
    		})
		}

	},

	watch:{
		
		config(value) { this._updateConfig() },

		"config.dataSelectEmitters"(value){
			this.dataSelectEmitters = value || []	
			this._removeSubscriptions()
			this._initSubscriptions()
			this._updateConfig()			
		}

    },

	created(){
		this.config.data = this.config.data || {}
		this.config.data.script = this.config.data.script || ""
		this._initSubscriptions()
		this._updateConfig()
	},

	beforeDestroy(){
		this._removeSubscriptions()
	}
}		
