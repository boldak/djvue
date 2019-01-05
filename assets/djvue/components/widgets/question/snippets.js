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

    "Rate": {
        type:"question-widget", 
        name:"noname",
        icon:"mdi-star-outline",
        options: { widget:{
            visible: true
          }
        },
        question:{
            type:{
                title:"Rate",
                production:"q-rate-production",
                design:"q-rate-design"
            },
            options:{
                "required": false,
                "useColors": false,
                "showValue": false,
                "showTitle": true,
                "icon":"star",
                "palette":[],
                "scale":[
                    {value:1, title:"Low"},
                    {value:2},
                    {value:3, title:"Medium"},
                    {value:4},
                    {value:5, title:"Hight"}
                ],
                "title": "",
                "note": ""
            },
            answer:{
                data:[]
            }    
        }
    },

    "Range": {
        type:"question-widget", 
        name:"noname",
        icon:"mdi-arrow-expand-horizontal",
        options: { widget:{
            visible: true
          }
        },
        question:{
            type:{
                title:"Rate",
                production:"q-range-production",
                design:"q-range-design"
            },
            options:{
                "required": false,
                "useColors": false,
                "showValue": false,
                "showTitle": true,
                "icon":"star",
                "range":[0,1],
                "step":0.1,
                "palette":[],
                "scale":[
                    {value:1, title:"Low"},
                    {value:2},
                    {value:3, title:"Medium"},
                    {value:4},
                    {value:5, title:"Hight"}
                ],
                "title": "",
                "note": ""
            },
            answer:{
                data:[]
            }    
        }
    },
        
    "Date": {
        type:"question-widget", 
        name:"noname",
        icon:"mdi-calendar-blank-outline",
        options: { widget:{
            visible: true
          }
        },
        question:{
            type:{
                title:"Rate",
                production:"q-date-production",
                design:"q-date-design"
            },
            options:{
                "required": false,
                "useColors": false,
                "showValue": false,
                "showTitle": true,
                "icon":"star",
                "range":[0,1],
                "step":0.1,
                "palette":[],
                "scale":[
                    {value:1, title:"Low"},
                    {value:2},
                    {value:3, title:"Medium"},
                    {value:4},
                    {value:5, title:"Hight"}
                ],
                "title": "",
                "note": ""
            },
            answer:{
                data:[]
            }    
        }
    }



}

