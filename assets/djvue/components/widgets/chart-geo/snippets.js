export default {
    "World":{
      
        type:"geo-chart-widget", 
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
                map: 'World',
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
                    {id:"AFG", name:"Afghanistan", value:  33885.92544},
                    {id:"ARM",name:"Armenia", value: 3124.784854},
                    {id:"UKR",name:"Ukraine", value: 3124.784854}
                ]
            }
        ],



          "color": [
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                    "#a65628",
                    "#f781bf",
                    "#999999"
                ]


        },


        data:{
          source:"embedded",
          embedded:{
            serie:[
                {selector: "AFG", name: "Afghanistan", value:  33885.92544},
                {selector: "ARM", name: "Armenia", value: 3124.784854},
                {selector: "UKR", name: "Ukraine", value: 3124.784854}
            ]
          }
        }
       
    },

    "Ukraine":{
      
        type:"geo-chart-widget", 
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
          
          legend:{
            selectedMode:"single"
          },

          visualMap: {
            align: 'auto',
            
            inRange: {
                color: ['#313695',  '#e0f3f8', '#ffffbf', '#fee090', '#a50026']
            },
            text:['High','Low'],       
            calculable: true
        },
          series: [
            {
                name: 'Cql',
                type: 'map',
                roam: true,
                map: 'Ukraine',
                itemStyle:{
                    // normal:{label:{show:true}}
                },
             
                data:[
                    {name:"Вінницька", value: 0.80710576},
                    {name:"Волинська", value: 0.830569575},
                    {name:"Волинська", value: 0.830569575},
                    {name:"Дніпропетровська", value:  0.762769951},
                    {name:"Донецька", value:  0.654205667},
                    {name:"Житомирська", value: 0.804299944},
                    {name:"Закарпатська", value:  0.864221654},
                    {name:"Запорізька", value:  0.724563127},
                    {name:"Івано-Франківська", value: 0.813720245},
                    {name:"Київ", value:  1.144097155},
                    {name:"Київська", value:  0.790219089},
                    {name:"Кіровоградська", value:  0.773295167},
                    {name:"Луганська", value: 0.701899375},
                    {name:"Львівська", value: 0.858655346},
                    {name:"Миколаївська", value:  0.744842683},
                    {name:"Одеська", value: 0.755162756},
                    {name:"Полтавська", value:  0.807339054},
                    {name:"Рівненська", value:  0.823434552},
                    {name:"Сумська", value: 0.822622924},
                    {name:"Тернопільська", value: 0.828652696},
                    {name:"Харківська", value:  0.861718417},
                    {name:"Херсонська", value:  0.736142971},
                    {name:"Хмельницька", value: 0.861247925},
                    {name:"Черкаська", value: 0.773717714},
                    {name:"Чернівецька", value: 0.862608586},
                    {name:"Чернігівська", value:  0.778267195}
                ]
            }
        ],



          "color": [
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                    "#a65628",
                    "#f781bf",
                    "#999999"
                ]


        },


        data:{
          source:"embedded",
          embedded:`<h2 color="#eee"><center>not configured<center></h2><p>Use options dialog for configure this widget</p>`
        }
       
    }
    
}    
    