// import {mapState, mapActions} from "../../../components/vuex/dist/vuex"

import store from "djvue/state/index.js"


export default {
	
	store,




	computed: {
		isProductionMode() {return this.app.mode == 'production'},
		isNeedSave() {return this.app.needSave},
		appName() {return this.app.name},
		
		
		...Vuex.mapState({app: state => state.Djvue.app})
	},	
	
	methods:{
		
		saveAppConfig() {
	      this.app.config.pages = JSON.parse(JSON.stringify(this.app.pages))
	      this.app.config.skin = JSON.parse(JSON.stringify(this.app.skin))
	      this.app.config.theme = this.$vuetify.theme
	      this.app.config.appWidgets = undefined;
	      this.app.config.skinName = undefined;

	      // console.log("SAVE", JSON.stringify(this.app.config,null,"\t"))
	      if(this.emit){
	      	this.emit("app-config-save")
	      }

	      this.$portal.put(`api/app/config/${this.app.config.id}`, this.app.config)
	        .then(() => {
	          if (this.app.oldName != this.app.config.name) {
	            this.$djvue.fullReload(`app/${this.app.config.name}/`)
	          }
	        })
	      this.setNeedSave(false)
	    },
		
		createEventContext(context){
			return {
				emitter:this,
				context
			}
		},

		getPage(name){
			let p = _.find(this.app.pages, item => item.id == name)
			p = p 
			|| _.find(this.app.pages, item => !item.id)
			|| {
				name:"error",
				title:"Page not found",
				layout:"layout-1",
				holders:{
					"Holder":{widgets:[]}
				}
			}
			return p;
		},

		go(path){
			this.$router.push(path)
		},

		...Vuex.mapActions(
			["setMode","setNeedSave","setCurrentPage","setHolderContent"]
		),

        setLocale(locale){
            this.$i18n.locale = locale;
            moment.locale(locale)
            this.$cookie.set("currentLanguage", locale )
        }
	},

	created(){
		// this.$eventHub.on("hi", (context) =>{console.log(context)} )
	}
}		
