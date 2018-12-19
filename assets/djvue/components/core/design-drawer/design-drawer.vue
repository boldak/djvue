<template>
  <v-navigation-drawer v-model="drawer" fixed app>
    <v-toolbar flat dense :color="(!isNeedSave)?'primary':'warning'" dark>
      <v-btn icon @click="emit('design-drawer-hide')">
        <v-icon class="mdi-flip-h">mdi-exit-to-app</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Settings</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="isNeedSave" @click="saveAppConfig">
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list dense>
      <template v-for=" ( s, index ) in settings ">
        <v-list-group v-if="s.children" v-model="s.model">
          <v-subheader slot="activator" class="text--primary">
            {{s.text}}
          </v-subheader>
          <div v-for=" c in s.children" v-if="s.children">
            <v-layout align-center justify-center row fill-height v-if="c.combo">
              <v-flex xs12 pa-3 justify-center>
                <v-combobox v-model="c.selection" :items="c.items" :label="c.text" @change="c.onChange">
                  <template slot="item" slot-scope="data">
                    <v-avatar tile size=24>
                      <dj-img :src="data.item.icon" icon="mdi-application" width="24"></dj-img>
                    </v-avatar>
                    <span style="padding-left:1em;" class="caption">{{data.item.name}}</span>
                  </template>
                  <template slot="selection" slot-scope="data">
                    <v-avatar tile size=24>
                      <dj-img :src="data.item.icon" icon="mdi-application" small width="24"></dj-img>
                    </v-avatar>
                    <span style="padding-left:1em;" class="caption">{{data.item.name}}</span>
                  </template>
                </v-combobox>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height v-if="c.select">
              <v-flex xs12 pa-3 justify-center>
                <v-autocomplete v-model="c.selection" :items="c.items" multiple chips color="blue-grey lighten-2" :label="c.text" item-text="name" @change="c.onChange(c.selection)">
                  <template slot="selection" slot-scope="data">
                    <v-chip style="border:none !important" outline :selected="data.selected" close class="chip--select-multi" @input="c.remove(c.selection, data.item)">
                      <v-avatar>
                        <dj-img :src="data.item.photo" icon="mdi-account">
                      </v-avatar>
                      {{ data.item.name + ((data.item.isAdmin)?' (Admin)':'') }}
                    </v-chip>
                  </template>
                  <template slot="item" slot-scope="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-tile-content v-text="data.item"></v-list-tile-content>
                    </template>
                    <template v-else>
                      <v-avatar>
                        <dj-img :src="data.item.photo" icon="mdi-account">
                      </v-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name + ((data.item.isAdmin)?' (Admin)':'')"></v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-flex>
            </v-layout>
            <v-list-tile v-if="!c.groupAction&&!c.divider&&!c.select&&!c.combo" @click="(c.action) ? c.action(c) : (()=>{})()" :class="{'blue-grey lighten-4': c.selected}">
              <v-list-tile-action>
                <v-list-tile-avatar tile size="24" v-if="c.avatar">
                  <dj-img :src="c.avatar.src" :icon="c.avatar.icon">
                </v-list-tile-avatar>
                <v-icon v-if="c.icon" size="24"> {{c.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>
                  {{c.text}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-flex v-else-if="c.groupAction" xs12 class="text-xs-right">
              <v-btn color="primary" small flat @click="c.groupAction.action">
                {{c.groupAction.text}}
              </v-btn>
            </v-flex>
            <v-divider v-else-if="c.divider"></v-divider>
          </div>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>

import djvueMixin from "djvue/mixins/core/djvue.mixin.js"
import listenerMixin from "djvue/mixins/core/listener.mixin.js"

import i18nManager from "./i18n-manager.vue"
Vue.prototype.$dialog.component('i18nManager', i18nManager)

import ResourcesManager from "./resources-manager.vue"
Vue.prototype.$dialog.component('ResourcesManager', ResourcesManager)

import PageManager from "./page-manager.vue"
Vue.prototype.$dialog.component('PageManager', PageManager)


import AppSettingsDialog from "./app-settings-dialog.vue"
Vue.prototype.$dialog.component('AppSettingsDialog', AppSettingsDialog)


export default {

  mixins: [djvueMixin, listenerMixin],

  data() {

    return {

      drawer: false,
      user,
      author,
      settings: [],
      userlist: [],
      resources: [],
      appList: [],
      portalConfig: {}
    }

  },

  computed: {
    dpsURL() {
      return this.$dps.getBaseURL()
    }
  },

  methods: {


    // saveAppConfig() {
    //   this.app.config.pages = JSON.parse(JSON.stringify(this.app.pages))
    //   this.app.config.skin = JSON.parse(JSON.stringify(this.app.skin))
    //   this.app.config.appWidgets = undefined;
    //   this.app.config.skinName = undefined;

    //   // console.log("SAVE", JSON.stringify(this.app.config,null,"\t"))

    //   this.$portal.put(`api/app/config/${this.app.config.id}`, this.app.config)
    //     .then(() => {
    //       if (this.app.oldName != this.app.config.name) {
    //         this.$djvue.fullReload(`app/${this.app.config.name}/`)
    //       }
    //     })
    //   this.setNeedSave(false)
    // },

    onChangeCollaborations(selection) {
      // console.log("onChangeCollaborations", JSON.stringify(selection,null,"\t"))
      // console.log(JSON.stringify(this.userList))
      this.app.config.collaborations = JSON.parse(JSON.stringify(selection.map(name => _.find(this.userlist, u => u.name == name))))
      this.setNeedSave(true)
    },

    removeCollaborator(selection, item) {
      const index = _.findIndex(selection, s => s == item.name)
      if (index >= 0) selection.splice(index, 1)
      this.onChangeCollaborations(selection)
    },

    onChangeDefaultConfig(selection) {
      this.$portal.post("api/app/config/set",{config:{defaultApp: selection.name}})
        .then((resp) => {
          console.log(resp)
        })  
    },

    onChangeAdmins(selection) {

      let data = this.userlist.map(u => ({
        email: u.email,
        value: _.findIndex(selection, s => s == u.name) >= 0
      }))

      Promise.all(data.map(u => this.$portal.post("/api/admin/set", u)))
        .then(() => {
          this.$portal.get("/api/users/list")
            .then(res => {

              this.userList = res.data
              // console.log(JSON.stringify(this.userlist, null,"\t"))
              let s = _.find(this.settings, s => s.text == "PORTAL").children[0]
              s.items = this.userList
              s.selection = this.userList.filter(u => u.isAdmin).map(u => u.name)

            })
        })

    },

    removeAdmin(selection, item) {
      const index = _.findIndex(selection, s => s == item.name)
      if (index >= 0) selection.splice(index, 1)
      this.onChangeAdmins(selection)
    },


    getPageInfo(page) {

      if (!page) return {}
      if (!this.app.currentPage) return {}

      return {
        icon: "mdi-file-document-outline",
        text: page.title,
        action: (item) => { this.go(item.path) },
        path: (page.id) ? '/' + page.id : '/',
        selected: page.id == this.app.currentPage.id
      }
    },


    openAppSettingsDialog() {
      this.$dialog.showAndWait(AppSettingsDialog)
        .then(res => {
          if (res) {
            this.app.config = Object.assign(this.app.config, res)
            // console.log(JSON.stringify(this.app.config, null, "\t"))
            this.$dps.setBaseURL(this.app.config.dpsURL)
            this.settings.find(item => item.text == "APPLICATION").children = [{
                avatar: {
                  src: this.app.config.icon,
                  icon: "mdi-application"
                },
                text: this.app.config.name
              },
              {
                icon: "mdi-subtitles",
                text: this.app.config.title
              },
              {
                icon: "mdi-text",
                text: this.app.config.description
              },
              {
                icon: "mdi-cloud",
                text: this.app.config.dpsURL
              },
              {
                groupAction: { text: "edit...", action: this.openAppSettingsDialog }
              }
            ]
            this.emit("widget-update", this)
            this.setNeedSave(true)

          } else {
            // console.log("reject")
          }
        })
    },

    openI18nManager() {
      this.$dialog.showAndWait(i18nManager, { i18n: this.app.config.i18n })
        .then(res => {
          if (res) {
            // console.log("resolve",res) 
            this.$i18n.setLocaleMessage("en", res.en)
            this.$i18n.setLocaleMessage("uk", res.uk)
            this.emit("widget-update", this)
            this.app.config.i18n = res;
            this.setNeedSave(true)

          } else {
            // console.log("reject")
          }
        })
    },

    openResourcesManager() {
      this.$dialog.showAndWait(ResourcesManager)
        .then(() => {
          this.$portal.get("./api/resource")
            .then(res => {
              this.settings.find(item => item.text == "RESOURCES").children[0].text = `Available ${res.data.length} items`
              this.emit("widget-update", this)
            })
        })
    },

    openPageManager() {
      this.$dialog.showAndWait(PageManager)
        .then(() => {
          this.settings.find(item => item.text == "PAGES").children = this.app.pages
            .map(p => { return this.getPageInfo(p) })
            .concat({
              groupAction: {
                text: "manage...",
                action: this.openPageManager
              }
            })
          this.emit("widget-update", this)
          this.setNeedSave(true)
        })
    },

    getResources() {
      this.$portal.get("./api/resource")
        .then(res => {
          this.resources = res.data;
        })
    },


    loadAppList() {
      this.$portal
        .get('api/app/get-list')
        .then(response => {
          this.appList = response.data
          this.loadPortalConfig()
        })
    },

    loadPortalConfig() {
      this.$portal
        .get("/api/app/config/get")
        .then(response => {
          this.portalConfig = response.data
          this.portalConfig.defaultApp = _.find(this.appList, a => a.name = this.portalConfig.defaultApp)
        })
    },

    getSettings() {


      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")          

      return [

        {
          text: "PORTAL",
          model: false,
          children: [{
              select: true,
              items: this.userlist,
              selection: this.userlist.filter(u => u.isAdmin).map(u => u.name),
              remove: this.removeAdmin,
              onChange: this.onChangeAdmins,

              text: "Admins"
            },

            {
              combo: true,
              text: "Default App",
              items: this.appList,
              selection: this.portalConfig.defaultApp,
              onChange: this.onChangeDefaultConfig
            }

          ]
        },

        {
          text: "APPLICATION",
          model: false,
          children: [{
              avatar: {
                src: this.app.config.icon,
                icon: "mdi-application"
              },
              text: this.app.config.name
            },
            {
              icon: "mdi-subtitles",
              text: this.app.config.title
            },
            {
              icon: "mdi-text",
              text: this.app.config.description
            },
            {
              icon: "mdi-cloud",
              text: this.app.config.dpsURL
            },
            {
              groupAction: { text: "edit...", action: this.openAppSettingsDialog }
            }
          ]
        },
        {
          text: "TEAM",
          model: false,
          children: [
            { avatar: { src: author.photo, icon: "mdi-account" }, text: author.name + " (Author)" },
            {
              select: true,
              items: this.userlist.filter(u => u.name != this.author.name),
              selection: this.app.config.collaborations.map(u => u.name),
              remove: this.removeCollaborator,
              onChange: this.onChangeCollaborations,
              text: "Collaborators"
            }
          ]
        },
        {
          text: "PAGES",
          model: true,
          children: this.app.pages
            .map(p => { return this.getPageInfo(p) })
            .concat({
              groupAction: {
                text: "manage...",
                action: this.openPageManager
              }
            })
        },
        {
          text: "RESOURCES",
          children: [{
              icon: "mdi-note-multiple-outline",
              text: `Available ${this.resources.length} items`
            },
            {
              groupAction: { text: "manage...", action: this.openResourcesManager }
            }
          ]
        },
        {
          text: "I18n",
          children: [{
              icon: "mdi-note-multiple-outline",
              text: `Available ${_.toPairs(this.app.config.i18n.en).length} items`
            },
            {
              groupAction: { text: "manage...", action: this.openI18nManager }
            }
          ]
        }
      ]
    }

  },

  mounted() {
    this.getResources();
    this.loadAppList();
    // this.loadPortalConfig();
  },


  created() {

    // console.log("CONFIG", JSON.stringify(this.app.config,null,"\t"))

    this.$portal.get("/api/users/list")
      .then(res => {
        this.userlist = res.data
        // console.log(JSON.stringify(this.userlist, null,"\t"))
      })



    let en = _.toPairs(this.app.config.i18n.en).map(l => ({ key: l[0], en: l[1] }))
    let uk = _.toPairs(this.app.config.i18n.uk).map(l => ({ key: l[0], uk: l[1] }))

    this.translations = _.union(
      en.map(r => r.key),
      uk.map(r => r.key)
    )

    this.translations = this.translations.map(item => {
      let e = _.find(en, r => r.key == item)
      let u = _.find(uk, r => r.key == item)
      return {
        key: item,
        en: (e) ? e.en : "",
        uk: (u) ? u.uk : ""
      }
    })


    this.on({
      event: "design-drawer-show",
      callback: () => { this.drawer = true },
      rule: () => true
    });

    this.on({
      event: "design-drawer-hide",
      callback: () => { this.drawer = false },
      rule: () => true
    });

    this.on({
      event: "page-start",
      callback: () => { this.settings = this.getSettings() },
      rule: () => true
    })

  },

  destroyed() {
    this.off()
  }

}

</script>
