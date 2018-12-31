export default {

  methods:{
  	
  	getQueryString(param){

	  var queryString = {};

	  let uri = JSON.parse(JSON.stringify(window.location.href));
	  
	  uri.replace(
	      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
	      function($0, $1, $2, $3) { queryString[$1] = $3; }
	  );
	  
	  return (param) ? queryString[param]: queryString
	},

	accessIsAlowed(){

		if( !this.form.config.access.enabled && !this.app.user.isAdmin && !this.app.user.isOwner && !this.app.user.isCollaborator ) {
			this.$djvue.warning({
				type:"error",
				title:"Access denied",
				text: "Form is closed."
			})
			return false
		}

		this.app.user.apikey = this.getQueryString( "apikey" );

		if( this.form.config.access.type == "any" ) {
			this.app.user.id = this.$djvue.randomName()
			this.app.user.name = "Ananimous"
			this.app.user.icon = "mdi-account-circle-outline"
			this.app.user.photo = "."
			return true;
		}	

		if( this.form.config.access.type == "users" ){
			if( this.app.user.id ) return true;
			
			this.$djvue.confirm(
				{
					type:"warning",
					title:"Access denied",
					text:"Access is alowed for registered respondents.",
					resolveText:"Login with Google",
					rejectText:"Cancel"
				}
			).then(() => {
				this.$djvue.login()
			})
			
			return false;
		}

		if(this.form.config.access.type == "invited"){
			if(!this.app.user.id && !this.app.user.apikey){
				this.$djvue.warning({
					type:"error",
					title:"Access denied",
					text: "Access is alower for invited respondents only."
				})
				return false
			}

			let invitedRespondent = _.find(this.form.config.access.users, u => {

				if(u.id && this.app.user.id ) return u.id == this.app.user.id;
	            if(u.apikey && this.app.user.apikey ) return u.apikey == this.app.user.apikey;
	            return false

			})
			
			if(invitedRespondent){
				this.app.user = invitedRespondent
				return true
			}

			this.$djvue.warning({
				type:"error",
				title:"Access denied",
				text: "Access is alower for invited respondents only."
			})
			return false
		}

		return false;

	} 

  }

}  	

