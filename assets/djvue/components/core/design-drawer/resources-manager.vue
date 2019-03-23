<template>
  <v-card>
    <v-toolbar extended dark color="primary darken-2">
      <v-icon large>mdi-file-upload-outline</v-icon>
      <v-toolbar-title>{{translate("Resources_Manager")}}</v-toolbar-title>
      <v-toolbar-title class="subheading">( {{this.selected.length}} items selected )</v-toolbar-title>
      <v-btn fab dark icon absolute bottom left small color="secondary">
        <v-icon>mdi-plus</v-icon>
        <input type="file" v-on:change="fileChanged" style="transform: none !important;
                  width: 100%;
                  line-height: 2.5em;
                  margin-top: -50%;
                  cursor: pointer;" />
      </v-btn>
      <v-btn fab dark icon absolute bottom right small color="secondary" :disabled="selected.length == 0" @click="deleteResources()">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" prepend-icon="search" label="Search" single-line hide-details outline clearable></v-text-field>
    </v-toolbar>
    <v-data-table :headers="[{ text: 'Mime', value: 'mime', class:'text-xs-left'}, { text: 'URL', value: 'url', class:'text-xs-left'}, { text: ''}, { text: 'Upload by', value: 'owner', class:'text-xs-left'}]" :items.sync="resources" :search="search" v-model.sync="selected" item-key="url" select-all style="max-height:600px; overflow:auto;" :loading="loading" :hide-actions="resources.length < 5">
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" secondary hide-details></v-checkbox>
        </td>
        <td class="text-xs-left">
          <v-tooltip right tag="span">
            <v-avatar tile small slot="activator">
              <v-img :src="extIcon(props.item)"></v-img>
            </v-avatar>
            <span>{{ props.item.mime }}</span>
          </v-tooltip>
        </td>
        <td class="text-xs-left">
          <a :href="props.item.url" target="_blank">{{props.item.url}}</a>
        </td>
        <td>
          <v-tooltip right tag="span">
            <v-btn slot="activator" icon @click="$copyText(props.item.url)">
              <v-icon color="secondary">mdi-clipboard-text-outline</v-icon>
            </v-btn>
            <span>Copy url</span>
          </v-tooltip>
        </td>
        <td class="text-xs-left">
          {{ props.item.owner }}
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="commit">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import djvueMixin from "djvue/mixins/core/djvue.mixin.js"
import i18nMixin from "djvue/mixins/core/i18n.mixin.js"

import extIcon from "modules/ext-icons/index.js"


let i18n = {
  en:{
    "Resources_Manager": "Resources Manager"
  },

  uk:{
    "Resources_Manager": "Ресурси"
  }

}



export default {

  name: "ResourcesManager",

  mixins: [djvueMixin,i18nMixin],

  data: () => ({

    editMode: false,

    search: "",

    resources: [],

    selected: [],

    loading: false,

    i18n


  }),

  methods: {

    extIcon,

    fileChanged(e) {
      if (e) {
        if (this.onAddResource) {
          if (e.target.files) {
            if (!this.multiple && e.target.files[0]) {
              this.onAddResource(e.target.files[0]);
            } else if (this.multiple) {
              this.onAddResource(e.target.files);
            } else {
              this.onAddResource(null);
            }
          } else {
            this.onAddResource(null);
          }
        }
      }

    },

    onAddResource(file) {
      // console.log(file)
      if (!file) return
      this.loading = true;
      let formData = new FormData();
      formData.append("app", this.app.name)
      formData.append('file', file);
      this.$portal.post('/api/resource/update',
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(() => {
        this.getResources()
      }).catch(e => {
        this.$djvue.warning({
            type: "error",
            title: e.response.data.name,
            text: e.response.data.message
          })
          .then(() => { this.loading = false })
      })


    },

    getResources() {
      this.$portal.get("/api/resource")
        .then(res => {
          this.resources = res.data;
          this.loading = false
        })
    },


    deleteResources() {

      // console.log(JSON.stringify(this.selected, null, "\t")) 
      this.loading = true
      Promise.all(this.selected.map(resource => this.$portal.get("/api/resource/delete/" + resource.path)))
        .then(() => {
          this.selected = []
          this.search = ""
          this.getResources()
        })
    },

    commit() {
      this.$emit('submit', null)
    }

  },

  created() {
    this.getResources()
  }

}

</script>
