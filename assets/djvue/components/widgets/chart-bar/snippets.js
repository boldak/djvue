export default {
	"Horizontal Bars":
	{
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                
                legend: {
                    data: ['Serie1', 'Serie2']
                },
                
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },

                yAxis: {
                    type: 'category',
                    data: ['o1','o2','o3','o4','o5','o6']
                },
                
                series: [
                    {
                        name: 'Serie1',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: 'Serie2',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
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
                    
                    legend: ['Serie1', 'Serie2'],

                    yAxis: ['o1','o2','o3','o4','o5','o6'],
                    
                    series: [
                        {
                            name: 'Serie1',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        {
                            name: 'Serie2',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807]
                        }
                    ]

                }
            }
    },

    "Vertical Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                
                legend: {
                    data: ['Serie1', 'Serie2']
                },
                
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },

                xAxis: {
                    type: 'category',
                    data: ['o1','o2','o3','o4','o5','o6']
                },
                
                series: [
                    {
                        name: 'Serie1',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: 'Serie2',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
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
                    
                    legend: ['Serie1', 'Serie2'],

                    xAxis: ['o1','o2','o3','o4','o5','o6'],
                    
                    series: [
                        {
                            name: 'Serie1',
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },
                        {
                            name: 'Serie2',
                            type: 'bar',
                            data: [19325, 23438, 31000, 121594, 134141, 681807]
                        }
                    ]

                }
            }
    },
    
    "Radial Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow"
                    }
                },

                angleAxis: {
                    type: 'category',
                    data: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
                    z: 10
                },
                
                radiusAxis: {
                },

                polar: {
                },
                
                series: [{
                    type: 'bar',
                    data: [1, 2, 3, 4, 3, 5, 1],
                    coordinateSystem: 'polar',
                    name: 'A'
                }, {
                    type: 'bar',
                    data: [2, 4, 6, 1, 3, 2, 1],
                    coordinateSystem: 'polar',
                    name: 'B',
                }, {
                    type: 'bar',
                    data: [1, 2, 3, 4, 1, 2, 5],
                    coordinateSystem: 'polar',
                    name: 'C'
                }],
                legend: {
                    show: true,
                    data: ['A', 'B', 'C']
                }
            },
            
            
            data:{
                source:"embedded",
                embedded:{
                    
                    legend: ['A', 'B', 'C'],

                    angleAxis: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'],
                    
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: 'A'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: 'B',
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: 'C'
                    }]  
                }
            }
    },
        "Polar Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                "tooltip": {
                    "trigger": "axis",
                    "axisPointer": {
                        "type": "shadow"
                    }
                },

                angleAxis: {},
                radiusAxis: {
                    type: 'category',
                    data: ['a1', 'a2', 'a3', 'a4'],
                    z: 10
                },
                polar: {
                },
                series: [{
                    type: 'bar',
                    data: [1, 2, 3, 4],
                    coordinateSystem: 'polar',
                    name: 'A'
                }, {
                    type: 'bar',
                    data: [2, 4, 6, 8],
                    coordinateSystem: 'polar',
                    name: 'B'
                }, {
                    type: 'bar',
                    data: [1, 2, 3, 4],
                    coordinateSystem: 'polar',
                    name: 'C'
                }],
                legend: {
                    show: true,
                    data: ['A', 'B', 'C']
                },

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
                    legend: ['A', 'B', 'C'],
                    radiusAxis: ['a1', 'a2', 'a3', 'a4'],
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'A'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 8],
                        coordinateSystem: 'polar',
                        name: 'B'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4],
                        coordinateSystem: 'polar',
                        name: 'C'
                    }]
                }
            }
    },

    "Stacked Horizontal Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                legend: {},
                tooltip: {},
                xAxis: {type: 'value'},
                yAxis: {type: 'category'},
                series: [
                    {type: 'bar', stack:'a'},
                    {type: 'bar', stack:'a'},
                    {type: 'bar', stack:'a'}
                ],
                grid: {
                    top:"20",
                    height:"auto",
                    containLabel: true
                },

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
                    dataset: {
                        // Here the declared `dimensions` is mainly for providing the order of
                        // the dimensions, which enables ECharts to apply the default mapping
                        // from dimensions to axes.
                        // Alternatively, we can declare `series.encode` to specify the mapping,
                        // which will be introduced later.
                        dimensions: ['product', '2015', '2016', '2017'],
                        source: [
                            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                        ]
                    }
                }
            }
    },

    "Stacked Vertical Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-bar",
            
            options: { 

                widget:{
                  visible:true
                },

                
                legend: {},
                tooltip: {},
                yAxis: {type: 'value'},
                xAxis: {type: 'category'},
                series: [
                    {type: 'bar', stack:'a'},
                    {type: 'bar', stack:'a'},
                    {type: 'bar', stack:'a'}
                ],
                grid: {
                    top:"20",
                    height:"auto",
                    containLabel: true
                },

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
                    dataset: {
                        // Here the declared `dimensions` is mainly for providing the order of
                        // the dimensions, which enables ECharts to apply the default mapping
                        // from dimensions to axes.
                        // Alternatively, we can declare `series.encode` to specify the mapping,
                        // which will be introduced later.
                        dimensions: ['product', '2015', '2016', '2017'],
                        source: [
                            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                        ]
                    }
                }
            }
    },
    "Stacked Radial Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                angleAxis: {
                    type:"category"
                    
                },
                radiusAxis: {
                    type:""
                },
                polar: {
                   
                },
                series: [
                    {
                        type: 'bar',
                        coordinateSystem: 'polar',
                        stack:'a'
                    }, {
                        type: 'bar',
                        coordinateSystem: 'polar',
                        stack:'a'
                    }, {
                        type: 'bar',
                        coordinateSystem: 'polar',
                        stack:'a'
                    }
                ],

                legend: {},

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
                    dataset: {
                        // Here the declared `dimensions` is mainly for providing the order of
                        // the dimensions, which enables ECharts to apply the default mapping
                        // from dimensions to axes.
                        // Alternatively, we can declare `series.encode` to specify the mapping,
                        // which will be introduced later.
                        dimensions: ['product', '2015', '2016', '2017'],
                        source: [
                            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                        ]
                    }
                }
            }
    },
        "Stacked Polar Bars":
    {
            type:"bar-chart-widget", 
            name:"noname",
            icon:"mdi-chart-arc",
            
            options: { 

                widget:{
                  visible:true
                },

                angleAxis: {
                    type:""
                    
                },
                radiusAxis: {
                    type:"category"
                },
                polar: {
                   
                },
                series: [
                    {
                        type: 'bar',
                        coordinateSystem: 'polar',
                        stack:'a'
                    }, {
                        type: 'bar',
                        coordinateSystem: 'polar',
                        stack:'a'
                    }, {
                        type: 'bar',
                        coordinateSystem: 'polar',
                        stack:'a'
                    }
                ],

                legend: {},

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
                    dataset: {
                        // Here the declared `dimensions` is mainly for providing the order of
                        // the dimensions, which enables ECharts to apply the default mapping
                        // from dimensions to axes.
                        // Alternatively, we can declare `series.encode` to specify the mapping,
                        // which will be introduced later.
                        dimensions: ['product', '2015', '2016', '2017'],
                        source: [
                            {product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7},
                            {product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1},
                            {product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5},
                            {product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1}
                        ]
                    }
                }
            }
    }

}