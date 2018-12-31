export default {
	
    "One of many selection": {
		type:"question-widget", 
        name:"noname",
        icon:"mdi-radiobox-marked",
        options: { widget:{
            visible: true
          }
        },
        question:{
        	type:{
                title:"One of many selection",
        		production:"q-one-many-production",
        		design:"q-one-many-design"
        	},
            options:{
                "required": false,
                "addEnabled": false,
                "showUserInfo": false,
                "showResponsesStat": true,
                "userCollaboration": false,
                "title": "",
                "note": "",
                "nominals": []
            },
            answer:{
                data:[]
            }    
        }
	},

    "Many of many selection": {
        type:"question-widget", 
        name:"noname",
        icon:"mdi-checkbox-marked-outline",
        options: { widget:{
            visible: true
          }
        },
        question:{
            type:{
                title:"Many of many selection",
                production:"q-many-many-production",
                design:"q-many-many-design"
            },
            options:{
                "required": false,
                "addEnabled": false,
                "showUserInfo": false,
                "showResponsesStat": true,
                "userCollaboration": false,
                "title": "",
                "note": "",
                "rule":{
                    "min": 0,
                    "max": 1
                },
                "nominals": []
            },
            answer:{
                data:[]
            }    
        }
    },



}

