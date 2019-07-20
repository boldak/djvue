// import * as Cookie from "modules/tiny-cookie/dist/tiny-cookie.js"
import dialogFactory from "djvue/components/core/ext/configDialog.js"
import djImg from "djvue/components/core/ext/dj-img.vue"

import warningDialog from "djvue/components/core/dialogs/warning.vue"
Vue.prototype.$dialog.component("warningDialog", warningDialog)

import confirmDialog from "djvue/components/core/dialogs/confirm.vue"
Vue.prototype.$dialog.component("confirmDialog", confirmDialog)


import progressDialog from "djvue/components/core/dialogs/progress.vue"
Vue.prototype.$dialog.component("progressDialog", progressDialog)

import selectFileDialog from "djvue/components/core/dialogs/select-file.vue"
Vue.prototype.$dialog.component("selectFileDialog", selectFileDialog)

export var cookiePlugin = {

        install: function (Vue) {
            Vue.prototype.$cookie = this;
            Vue.cookie = this;
        },
        set: function (name, value, daysOrOptions) {
            var opts = daysOrOptions;
            if(Number.isInteger(daysOrOptions)) {
                opts = {expires: daysOrOptions};
            }
            return Cookie.set(name, value, opts);
        },

        put: function (name, value, daysOrOptions) {
        		return this.set(name, value, daysOrOptions)
        },

        get: function (name) {
            return Cookie.get(name);
        },

        delete: function (name, options) {
            var opts = {expires: -1};
            if(options !== undefined) {
                opts = Object.assign(options, opts);
            }
            this.set(name, '', opts);
        }
    }


export var portalPlugin = {
	install(Vue, options = {baseURL:"/"}) {
		Vue.prototype.$portal = axios.create(options)
	}
}

export var httpPlugin = {
    install(Vue, options) {
        Vue.prototype.$http = axios.create(options)
    }
}

export var dpsPlugin = {
    install(Vue, options) {
        let transport = axios.create(options);
        let url = "api/script"
        let client = options.client;
        let baseURL = options.baseURL;

        // client = {user: user, app: appName} from main page or from options
        // url from main page or from options

        Vue.prototype.$dps = {
            run: ({script,state,file}) => {
                if(!file){
                    return transport.post(
                        url,
                        {
                            client,
                            script,
                            state: { storage: state }
                        }
                    ).then( response => {
                        return {
                          type: response.data.type,
                          data: response.data.data
                        }
                      })
                } else {
                    let formData = new FormData();
                    formData.append("client",JSON.stringify(client))
                    formData.append("script",script)
                    formData.append("state",JSON.stringify({ storage: state }))
                    formData.append('file', file);
                    return transport.post(
                        url,
                        formData,
                        { headers: { 'Content-Type': 'multipart/form-data'}}
                    )
                }    
            },
            call: this.run,
            getBaseURL: () => baseURL,
            setBaseURL: (value) => {
                transport.defaults.baseURL = value
            }
        }

        Vue.component("dj-img", djImg)
    }
}



var findChild =  (component, filter, res) => {
                
                res = res || []
                 if (component.$children) {
				    res = res.concat(component.$children.filter(filter))
                    component.$children.forEach(child => {
							res = res.concat(findChild(child, filter))	
						}
					)
				}

				return res
}

var toTree = (object) =>
                
                    _.keys(object).map( key => {
                        return {
                            name: (_.isObject(object[key])) ? key: `${key}: ${object[key]}`,
                            children: (!_.isObject(object[key])) ? undefined : toTree(object[key]) 
                        }
                    })



var eventHub={}

export var eventhubPlugin = {
    install(Vue, options){
         eventHub = new Vue();
         
         Object.defineProperties(eventHub, {
            on: {
                get: function() {
                    return eventHub.$on
                }
            },
            emit: {
                get: function() {
                    return eventHub.$emit
                }
            },
            off: {
                get: function() {
                    return eventHub.$off
                }
            }
        });

        Object.defineProperty(Vue.prototype, '$eventHub', {
            get: function() {
                return eventHub;
            }
        });

        Object.defineProperty(Vue, 'eventHub', {
            get: function() {
                return eventHub;
            }
        });
    }   
}




export var djvuePlugin = {
	install(Vue, options){
        
        Vue.createConfigDialog = (components) => dialogFactory(components)
        
		Vue.prototype.$djvue = {
			
			fullReload: (url) => {
                if(url) {
                    window.location = url
                } else {
                    
                    window.location.reload()
                }    
            },
			
            login: () => {
				Vue.cookie.set('redirectToUrl', window.location);
      			window.location = `/auth/google`;
			},
			
            randomName: () => Math.random().toString(36).substring(2),
			
            findChild,
            
            toTree,

            extend:( object, extention) => {
                
                return _.extend (object,JSON.parse(JSON.stringify(extention)))
                // return {...object,...JSON.parse(JSON.stringify(extention))}
            },

            createConfigDialog(components){
                return dialogFactory(components)
            },

            warning(options){
                options = options || {}
                options.text = options.text || "";
                options.type = options.type || "info";
                options.title = options.title || options.type;

                return Vue.prototype.$dialog.showAndWait(warningDialog, {options:options})
            },

            progress(options){
                
                let result  =  Vue.prototype.$dialog.showAndWait(progressDialog, {options:options})
                result.cancel = () => {
                    Vue.prototype.$eventHub.emit("progress-dialog-cancel")
                }
                result.set = (options) => {
                    Vue.prototype.$eventHub.emit("progress-dialog-set", options)
                }
                return result
            },

            confirm(options){
                options = options || {}
                options.text = options.text || "";
                options.type = options.type || "info";
                options.title = options.title || options.type;

                return new Promise((resolve, reject) => {
                    Vue.prototype.$dialog.showAndWait(confirmDialog, {options:options})
                    .then(res => {
                        if ( res ) {
                            resolve()
                        } else {
                            reject()
                        }    
                    })    
                }) 
                
            },

            selectFile(options){
                options = options || {}
                options = (_.isString(options)) ? {title:options} : {}
                options.title = options.title || "Upload File";
               
                return new Promise((resolve, reject) => {
                    Vue.prototype.$dialog.showAndWait(selectFileDialog, {options:options})
                    .then(res => {
                        if ( res ) {
                            resolve( res )
                        } else {
                            reject(null)
                        }    
                    })    
                }) 
                
            },

            selectWidgets(root, filter){
                return findChild(root, filter).filter(item => item.widgetWrapper)
            },

            loadLocalFile(file, encoding) {

                return new Promise((resolve, reject) => {
                  let fr = new FileReader();
                  fr.onload = (e) => {
                    resolve(e.target.result)
                  }
                  fr.readAsText(file, encoding);
                  // reader.readAsText(file, 'CP866');
                })

            },

            saveLocalFile(fileName,object) {
                
                if(!object) return;

                let a = document.createElement('a');
                a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(JSON.stringify(object, null,'\t')));
                a.setAttribute('download', fileName);
                a.click()

            }


		}


		
	}
}





