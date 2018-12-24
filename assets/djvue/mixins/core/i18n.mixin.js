export default {

	props:["gi18n"],
	
	methods:{
		translate(key){
				return this.gi18n.t(`${this.$i18n_id}_${key}`)
		}
	},

	data:()=>({
		$i18n_id: null
	}),
    
	created(){
		this.$i18n_id = this.$djvue.randomName()
		

		let messages = {
			en:  _.mapKeys(this.i18n.en, (value, key) => `${this.$i18n_id}_${key}`),
			uk:  _.mapKeys(this.i18n.uk, (value, key) => `${this.$i18n_id}_${key}`)
		};

		

		if(this.gi18n){
			this.gi18n.mergeLocaleMessage("en", messages.en);
      		this.gi18n.mergeLocaleMessage("uk", messages.uk); 
     	}
	},

	beforeDestroy(){
		
		if(!this.gi18n) return

		let messages = {
			en:  this.gi18n.getLocaleMessage("en"),
			uk:  this.gi18n.getLocaleMessage("uk")
		};



		messages.en = _.pick(messages.en, _.keys(messages.en).filter((key => !key.startsWith(this.$i18n_id))))
		messages.uk = _.pick(messages.uk, _.keys(messages.uk).filter((key => !key.startsWith(this.$i18n_id))))

		// console.log(JSON.stringify(messages,null,"\t"))

		// this.$nextTick( ()=> {
			this.gi18n.setLocaleMessage("en", messages.en);
      		this.gi18n.setLocaleMessage("uk", messages.uk);
      		this.app.config.i18n = messages 
      	// })	 
				
	}


}