let _dps = {

  createForm: `
            // createForm 
            client();
            set("owner")
            <?javascript
                $scope.form = {
                    metadata: $scope.form.metadata,
                    config: $scope.form.config,
                    owner:$scope.owner.client.user,
                    history:[
                        {
                            state:"created",
                            message:"Create form via "+$scope.owner.client.app,
                            user: $scope.owner.client.user,
                            date: new Date()
                        }
                    ]
                }
            ?>
            dml.insert(into:"form", values:{{form}})
        `,

    cloneForm: `
            // cloneForm 
            client();
            set("owner")
            <?javascript
                $scope.form.owner = $scope.owner.client.user;
                $scope.form.history.push({
                            state:"created",
                            message:"Clone form via "+$scope.owner.client.app,
                            user: $scope.owner.client.user,
                            date: new Date()
                })
            ?>
            dml.insert(into:"form", values:{{form}})
        `,    

  updateForm: `
        // updateForm
            client();
            set("owner")

            <?javascript

                $scope.updatedForm = (item) => item.id == $scope.form.id;
                $scope.update = (item) => {
                    
                    // $scope.form.history.push({
                    //     date: new Date(),
                    //     message:"Update form",
                    //     state:"updated",
                    //     user: $scope.owner.client.user
                    // });
                    
                    return $scope.form;
                };

            ?>

            dml.update(for:"form", as:{{update}}, where:{{updatedForm}})
        `,

  extendForm: `
        // extendForm
            <?javascript
    
                $scope.updatedForm = (item) => item.id == $scope.form.id;
                
                $scope.extendNominals = (item) => {
                  for(let q of Object.keys(item.config.questions)){
                    let qo = item.config.questions[q].options.nominals;
                    if(qo && $scope.form.config.questions[q] && $scope.form.config.questions[q].options.nominals){
                      qo = _.extend(qo,$scope.form.config.questions[q].options.nominals)
                    }
                  }
                  return item
                }
    
            ?>


            dml.update(for:"form", as:{{extendNominals}}, where:{{updatedForm}})
            
        `,


  getForm: `
            // getForm
            <?javascript
                $scope.filter = (item) => item.id == $scope.form;
            ?>

            dml.select(from:"form", where:{{filter}}, populate:"project")
        `,

  deleteForm: `
            // deleteForm
            <?javascript
                $scope.filter = (item) => item.id == $scope.form;
            ?>

            dml.delete(from:"form", where:{{filter}})
    `,

  updateAnswer: `
            // updateAnswer
            dml.insertOrUpdate(into:"answer", value:{{answer}})
    `,

  getAnswer: `
      // getAnswer
      
      <?javascript

        $scope.forUser = item => {
        
            if(!$scope.form) return false;
                     
            if($scope.user.apikey){
                return (item.form == $scope.form) && (item.user.apikey == $scope.user.apikey);
            }
            
            if($scope.user.id){
                return (item.form == $scope.form) && (item.user.id == $scope.user.id);
            }
            
            return false;
        }    
              
        $scope.byDate = _util.comparator.Date["Z-A"](item => item.updatedAt)

      ?>

      dml.select(from:"answer",where:{{forUser}})
      sort({{byDate}})
      select("$[0]")

    `,
    loadResponseStat:
    `
        <?javascript
          $scope.f = item => item.form == $scope.form;
          $scope.map = (item,index) => {return {date:item.updatedAt,v:1}};
          $scope.sort = _util.comparator.Date["A-Z"](item => item.date);
        ?>

        dml.select(from:"answer", where:{{f}}, as:{{map}})
        json()
        sort({{sort}})
    `,
    exportResponses:`
        

        // exportResponses

        //<?javascript
        //    $scope.form_id = "5aa657defdaef838271d946f";
        //
        //?>

        <?javascript
            $scope.forForm = (item) => item.form == $scope.form_id;
            $scope.isForm = (item) => item.id == $scope.form_id;

            $scope.filename = $scope.form_id+"_"+_util.format.date(new Date(),"YYYY_MM_DD_HH_mm")+"_responses.csv";
        ?>

        dml.select(from:"answer", where:{{forForm}})
        set("answers")
        dml.select(from:"form", where:{{isForm}})
        set("form")

        <?javascript

        let questions = $scope.form[0].config.questions;

        let answers = $scope.answers.map ((a) => {
          a.data = _.pairs(a.data).map(d => {
            d[1].title = questions[d[0]].options.title;
            
            d[1].id = d[0];
            
            if (!d[1].value) {
              return d[1]
            }
            
            if( ["influences"].indexOf(d[1].type) >=0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: v.property,
                  property_title: questions[d[0]].options.properties[v.property].title,
                  value:v.value
                }
              }) 
            }

            if( ["pairs","radiopairs"].indexOf(d[1].type) >=0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: v.property,
                  property_title: questions[d[0]].options.properties[v.property].title,
                  value:1
                }
              }) 
            }

            if( ["radio","check","dropdown"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v,
                  entity_title: questions[d[0]].options.nominals[v].title,
                  property_id: "",
                  property_title:"",
                  value:1
                }
              }) 
            }
            
            if( ["scales"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: "",
                  property_title:"",
                  value:v.value
                }
              }) 
            }
            
            
            if( ["text","rate","range","datetime","scale"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: "",
                  entity_title: "",
                  property_id: "",
                  property_title:"",
                  value:(d[1].type=="datetime")? _util.format.date(new Date(v), "DD/MM/YY HH:mm") : v
                }
              }) 
            }
            
            return d[1];
          })
          return a;
        });





        let responses = [];

        answers = answers.forEach( a => {
            a.data.forEach( d => {
              if(d.value){
                d.value.forEach( v => {
                    responses.push({
                      response_id:a.id,
                      updatedAt: _util.format.date(a.updatedAt, "DD/MM/YY HH:mm"),
                      form:a.form,
                      respondent:(a.user.email)? a.user.email : "",
                      question_id: d.id,
                      question_title: d.title,
                      question_type: d.type,
                      valid:(d.valid)? 1 : 0,
                      entity_id: v.entity_id,
                      entity_title:v.entity_title,
                      property_id:v.property_id,
                      property_title:v.property_title,
                      value:v.value     
                    })
                  })    
              } 
            })
        });

        $scope.responses = responses;

        ?>

        get("responses")
        export({{filename}})


    `,
    loadAllResponses:
    `
      // loadAllResponses    
        <?javascript
            $scope.forForm = (item) => item.form == $scope.form_id;
            $scope.isForm = (item) => item.id == $scope.form_id;

            // $scope.filename = $scope.form_id+"_"+_util.format.date(new Date(),"YYYY_MM_DD_HH_mm")+"_responses.csv";
        ?>

        dml.select(from:"answer", where:{{forForm}})
        set("answers")
        dml.select(from:"form", where:{{isForm}})
        set("form")

        <?javascript

        let questions = $scope.form[0].config.questions;

        let answers = $scope.answers.map ((a) => {
          a.data = _.pairs(a.data).map(d => {
            d[1].title = questions[d[0]].options.title;
            
            d[1].id = d[0];
            
            if (!d[1].value) {
              return d[1]
            }
            
            if( ["influences"].indexOf(d[1].type) >=0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: v.property,
                  property_title: questions[d[0]].options.properties[v.property].title,
                  value:v.value
                }
              }) 
            }

            if( ["pairs","radiopairs"].indexOf(d[1].type) >=0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: v.property,
                  property_title: questions[d[0]].options.properties[v.property].title,
                  value:1
                }
              }) 
            }

            if( ["radio","check","dropdown"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v,
                  entity_title: questions[d[0]].options.nominals[v].title,
                  property_id: "",
                  property_title:"",
                  value:1
                }
              }) 
            }
            
            if( ["scales"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: v.entity,
                  entity_title: questions[d[0]].options.entities[v.entity].title,
                  property_id: "",
                  property_title:"",
                  value:v.value
                }
              }) 
            }
            
            
            if( ["text","rate","range","datetime","scale"].indexOf(d[1].type) >= 0 ){
              d[1].value = d[1].value.map(v => {
                return {
                  entity_id: "",
                  entity_title: "",
                  property_id: "",
                  property_title:"",
                  value:(d[1].type=="datetime")? _util.format.date(new Date(v), "DD/MM/YY HH:mm") : v
                }
              }) 
            }
            
            return d[1];
          })
          return a;
        });





        let responses = [];

        answers = answers.forEach( a => {
            a.data.forEach( d => {
              if(d.value){
                d.value.forEach( v => {
                    responses.push({
                      response_id:a.id,
                      updatedAt: _util.format.date(a.updatedAt, "DD/MM/YY HH:mm"),
                      form:a.form,
                      respondent:(a.user.email)? a.user.email : "",
                      question_id: d.id,
                      question_title: d.title,
                      question_type: d.type,
                      valid:(d.valid)? 1 : 0,
                      entity_id: v.entity_id,
                      entity_title:v.entity_title,
                      property_id:v.property_id,
                      property_title:v.property_title,
                      value:v.value     
                    })
                  })    
              } 
            })
        });

        $scope.responses = responses;

        ?>

        get("responses")

    `,
    findUserProfile: `
      // <?javascript
      //     $scope.email = "annakukharuk@gmail.com";
      //     $scope.email = "ishchenko.kpi@gmail.com";
      // ?>

      profile.find({{email}})
    `,
    getStat:`

// getStat

<?javascript
    // $scope.form = "5c24becd327cb41c1df5d85f"
    $scope.forForm = item => $scope.form && (item.form == $scope.form);
    $scope.filter = (item) => item.id == $scope.form;
    $scope.byDate = _util.comparator.Date["A-Z"](item => item.updatedAt);
    $scope.stat = {};
?>

dml.select(from:"answer",where:{{forForm}})
sort({{byDate}})
set("responses")
dml.select(from:"form", where:{{filter}})
set("form")

<?javascript
    
    $scope.stat.events = {
        total: $scope.responses.length,
        range: {
          min: $scope.responses[0].updatedAt,
          max: $scope.responses[$scope.responses.length-1].updatedAt
        },
        timeline: $scope.responses.map( r => ({
                        user: r.user,
                        date: r.updatedAt
                    }))
    }; 

?>

<?javascript

    let questions = $scope.form[0].config.questions;

    $scope.stat.questions = questions.map( q => ({
        id: q.id,
        responses: $scope.responses.map( r => {
            let f = _.find(r.data, a => a.id == q.id) 
            return (f) ? (f.data) ? f.data : null : null
        })
    }))


?>

return("stat")

    `
}


export default {

  methods:{
    
    createForm(form) {
      return this.$dps.run({
        script: _dps.createForm,
        state: { form: form }
      }).then(res => res.data[0])

    },

    cloneForm(form) {
      let f = Object.assign({}, form);
      f.config.cloned = form.id;
      f.metadata.app_url.value = location.href;
      delete f.id;
      delete f.updatedAt;
      delete f.createdAt;
      
      return this.$dps.run({
        script: _dps.cloneForm,
        state: { form: f }
      })

    },

    loadForm(formId) {

      return this.$dps.run({
        script: _dps.getForm,
        state: { form: formId }
      }).then(res => res.data[0])

    },

    updateForm(form) {

      return this.$dps.run({
        script: _dps.updateForm,
        state: { form: form }
      }).then(res => res.data[0])

    },

    extendForm(form) {
      return this.$dps.run({
        script: _dps.extendForm,
        state: { form: form }
      })
    },

    deleteForm(formId) {

      return this.$dps.run({
        script: _dps.deleteForm,
        state: { form: formId }
      })

    },

    findUserProfile(email) {

      return this.$dps.run({
        script: _dps.findUserProfile,
        state: { email: email }
      }).then(res => res.data)

    },

    loadAnswer(user,formId) {
      return this.$dps.run({
        script: _dps.getAnswer,
        state: {
          user: user,
          form: formId
        }
      }).then(res => {
        if(res.data) return res.data[0]
        return {
          form: formId,
          user: user,
          data: []
        }  
      })
    },

    updateAnswer(answer) {

      return this.$dps.run({
        script: _dps.updateAnswer,
        state: { answer: answer }
      })

    },

    getStat(formId) {
      return this.$dps.run({
        script: _dps.getStat,
        state: {
          form: formId
        }
      }).then( res => res.data )
    },

    round( date, start, level, value) {
      let defFormat = "YYYY-MM-DD HH:mm";
    
      let lo = moment(start).startOf(level).format(defFormat)
      let hi = moment(lo).add(value,level).format(defFormat)
      while(!(moment(date).isSameOrAfter(lo) && moment(date).isSameOrBefore(hi))){
        lo = hi;
        hi = moment(lo).add(value,level).format(defFormat);
      }

      let dLo = moment(date).diff(lo)
      let dHi = -moment(date).diff(hi)
      return (dLo < dHi) ? lo: hi
    },

    getResponseDynamic(r) {
      let responses = r.events.timeline;
      //responses.push({date: new Date()})

      let defFormat = "YYYY-MM-DD HH:mm";
      let inputFormat = "DD/MM/YY HH:mm";


      let RStat = responses
          .map(item => moment(new Date(item.date)))
          .sort((a,b) => a.diff(b))
          .map(item => item.format(defFormat))

      
      let p = [
        ['m',1],
        ['m',5],
        ['m',10],
        ['m',15],
        ['m',20],
        ['m',30],
        ['h',1],
        ['h',2],
        ['h',4],
        ['h',12],
        ['d',1],
        ['d',3],
        ['d',7],
        ['M',1],
        ['M',3],
        ['M',6],
        ['y',1],
        ['y',2],
        ['y',5],
        ['y',10]
      ]
      
      
      let getPoints = (start, stop, level, value) => {
        let res =[];
        start = moment(start).add(-value,level).format(defFormat);
        stop = moment(new Date()).format(defFormat);
         
        let lo = moment(start).startOf(level).format(defFormat)
        let hi = moment(lo).add(value,level).format(defFormat)
        res.push(lo)
        while(!(moment(stop).isSameOrAfter(lo) && moment(stop).isSameOrBefore(hi))){
          lo = hi;
          hi = moment(lo).add(value,level).format(defFormat);
          res.push(lo)
        }
        res.push(hi)
        return res;      
      }

      

      let titleFormat = {
        'm' :['HH:mm',''],
        'h' :['DD.MM HH:','00'],
        'd' :['DD.MM',''],
        'M' :['MM.YY',''],
        'y' :['YYYY','']
      } 
      
      let u;
      
      for(u of p){
        if( (moment(RStat[RStat.length-1]).diff(RStat[0],u[0]) / u[1]) <= 24) break;
      }
      
      this.u = u;

      if(moment(RStat[RStat.length-1]).diff(RStat[0],u[0])<1) return;

      RStat = RStat.map(
        item => this.round(item,RStat[0],u[0],u[1])
      );

      let points = getPoints(RStat[0], RStat[RStat.length-1], u[0], u[1]);

      let stats = points.map(item => RStat.filter(t => moment(t).isSame(item,u[0])).length)
      let sum = stats.reduce((item,sum) => {return sum+item})
      
      
      if(sum==0){
            stats = stats.map(item => 0)
          }else{
            stats = stats.map(item => item)//sum )
          }
      
      let max = stats.reduce((item,max) => {return (max>item) ? max : item})
          
      RStat = points.map((item,index) => {
        return {
          title: moment(item).format(titleFormat[u[0]][0])+titleFormat[u[0]][1],
          value: stats[index],
          height: (max>0) ? stats[index]/max : 0
        }
      })

      this.points = points;
      return RStat;
    }

  }
}