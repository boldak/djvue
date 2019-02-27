export default {
    "World Bubbles":{
      
        type:"geo-bubble-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-map",
        options: { 
          
          widget:{
            visible: true
          },

          map:{
            locale: "en",
            scope: "World",
            name:"World"
            
          },

          // map:{
          //   locale: "uk",
          //   scope: "Ukraine",
          //   name:"Ukraine"
          // },

          tooltip: {
                trigger: 'item',
                formatter: '{b} {c}'
            },
          
          geo: {
            map: 'World',
            silent: true,
            label: {
                emphasis: {
                    show: false,
                    areaColor: '#eee'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 0.2,
                    borderColor: '#404a59'
                }
            },
            
            roam: true
            // itemStyle: {
            //     normal: {
            //         areaColor: '#323c48',
            //         borderColor: '#111'
            //     },
            //     emphasis: {
            //         areaColor: '#2a333d'
            //     }
            // }
         },
          
        //   visualMap: {
        //     align: 'auto',
        //     orient:"horizontal",
        //     inRange: {
        //         color: ['#313695',  '#e0f3f8', '#ffffbf', '#fee090', '#a50026']
        //     },
        //     text:['High','Low'],       
        //     calculable: true
        // },
          series: [
            // {
               
            //     type: 'map',
            //     roam: true,
            //     map: 'World',
            //     itemStyle:{
            //         normal:{
            //             label:{
            //                 show:false
            //             }
            //         },
            //         emphasis:{
            //             label:{
            //                 show:false
            //             }
            //         }
            //     },
             
            //     data:[
            //         // {id:"AFG", name:"Afghanistan", value:  33885.92544},
            //         // {id:"ARM",name:"Armenia", value: 3124.784854},
            //         // {id:"UKR",name:"Ukraine", value: 3124.784854}
            //     ]
            // }
        ],

        color:["#0a0","#ff0","#c00"],




        },


        data:{
          source:"embedded",
          embedded:{
            serie:[
                // {selector: "AFG", name: "Afghanistan", value:  33885.92544},
                // {selector: "ARM", name: "Armenia", value: 3124.784854},
                // {selector: "UKR", name: "Ukraine", value: 3124.784854}
            ]
          }
        }
       
    },

    "Ukraine Bubbles":{

  
        type:"geo-bubble-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-map",
        options: { 
          
          widget:{
            visible: true
          },

          height:450,

          map:{
            locale: "uk",
            scope: "Ukraine",
            name:"Ukraine"
          },
          
          tooltip: {
                trigger: 'item',
                formatter: '{b} {c}'
            },
          
          

          visualMap: {
            align: 'auto',
            orient:"horizontal",
            inRange: {
                color: ['#313695',  '#e0f3f8', '#ffffbf', '#fee090', '#a50026']
            },
            text:['High','Low'],       
            calculable: true
        },

          series: [
            {
               
                type: 'map',
                roam: true,
                map: 'Ukraine',
                itemStyle:{
                    normal:{
                        label:{
                            show:false
                        }
                    },
                    emphasis:{
                        label:{
                            show:false
                        }
                    }
                },
             
                data:[
                    {selector:'UA-05', name:'Вінницька', value: 0.80710576},
                    {selector:'UA-07', name:'Волинська', value: 0.830569575},
                    {selector:'UA-12', name:'Дніпропетровська', value: 0.830569575}
                ]
            }
        ],

        color:["#0a0","#ff0","#c00"],

        },

        


        data: {
          source:"embedded",
          embedded: {
            serie: [
                {selector:'UA-05', name:'Вінницька', value: 0.80710576},
                {selector:'UA-07', name:'Волинська', value: 0.830569575},
                {selector:'UA-12', name:'Дніпропетровська', value: 0.830569575}
            ]
          }
        }
       
    }
    
}    
    