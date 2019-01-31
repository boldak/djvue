export default {
    "Default":{
      
        type:"sunburst-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-chart-arc",
        options: { 
          
          widget:{
            visible: true
          },

          series: {
        type: 'sunburst',
        highlightPolicy: 'ancestor',
        data: [{
    name: 'Flora',
    children: [{
        name: 'Black Tea',
        value: 1
        
    }, {
        name: 'Floral',
        children: [{
            name: 'Chamomile',
            value: 1
        }, {
            name: 'Rose',
            value: 1
        }, {
            name: 'Jasmine',
            value: 1
        }]
    }]
}, {
    name: 'Fruity',
    
    children: [{
        name: 'Berry',
        children: [{
            name: 'Blackberry',
            value: 1
        }, {
            name: 'Raspberry',
            value: 1
        }, {
            name: 'Blueberry',
            value: 1
        }, {
            name: 'Strawberry',
            value: 1
        }]
    }, {
        name: 'Dried Fruit',
        children: [{
            name: 'Raisin',
            value: 1
        }, {
            name: 'Prune',
            value: 1
        }]
    }, {
        name: 'Other Fruit',
        
        children: [{
            name: 'Coconut',
            value: 1
        }, {
            name: 'Cherry',
            value: 1
        }, {
            name: 'Pomegranate',
            value: 1
        }, {
            name: 'Pineapple',
            value: 1
        }, {
            name: 'Grape',
            value: 1
        }, {
            name: 'Apple',
            value: 1
        }, {
            name: 'Peach',
            value: 1
        }, {
            name: 'Pear',
            value: 1
        }]
    }, {
        name: 'Citrus Fruit',
        
        children: [{
            name: 'Grapefruit',
            value: 1
        }, {
            name: 'Orange',
            value: 1
        }, {
            name: 'Lemon',
            value: 1
        }, {
            name: 'Lime',
            value: 1
        }]
    }]
}, {
    name: 'Sour/\nFermented',
    
    children: [{
        name: 'Sour',
        
        children: [{
            name: 'Sour Aromatics',
            value: 1
        }, {
            name: 'Acetic Acid',
            value: 1
        }, {
            name: 'Butyric Acid',
            value: 1
        }, {
            name: 'Isovaleric Acid',
            value: 1
        }, {
            name: 'Citric Acid',
            value: 1
        }, {
            name: 'Malic Acid',
            value: 1
        }]
    }, {
        name: 'Alcohol/\nFremented',
        
        children: [{
            name: 'Winey',
            value: 1
        }, {
            name: 'Whiskey',
            value: 1
        }, {
            name: 'Fremented',
            value: 1
        }, {
            name: 'Overripe',
            value: 1
        }]
    }]
}, {
    name: 'Green/\nVegetative',
    
    children: [{
        name: 'Olive Oil',
        value: 1
    }, {
        name: 'Raw',
        value: 1
    }, {
        name: 'Green/\nVegetative',
        
        children: [{
            name: 'Under-ripe',
            value: 1
        }, {
            name: 'Peapod',
            value: 1
        }, {
            name: 'Fresh',
            value: 1
        }, {
            name: 'Dark Green',
            value: 1
        }, {
            name: 'Vegetative',
            value: 1
        }, {
            name: 'Hay-like',
            value: 1
        }, {
            name: 'Herb-like',
            value: 1
        }]
    }, {
        name: 'Beany',
        value: 1
    }]
}, {
    name: 'Other',
   
    children: [{
        name: 'Papery/Musty',
        
        children: [{
            name: 'Stale',
            value: 1
        }, {
            name: 'Cardboard',
            value: 1
        }, {
            name: 'Papery',
            value: 1
        }, {
            name: 'Woody',
            value: 1
        }, {
            name: 'Moldy/Damp',
            value: 1
        }, {
            name: 'Musty/Dusty',
            value: 1
        }, {
            name: 'Musty/Earthy',
            value: 1
        }, {
            name: 'Animalic',
            value: 1
        }, {
            name: 'Meaty Brothy',
            value: 1
        }, {
            name: 'Phenolic',
            value: 1
        }]
    }, {
        name: 'Chemical',
        
        children: [{
            name: 'Bitter',
            value: 1
        }, {
            name: 'Salty',
            value: 1
        }, {
            name: 'Medicinal',
            value: 1
        }, {
            name: 'Petroleum',
            value: 1
        }, {
            name: 'Skunky',
            value: 1
        }, {
            name: 'Rubber',
            value: 1
        }]
    }]
}, {
    name: 'Roasted',
    
    children: [{
        name: 'Pipe Tobacco',
        value: 1
    }, {
        name: 'Tobacco',
        value: 1
    }, {
        name: 'Burnt',
        
        children: [{
            name: 'Acrid',
            value: 1
        }, {
            name: 'Ashy',
            value: 1
        }, {
            name: 'Smoky',
            value: 1
        }, {
            name: 'Brown, Roast',
            value: 1
        }]
    }, {
        name: 'Cereal',
        
        children: [{
            name: 'Grain',
            value: 1
        }, {
            name: 'Malt',
            value: 1
        }]
    }]
}, {
    name: 'Spices',
    
    children: [{
        name: 'Pungent',
        value: 1
    }, {
        name: 'Pepper',
        value: 1
    }, {
        name: 'Brown Spice',
        
        children: [{
            name: 'Anise',
            value: 1
        }, {
            name: 'Nutmeg',
            value: 1
        }, {
            name: 'Cinnamon',
            value: 1
        }, {
            name: 'Clove',
            value: 1
        }]
    }]
}, {
    name: 'Nutty/\nCocoa',
    
    children: [{
        name: 'Nutty',
        children: [ {
            name: 'Peanuts',
            value: 1
        }, {
            name: 'Hazelnut',
            value: 1
        }, {
            name: 'Almond',
            value: 1
        }]
    }, {
        name: 'Cocoa',
        children: [{
            name: 'Chocolate',
            value: 1
        }, {
            name: 'Dark Chocolate',
            value: 1
        }]
    }]
}, {
    name: 'Sweet',
    
    children: [{
        name: 'Brown Sugar',
        
        children: [{
            name: 'Molasses',
            value: 1
        }, {
            name: 'Maple Syrup',
            value: 1
        }, {
            name: 'Caramelized',
            value: 1
        }, {
            name: 'Honey',
            value: 1
        }]
    }, {
        name: 'Vanilla',
        value: 1
    }, {
        name: 'Vanillin',
        value: 1
    }, {
        name: 'Overall Sweet',
        value: 1
        
    }, {
        name: 'Sweet Aromatics',
        value: 1
    }]
}],
        radius: [0, '95%'],
        sort: null,
        levels: [{}, {
            r0: '15%',
            r: '35%',
            itemStyle: {
                borderWidth: 2
            },
            label: {
                rotate: 'tangential'
            }
        }, {
            r0: '35%',
            r: '70%',
            label: {
                align: 'right'
            }
        }, {
            r0: '70%',
            r: '72%',
            label: {
                position: 'outside',
                padding: 3,
                silent: false
            },
            itemStyle: {
                borderWidth: 3
            }
        }]
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
          embedded:`<h2 color="#eee"><center>not configured<center></h2><p>Use options dialog for configure this widget</p>`
        }
       
    },

    "Ontology Radial":{
      
        type:"sunburst-chart-widget", 
        // id:Vue.prototype.$djvue.randomName(),
        name:"noname",
        icon:"mdi-chart-arc",
        options: { 
          
          widget:{
            visible: true
          },

          series: {
        type: 'sunburst',
        highlightPolicy: 'ancestor',
        data: [{
                    name:"World Development Indicators",
                    children: [
    {
      "name": "Economic Policy & Debt",
      "children": [
        {
          "name": " Balance of payments",
          "children": [
            {
              "name": " Capital & financial account",
              "type": "topic",
              "path": "Economic Policy & Debt: Balance of payments: Capital & financial account"
            },
            {
              "name": " Current account",
              "children": [
                {
                  "name": " Balances",
                  "type": "topic",
                  "path": "Economic Policy & Debt: Balance of payments: Current account: Balances"
                },
                {
                  "name": " Goods; services & income",
                  "type": "topic",
                  "path": "Economic Policy & Debt: Balance of payments: Current account: Goods; services & income"
                },
                {
                  "name": " Transfers",
                  "type": "topic",
                  "path": "Economic Policy & Debt: Balance of payments: Current account: Transfers"
                }
              ],
              "type": "topic"
            },
            {
              "name": " Reserves & other items",
              "type": "topic",
              "path": "Economic Policy & Debt: Balance of payments: Reserves & other items"
            }
          ],
          "type": "topic"
        },
        {
          "name": " External debt",
          "children": [
            {
              "name": " Amortization",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Amortization"
            },
            {
              "name": " Arrears; reschedulings; etc.",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Arrears; reschedulings; etc."
            },
            {
              "name": " Commitments",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Commitments"
            },
            {
              "name": " Currency composition",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Currency composition"
            },
            {
              "name": " Debt outstanding",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Debt outstanding"
            },
            {
              "name": " Debt ratios & other items",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Debt ratios & other items"
            },
            {
              "name": " Debt service",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Debt service"
            },
            {
              "name": " Disbursements",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Disbursements"
            },
            {
              "name": " Interest",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Interest"
            },
            {
              "name": " Net flows",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Net flows"
            },
            {
              "name": " Net transfers",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Net transfers"
            },
            {
              "name": " Terms",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Terms"
            },
            {
              "name": " Undisbursed debt",
              "type": "topic",
              "path": "Economic Policy & Debt: External debt: Undisbursed debt"
            }
          ],
          "type": "topic"
        },
        {
          "name": " National accounts",
          "children": [
            {
              "name": " Adjusted savings & income",
              "type": "topic",
              "path": "Economic Policy & Debt: National accounts: Adjusted savings & income"
            },
            {
              "name": " Atlas GNI & GNI per capita",
              "type": "topic",
              "path": "Economic Policy & Debt: National accounts: Atlas GNI & GNI per capita"
            },
            {
              "name": " Growth rates",
              "children": [
                {
                  "name": "",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Growth rates:"
                }
              ],
              "type": "topic",
              "path": "Economic Policy & Debt: National accounts: Growth rates"
            },
            {
              "name": " Local currency at constant prices",
              "children": [
                {
                  "name": " Aggregate indicators",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Local currency at constant prices: Aggregate indicators"
                },
                {
                  "name": " Expenditure on GDP",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Local currency at constant prices: Expenditure on GDP"
                },
                {
                  "name": " Other items",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Local currency at constant prices: Other items"
                },
                {
                  "name": " Value added",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Local currency at constant prices: Value added"
                }
              ],
              "type": "topic"
            },
            {
              "name": " Local currency at current prices",
              "children": [
                {
                  "name": " Aggregate indicators",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Local currency at current prices: Aggregate indicators"
                },
                {
                  "name": " Expenditure on GDP",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Local currency at current prices: Expenditure on GDP"
                },
                {
                  "name": " Value added",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: Local currency at current prices: Value added"
                }
              ],
              "type": "topic"
            },
            {
              "name": " Shares of GDP & other",
              "type": "topic",
              "path": "Economic Policy & Debt: National accounts: Shares of GDP & other"
            },
            {
              "name": " US$ at constant 2010 prices",
              "children": [
                {
                  "name": " Aggregate indicators",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: US$ at constant 2010 prices: Aggregate indicators"
                },
                {
                  "name": " Expenditure on GDP",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: US$ at constant 2010 prices: Expenditure on GDP"
                },
                {
                  "name": " Value added",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: US$ at constant 2010 prices: Value added"
                }
              ],
              "type": "topic"
            },
            {
              "name": " US$ at current prices",
              "children": [
                {
                  "name": " Aggregate indicators",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: US$ at current prices: Aggregate indicators"
                },
                {
                  "name": " Expenditure on GDP",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: US$ at current prices: Expenditure on GDP"
                },
                {
                  "name": " Value added",
                  "type": "topic",
                  "path": "Economic Policy & Debt: National accounts: US$ at current prices: Value added"
                }
              ],
              "type": "topic"
            }
          ],
          "type": "topic"
        },
        {
          "name": " Official development assistance",
          "type": "topic",
          "path": "Economic Policy & Debt: Official development assistance"
        },
        {
          "name": " Purchasing power parity",
          "type": "topic",
          "path": "Economic Policy & Debt: Purchasing power parity"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Education",
      "children": [
        {
          "name": " Efficiency",
          "type": "topic",
          "path": "Education: Efficiency"
        },
        {
          "name": " Inputs",
          "type": "topic",
          "path": "Education: Inputs"
        },
        {
          "name": " Outcomes",
          "type": "topic",
          "path": "Education: Outcomes"
        },
        {
          "name": " Participation",
          "type": "topic",
          "path": "Education: Participation"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Environment",
      "children": [
        {
          "name": " Agricultural production",
          "type": "topic",
          "path": "Environment: Agricultural production"
        },
        {
          "name": " Biodiversity & protected areas",
          "type": "topic",
          "path": "Environment: Biodiversity & protected areas"
        },
        {
          "name": " Density & urbanization",
          "type": "topic",
          "path": "Environment: Density & urbanization"
        },
        {
          "name": " Emissions",
          "type": "topic",
          "path": "Environment: Emissions"
        },
        {
          "name": " Energy production & use",
          "type": "topic",
          "path": "Environment: Energy production & use"
        },
        {
          "name": " Freshwater",
          "type": "topic",
          "path": "Environment: Freshwater"
        },
        {
          "name": " Land use",
          "type": "topic",
          "path": "Environment: Land use"
        },
        {
          "name": " Natural resources contribution to GDP",
          "type": "topic",
          "path": "Environment: Natural resources contribution to GDP"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Financial Sector",
      "children": [
        {
          "name": " Access",
          "type": "topic",
          "path": "Financial Sector: Access"
        },
        {
          "name": " Assets",
          "type": "topic",
          "path": "Financial Sector: Assets"
        },
        {
          "name": " Capital markets",
          "type": "topic",
          "path": "Financial Sector: Capital markets"
        },
        {
          "name": " Exchange rates & prices",
          "type": "topic",
          "path": "Financial Sector: Exchange rates & prices"
        },
        {
          "name": " Interest rates",
          "type": "topic",
          "path": "Financial Sector: Interest rates"
        },
        {
          "name": " Monetary holdings (liabilities)",
          "type": "topic",
          "path": "Financial Sector: Monetary holdings (liabilities)"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Health",
      "children": [
        {
          "name": " Disease prevention",
          "type": "topic",
          "path": "Health: Disease prevention"
        },
        {
          "name": " Health services",
          "type": "topic",
          "path": "Health: Health services"
        },
        {
          "name": " Mortality",
          "type": "topic",
          "path": "Health: Mortality"
        },
        {
          "name": " Nutrition",
          "type": "topic",
          "path": "Health: Nutrition"
        },
        {
          "name": " Population",
          "children": [
            {
              "name": " Dynamics",
              "type": "topic",
              "path": "Health: Population: Dynamics"
            },
            {
              "name": " Structure",
              "type": "topic",
              "path": "Health: Population: Structure"
            }
          ],
          "type": "topic"
        },
        {
          "name": " Reproductive health",
          "type": "topic",
          "path": "Health: Reproductive health"
        },
        {
          "name": " Risk factors",
          "type": "topic",
          "path": "Health: Risk factors"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Infrastructure",
      "children": [
        {
          "name": " Communications",
          "type": "topic",
          "path": "Infrastructure: Communications"
        },
        {
          "name": " Technology",
          "type": "topic",
          "path": "Infrastructure: Technology"
        },
        {
          "name": " Transportation",
          "type": "topic",
          "path": "Infrastructure: Transportation"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Poverty",
      "children": [
        {
          "name": " Income distribution",
          "type": "topic",
          "path": "Poverty: Income distribution"
        },
        {
          "name": " Poverty rates",
          "type": "topic",
          "path": "Poverty: Poverty rates"
        },
        {
          "name": " Shared prosperity",
          "type": "topic",
          "path": "Poverty: Shared prosperity"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Private Sector & Trade",
      "children": [
        {
          "name": " Business environment",
          "type": "topic",
          "path": "Private Sector & Trade: Business environment"
        },
        {
          "name": " Exports",
          "type": "topic",
          "path": "Private Sector & Trade: Exports"
        },
        {
          "name": " Imports",
          "type": "topic",
          "path": "Private Sector & Trade: Imports"
        },
        {
          "name": " Private infrastructure investment",
          "type": "topic",
          "path": "Private Sector & Trade: Private infrastructure investment"
        },
        {
          "name": " Tariffs",
          "type": "topic",
          "path": "Private Sector & Trade: Tariffs"
        },
        {
          "name": " Total merchandise trade",
          "type": "topic",
          "path": "Private Sector & Trade: Total merchandise trade"
        },
        {
          "name": " Trade facilitation",
          "type": "topic",
          "path": "Private Sector & Trade: Trade facilitation"
        },
        {
          "name": " Trade indexes",
          "type": "topic",
          "path": "Private Sector & Trade: Trade indexes"
        },
        {
          "name": " Travel & tourism",
          "type": "topic",
          "path": "Private Sector & Trade: Travel & tourism"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Public Sector",
      "children": [
        {
          "name": " Conflict & fragility",
          "type": "topic",
          "path": "Public Sector: Conflict & fragility"
        },
        {
          "name": " Defense & arms trade",
          "type": "topic",
          "path": "Public Sector: Defense & arms trade"
        },
        {
          "name": " Government finance",
          "children": [
            {
              "name": " Deficit & financing",
              "type": "topic",
              "path": "Public Sector: Government finance: Deficit & financing"
            },
            {
              "name": " Expense",
              "type": "topic",
              "path": "Public Sector: Government finance: Expense"
            },
            {
              "name": " Revenue",
              "type": "topic",
              "path": "Public Sector: Government finance: Revenue"
            }
          ],
          "type": "topic"
        },
        {
          "name": " Policy & institutions",
          "type": "topic",
          "path": "Public Sector: Policy & institutions"
        }
      ],
      "type": "topic"
    },
    {
      "name": "Social Protection & Labor",
      "children": [
        {
          "name": " Economic activity",
          "type": "topic",
          "path": "Social Protection & Labor: Economic activity"
        },
        {
          "name": " Labor force structure",
          "type": "topic",
          "path": "Social Protection & Labor: Labor force structure"
        },
        {
          "name": " Migration",
          "type": "topic",
          "path": "Social Protection & Labor: Migration"
        },
        {
          "name": " Performance",
          "type": "topic",
          "path": "Social Protection & Labor: Performance"
        },
        {
          "name": " Unemployment",
          "type": "topic",
          "path": "Social Protection & Labor: Unemployment"
        }
      ],
      "type": "topic"
    }
  ]}],
        radius: [0, '95%'],
        sort: null,
        levels: [{}, {
            r0: '15%',
            r: '35%',
            itemStyle: {
                borderWidth: 2
            },
            label: {
                rotate: 'tangential'
            }
        }, {
            r0: '35%',
            r: '70%',
            label: {
                align: 'right'
            }
        }, {
            r0: '70%',
            r: '72%',
            label: {
                position: 'outside',
                padding: 3,
                silent: false
            },
            itemStyle: {
                borderWidth: 3
            }
        }]
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
          embedded:`<h2 color="#eee"><center>not configured<center></h2><p>Use options dialog for configure this widget</p>`
        }
       
    }
    
}    
    