<template>
	<v-layout column wrap pa-2>

          <v-flex>
            <v-text-field
              :value="config.id"
              label="Widget Id"
              disabled
            ></v-text-field>
          </v-flex>

          <v-flex>
            <v-text-field
              v-model="config.name"
              label="Name"
            ></v-text-field>
          </v-flex>
          <v-divider></v-divider>
          <v-switch
            label="Use pagination"
            v-model="config.options.usePagination"
            color="primary"
             @change="onChangePagination"
          ></v-switch>
          <v-flex v-if="enablePages">
            <v-text-field
              v-model="pagination"
              label="Rows per page"
            ></v-text-field>
          </v-flex>
          


     </v-layout>      
</template>	

<script>

	export default {
		name:"name-editor",
		props:["config"],
    
    
    data: () => ({
      pagination:null,
      enablePages:false
    }),

    watch:{
      pagination(value){
        this.config.options.rowsPerPage = value.split(",").map( d => Number.parseFloat(d.trim())).concat({text:"All", value:-1})
      }
    },

    methods:{
      onChangePagination(value){
        this.enablePages = value
      }
    },

    created(){
      this.config.options.rowsPerPage = this.config.options.rowsPerPage || [
          5,
          10,
          25,
          {
            text: 'All',
            value: -1
          }
        ] 
      
      let ranges = JSON.parse(JSON.stringify(this.config.options.rowsPerPage)).filter(d => !d.text)
      this.pagination = ranges.join(", ")
      this.enablePages = this.config.options.usePagination
    }
	}
</script>