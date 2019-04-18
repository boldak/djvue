import snippets from "./snippets.js"

export default {

	name:"scatter1d-chart-widget",

    icon: "mdi-chart-scatterplot-hexbin",

    getInitialConfig(snippet){
        snippet = snippet || "default"
        let res = snippets[snippet] || snippets["default"]
        return res
    }    

}