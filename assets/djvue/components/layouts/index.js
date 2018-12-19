
let l_1_2 = () => import("./l-1-2/l-1-2.vue")

l_1_2.getPageTemplate = () => ({
	layout:"layout-1-2",
	holders:{
		"Top": 			{widgets:[]},
		"Column 1": 	{widgets:[]},
		"Column 2": 	{widgets:[]}
	}
})


let l_1 = () => import("./l-1/l-1.vue")

l_1.getPageTemplate = () => ({
	layout:"layout-1",
	holders:{
		"Holder": 	{widgets:[]},
	}
})

let l_1_3_1 = () => import("./l-1-3-1/l-1-3-1.vue")

l_1_3_1.getPageTemplate = () => ({
	layout:"layout-1-3-1",
	holders:{
		"Top": 			{widgets:[]},
		"Column 1": 	{widgets:[]},
		"Column 2": 	{widgets:[]},
		"Column 3": 	{widgets:[]},
		"Bottom": 		{widgets:[]}
	}
})

let empty = () => import("./empty/empty.vue")
empty.getPageTemplate= () => ({
	layout: "empty"
})

export default {
      'empty' : empty,
      'layout-1-2' : l_1_2,
      'layout-1' : l_1,
      'layout-1-3-1':l_1_3_1
}