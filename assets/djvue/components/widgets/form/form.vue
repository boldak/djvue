<template>
  <div>
    
    <v-container v-if="isProductionMode && form && accessIsAlowed()">
      <v-layout align-center justify-end row fill-height>
        <v-btn flat color="primary" @click="submitForm()" :disabled="!needUpdateAnswer">Submit form</v-btn>
      </v-lauout>  
    </v-container>  
    
    <div v-if="!isProductionMode">
      <div v-if="loading" class="text-xs-center">
      </div>  

      <v-tabs v-else
        v-model="active"
        color="transparent"
      >
        <v-tab key="general" ripple>General</v-tab>
        <v-tab key="metadata" ripple>Metadata</v-tab>
        <v-tab key="access" ripple>Access</v-tab>
        <v-tab key="respondents" ripple  v-if="form.config.access.type=='invited'">Respondents</v-tab>
        <v-tab key="statistic" ripple>Statistic</v-tab>

        
        <v-tab-item key="general" ripple>
          <general-tab :form="form"></general-tab>
          <!-- <pre>{{JSON.stringify(form,null,"\t")}}</pre> -->
        </v-tab-item>


        <v-tab-item key="metadata" ripple>
          <v-card flat>
            <v-card-text>
                <metadata-tab :form="form" @update="updateFormMetadata"></metadata-tab>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="access" ripple>
          <v-card flat>
            <v-card-text>
              <access-tab :form="form" @update="updateFormAccess"></access-tab>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="respondents" ripple v-if="form.config.access.type=='invited'">
          <v-card flat>
            <v-card-text>
              <respondents-tab :form="form" @update="updateFormAccess"></respondents-tab>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item key="statistic" ripple>
          <v-card flat>
            <v-container>
              <v-layout>
                <p class="subheading">
                  Form {{`${(form.config.access.enabled)?'was opened':'was closed'} ${(form.config.access.lastNotificatedAt)?timeAgo(form.config.access.lastNotificatedAt):''}`}}
                </p>  
              </v-layout>  
              <v-divider></v-divider>
              <echart :options="chartOptions" height="250"></echart>
            </v-container>          
          </v-card>
        </v-tab-item>

      </v-tabs>


       <!--  <pre>
          {{JSON.stringify(answer, null,"\t")}}
        </pre>   -->
    </div>      
    
  </div>
</template>

<script>

  import djvueMixin from "djvue/mixins/core/djvue.mixin.js";
  import listenerMixin from "djvue/mixins/core/listener.mixin.js";
  import formIoMixin from "./mixins/form-io.mixin.js"
  import formAccessMixin from "./mixins/form-access.mixin.js"
  import components from "./parts/index.js"
 


 export default  {
    
    name:"form-widget",

    icon: "mdi-cards-variant",

    mixins:[djvueMixin, listenerMixin, formIoMixin, formAccessMixin],

    components,

    methods:{

      timeAgo(d) {
          return moment(new Date(d)).fromNow();
      },

      onPageStart(){
        this.loadForm(this.config.form)
          .then(this.initiateForm)
      },

      onSaveAppConfig(){
        this.loading = true
        this.updateForm(this.form).then( res => {
          this.loading = false
        })
      },

      submitForm(){
        if(this.needExtendForm){
          this.extendForm(this.form)
            .then(()=>{
              this.updateAnswer(this.answer)
                .then(() => {
                  this.needExtendForm = false;
                  this.needUpdateAnswer = false;
                  this.setNeedSave(false);
                })
            })
        } else {
          this.updateAnswer(this.answer)
            .then(() => {
              this.needExtendForm = false;
              this.needUpdateAnswer = false;
              this.setNeedSave(false);
            })
        }
      },

      isDeleteAvailable(){

          let widgets = [];

          _.toPairs(this.app.config.skin.holders)
              .map( h => h[1].widgets)
              .forEach( w => {
                  widgets = widgets.concat(w)
              })

          _.toPairs(this.app.currentPage.holders)
              .map( h => h[1].widgets)
              .forEach( w => {
                  widgets = widgets.concat(w)
              })
      
          let forms = widgets.filter( w => w.type == "question-widget")

          if(forms.length>0){
              this.$djvue.warning(
                  {
                      type: "error",
                      title: "Cannot delete form",
                      text: "One or many questions detected on page. Delete all questions before."   
                  }
              )
              return false;   
          }
          return true;
      },

      onDelete(){
        this.deleteForm(this.form.id)
      },

      updateFormMetadata(newMetadata){
        this.form.metadata = newMetadata
        this.setNeedSave(true)
      },

      updateFormAccess(access){

        this.loading = true
        
        if(access.enabled != this.config.enabled){
          this.form.config.access.lastNotificatedAt = new Date();
        }
        
        this.form.config.access = access;
        
        this.updateForm(this.form).then( res => {
          this.loading = false
        })
      },



      createFormRequest(){

        let notificationTemplate = 
`
<p>
  Dear {{respondent.name || 'Respondent'}}!
</p> 
<p>
  We invite you to take part in the survey 
  <a href="{{metadata.app_url.value}}">
    {{metadata.app_title.value}}
  </a>
</p>

`
        
        let f = {
          metadata: {
            app_name: {value: this.app.config.name, required:true, editable:false},
            app_title: {value: this.app.config.title, required:true, editable:false},
            app_url: {value: window.location.href, required:true, editable:false},
            app_icon: {value: this.app.config.icon, required:true, editable:false},
            form_title: {value: "Form title...", required:true, editable:true},
            form_note: {value: "Form note...", required:true, editable:true}
          },
          config:{
           access:{
              type:"any", // ["any","users", "invited"]
              enabled:false,
              users:[],
              notificationTemplate: notificationTemplate,
              notificationSubject: "DJVUE-FORMS"
            },
            questions:[]
          }
        }
        
        return this.createForm(f)
      },

      initiateForm(form){
        form.config.access.users = form.config.access.users || []
        form.config.questions = form.config.questions || []
         
        this.form = form
        this.loading = false
        if(this.accessIsAlowed()){
          this.emit("question-set-options", this.form.config.questions)
          // if(this.isProductionMode){
            this.loadAnswer(this.app.user, this.form.id)
            .then(res => {
              this.answer = res;
              this.emit("question-set-answers", this.answer.data)
            })
            this.getStat(this.form.id).then(res => {
              this.stat = res
              this.emit("question-set-stat", this.stat)


              let d = this.getResponseDynamic(this.stat)
              
              this.chartOptions = {

                  title: {
                      left: 'center',
                      text: 'Form access pulse',
                      textStyle:{
                        fontSize: 14,
                        fontWeight:"lighten"
                      }
                  },
   
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },

                  color: [this.$vuetify.theme.primary],

                  xAxis : [
                      {
                          type : 'category',
                          data : d.map( item => item.title),
                          axisTick: {
                              alignWithLabel: true
                          }
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value'
                      }
                  ],

                  series : [
                      {
                        type: 'line',
                        showSymbol:true,
                        step:"middle",
                        data:d.map( item => item.value),
                        areaStyle: {
                          opacity:0.25
                        }
                      }
                  ]
              }
            })
          // }  
        }
      },

      redrawStat(){
          let stats = JSON.parse(JSON.stringify(this.chartOptions))
          this.chartOptions = {};
          this.$nextTick(()=>{
            this.chartOptions = stats
          })
        }

      
    },



    
    props:["config"],

    watch:{
      active(value){
        this.redrawStat()
      }
      // ,

      // isProductionMode(value){
      //   console.log("SWITCH MODE")
      //   this.emit("question-set-stat", this.stat)
      // }

    },


    created(){ 

      // console.log("QUERY STRING", this.getQueryString())
     
      if( !this.config.form ){
        this.createFormRequest()
          .then(res => {
            this.config.form =res.id
            // this.initiateForm(res)
            this.setNeedSave(true)
          })  
      } 
      // else {
      //   this.loadForm(this.config.form)
      //     .then(this.initiateForm)
      // }
      // this.createFormRequest()
      //  // this.loadForm(this.config.form)

      //  this.loadForm("5ab65265e95f9a542974d98c")
       
      //  .then(res => {
      //     this.form = res
      //     this.loading = false
      //     // this.config.form = "5c214b2c327cb41c1df5d847"
      //   }) 



      this.on({
        event: "form-insert-question",
        callback: (question) => {
          this.form.config.questions = this.form.config.questions || []
          this.form.config.questions.push(question)
          this.loading = true
          this.updateForm(this.form).then( res => {
            this.loading = false
            this.emit("question-set-options", this.form.config.questions)
          })
        },
        rule: () => true
      })

      this.on({
        event: "form-delete-question",
        callback: (questionId) => {
          let index = _.findIndex(this.form.config.questions, q => q.id == questionId)
          if(index>=0){
            this.form.config.questions.splice(index,1)
          }
          this.loading = true
          this.updateForm(this.form).then( res => {
            this.loading = false
          })
        },
        rule: () => true
      })

      this.on({
        event: "form-update-answer",
        callback: (answer) => {
          let index = _.findIndex(this.answer.data, a => a.id == answer.id)
          if(index >= 0){
            this.answer.data.splice(index,1,answer)
          } else {
            this.answer.data.push(answer)
          }
          this.needUpdateAnswer = true;
          this.setNeedSave(true)
          
        },
        rule: () => true
      })

      this.on({
        event: "form-extend",
        callback: () => {
          this.needExtendForm = true;
          this.needUpdateAnswer = true;
          this.setNeedSave(true)
        },
        rule: () => true
      })


    },

    mounted(){ this.$emit("init") },
    
    data: () =>({
      active:null,
      form:null,
      loading: true,
      answer:null,
      needExtendForm:false,
      needUpdateAnswer:false,
      stat:null,
      chartOptions:{}
    })

  }

</script>	