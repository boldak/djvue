import djvueMixin from "djvue/mixins/core/djvue.mixin.js"
import listenerMixin from "djvue/mixins/core/listener.mixin.js"
import initiableMixin from "djvue/mixins/core/initiable.mixin.js"

export default {

	mixins:[djvueMixin, listenerMixin, initiableMixin],
    
	beforeDestroy(){
		this.emit("page-stop", this, this.app.currentPage)  
	},

	data: () => ({
		djType:"layout",
		djId:null
	}),

	methods:{

		getMediators(){
			let pageLevelMediators = []
			_.values(this.app.currentPage.holders).forEach( h => {
				pageLevelMediators = pageLevelMediators.concat(h.widgets.filter( w => w.type == "mediator-widget"))
			})

			pageLevelMediators = pageLevelMediators.map(m => this.$djvue.selectWidgets( this.$root, item => (item.config) && (item.config.id == m.id))[0])
			
			let appLevelMediators = []
			_.values(this.app.config.skin.holders).forEach( h => {
				appLevelMediators = appLevelMediators.concat(h.widgets.filter( w => w.type == "mediator-widget"))
			})

			appLevelMediators = appLevelMediators.map(m => this.$djvue.selectWidgets( this.$root, item => (item.config) && (item.config.id == m.id))[0])
			
			if(pageLevelMediators.length == 0) pageLevelMediators.push( {run: () => {} })
			if(appLevelMediators.length == 0) appLevelMediators.push( {run: () => {} })


			return [pageLevelMediators, appLevelMediators]	
		},

		pageStart(){
			let mediators = this.getMediators();
			// console.log(mediators)
			// console.log("PageStart", mediators)

			Promise.all(mediators[0].map( pl => pl.run()))
			.then( () => {
			 	Promise.all(mediators[1].map( al => al.run()))
			 	.then( () => {
			 		this.$nextTick(() => {
			        	this.emit("page-start")
			        	.then(()=>{
			        		this.emit("page-start-after")
			        	})
			      	})		
			 	})
			 	.catch((e) => {
			 		console.error("App level error", e.toString())
			 		this.$djvue.warning({
	                    type:"error",
	                    title:`App level Error`,
	                    text:e.toString()
	                  })
			 		this.$nextTick(() => {
			        	this.emit("page-start")
			        	.then(()=>{
			        		this.emit("page-start-after")
			        	})
			      	})	
			 	})
			})
			.catch((e) => {
			 		console.error("Page level error", e.toString())
			 		this.$djvue.warning({
	                    type:"error",
	                    title:`Page level Error`,
	                    text:e.toString()
	                  })
			 		this.$nextTick(() => {
			        	this.emit("page-start")
			        	.then(()=>{
			        		this.emit("page-start-after")
			        	})
			      	})	
			 })	
		},

		onChildsInitiated() {
			// console.log("onchildInitiated",this.djId,"emit layout-page-start")
			this.emit("layout-page-start", this)//pageStart() 
		}
	},

	created(){
		this.djId = this.$djvue.randomName()
		this.on({
	    		event: "layout-page-start", 
	    		callback: (emitter) => {
	    // 			console.log("layout-page-start",this.app.currentPage.title, emitter.djType,emitter.djId)
	    // 			console.log(this.djId,"!!LAYOUT Subscriptions", this.subscriptions)
					// console.log(this.djId,"!!LAYOUT coreEventHandlers", this.coreEventHandlers)
	    			this.pageStart()
		    	},
		    	rule: () => true		
    		})
		this.on({
	    		event: "page-stop", 
	    		callback: (emitter) => {
	    			console.log("layout page stop", this.djId)
	    			this.off()
		    	},
		    	rule: () => true		
    	})
		// console.log(this.djId,"LAYOUT Subscriptions", this.subscriptions)
		// console.log(this.djId,"LAYOUT coreEventHandlers", this.coreEventHandlers)

	}

}
