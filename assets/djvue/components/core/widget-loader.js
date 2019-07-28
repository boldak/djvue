import widgetTypesMap from "djvue/components/widgets/map.js"


export default () => {
  let _appConfig = JSON.parse( sessionStorage.getItem("application-config"))
  console.log(_appConfig)
  let wt = []
  
  _appConfig.pages.forEach( p => {
    let ht = []
    _.values(p.holders).forEach( h => {
      ht = ht.concat(h.widgets.map(w => w.type))
    })
    wt = wt.concat(ht)
  })

  _.values(_appConfig.skin.holders).forEach( h => {
      wt = wt.concat(h.widgets.map(w => w.type))
    })

  wt = _.uniq(wt)
  // console.log("Required widget types", wt)

  let _mode = Cookie.get("mode") || "production"

  if( _mode == "development") {
    let res = _.zipObject(
              _.keys(widgetTypesMap),
              _.values(widgetTypesMap).map( w => () => import(w))
    )
    // console.log(res)
    return res
  
  } else {
    let res = _.zipObject(
              wt,
              wt.map( w => () => import(widgetTypesMap[w]))
            )
    // console.log(res)
    return res  
  }  
}



