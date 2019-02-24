<template>
  <v-card>
    <v-toolbar extended dark color="primary darken-2">
      <v-icon large>mdi-file-document-box-multiple-outline</v-icon>
      <v-toolbar-title>Page Manager</v-toolbar-title>
      <v-toolbar-title class="subheading">( {{this.selected.length}} items selected )</v-toolbar-title>
      <v-btn fab dark icon absolute bottom left small color="secondary" class="ml-5" :disabled="selected.length != 1" @click="clonePage">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-dialog max-width="30%" v-model="newPageDialog" persistent>
        <v-btn fab dark icon absolute bottom left small color="secondary" slot="activator">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-card>
          <v-toolbar dark color="primary darken-2">
            <v-icon large>mdi-file-document-box-multiple-outline</v-icon>
            <v-toolbar-title>New Page</v-toolbar-title>
          </v-toolbar>
          <v-flex xs12 pl-3 pr-3 justify-center>
            <v-text-field label="Page title" v-model="newPageTitle">
            </v-text-field>
          </v-flex>
          <v-flex xs12 pl-3 pr-3 justify-center>
            <v-text-field label="Page path" v-model="newPageId" prefix="/" hint="Enter unique page path">
            </v-text-field>
          </v-flex>
          <v-flex xs12 pl-3 pr-3 justify-center>
            <v-combobox v-model="newPageLayout" :items="layouts" label="Select layout" @change="onChangeSelectedLayout">
              <template slot="item" slot-scope="data">
                <v-avatar tile size=24>
                  <dj-img :src="data.item.layoutIcon" icon="mdi-application" width="24"></dj-img>
                </v-avatar>
                <span style="padding-left:1em;" class="caption">{{data.item.name}}</span>
              </template>
              <template slot="selection" slot-scope="data">
                <v-avatar tile size=24>
                  <dj-img :src="data.item.layoutIcon" icon="mdi-application" small width="24"></dj-img>
                </v-avatar>
                <span style="padding-left:1em;" class="caption">{{data.item.name}}</span>
              </template>
            </v-combobox>
          </v-flex>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancelNewPageDialog">Cancel</v-btn>
            <v-btn flat color="primary" @click="commitNewPageDialog">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn fab dark icon absolute bottom right small color="secondary" :disabled="selected.length == 0" @click="deletePages()">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" prepend-icon="search" label="Search" single-line hide-details outline clearable></v-text-field>
    </v-toolbar>
    <v-data-table :headers="[{ text: 'Title', value: 'title', class:'text-xs-left'}, { text: 'Path', value: 'path', class:'text-xs-left'}, { text: 'Layout', value: 'layout', class:'text-xs-left'}]" :items.sync="pages" :search="search" v-model.sync="selected" item-key="path" select-all style="max-height:600px; overflow:auto;" :hide-actions="pages.length < 5">
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" secondary hide-details></v-checkbox>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item._title" lazy large @save="onSaveTitle(props.item)" @open="onEditTitle(props.item)"> {{props.item.title}}
            <v-text-field slot="input" v-model="props.item._title" label="Edit title"></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <!-- {{props.item.path}} -->
          <v-edit-dialog :return-value.sync="props.item._path" lazy large @save="onSavePath(props.item)" @open="onEditPath(props.item)"> {{props.item.path}}
            <v-text-field slot="input" v-model="props.item._path" label="Edit path" prefix="/"></v-text-field>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-avatar tile size=32>
            <v-img :src="props.item.layoutIcon">
          </v-avatar>
          {{ props.item.layout }}
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="commit">{{translate("#CLOSE")}}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import djvueMixin from "djvue/mixins/core/djvue.mixin.js"
import i18nMixin from "djvue/mixins/core/i18n.mixin.js"
import layouts from "djvue/components/layouts/index.js"


let i18n = {
      uk: {

        "#RELOAD": "всеодно перезавантажити",
        "#SAVE_RELOAD": "зберегти та перезавантажити",
        "#DO_YOU_WANT_TO_DELETE": "ви дійсно бажаєте видалити цю сторінку",
        "#CH_MAY_BE_NOT_SAVED": "внесені зміни, можливо, не буде збережено",
        "#CONFIG_CHANGED": "конфігурація змінена",
        "#OK": "так",
        "#NO": "ні",
        "#SAVE": "зберегти",
        "#CANCEL": "скасувати",
        "error": "помилка",
        "#Cannot_update_path": "Неможливо оновити шлях",
        "#CLOSE": "Закрити"
      },
      en: {
        "#RELOAD": "anyway reload",
        "#SAVE_RELOAD": "save and reloag",
        "#DO_YOU_WANT_TO_DELETE": "Do you really want to delete this page",
        "#CH_MAY_BE_NOT_SAVED": "The changes you made may not be saved",
        "#CONFIG_CHANGED": "configuration changed",
        "#OK": "ok",
        "#NO": "no",
        "#SAVE": "save",
        "#CANCEL": "cancel",
        "error": "error",
        "#Cannot_update_path": "Cannot update path",
        "#CLOSE": "Close"
      }
    }


export default {



  name: "PageManager",

  mixins: [djvueMixin, i18nMixin],

  // i18n: { messages: {} },


  data: () => ({

    search: "",

    selected: [],

    pages: [],

    layouts: [],

    newPageLayout: null,

    newPageId: '',

    newPageTitle: '',

    newPageDialog: false,

    
    i18n


  }),

  methods: {

    onEditTitle(item) {
      item._title = item.title
    },

    onSaveTitle(item) {
      if (item.title != item._title) {
        item.title = item._title
        this.search = item._title

        let page = _.find(this.app.pages, p => p.id == item.id)
        if (page) {
          page.title = item.title;
          this.getPages()
        }
      }
    },

    onEditPath(item) {
      item._path = item.path.substring(1)

    },

    onSavePath(item) {



      let newPath = (item._path) ? '/' + item._path : '/'
      if (item.path != newPath) {
        if (_.findIndex(this.app.pages, p => ((p.id) ? (p.id == item._path) : (!item._path))) >= 0) {

          this.$djvue.warning({
            type: "error",
            title: this.translate("#Cannot_update_path"),
            text: `Doublicate page pathes "${newPath}" detected`
          })
          return
        }


        item.path = newPath
        this.search = newPath

        let page = _.find(this.app.pages, p => p.id == item.id)
        if (page) {
          page.id = item._path;

          this.getPages()
        }
      }
    },

    cancelNewPageDialog() {
      this.newPageDialog = false;
    },

    commitNewPageDialog() {
      if (!this.newPageLayout) {
        this.$djvue.warning({
          type: "error",
          title: "Cannot add page",
          text: "Page layout not defined"
        })
        return
      }

      this.newPageDialog = false;
      // console.log(this.newPageLayout)
      let newPage = this.newPageLayout.getPageTemplate()
      newPage.id = this.newPageId;
      newPage.title = this.newPageTitle;
      this.app.pages.push(newPage)
      this.getPages()
    },


    onChangeSelectedLayout(layout) {
      this.newPageLayout = layout
    },

    getPages() {
      this.pages = this.app.pages.map(p => ({
        id: p.id,
        path: (p.id) ? '/' + p.id : '/',
        _path: p.id,
        title: p.title,
        _title: p.title,
        layout: p.layout,
        layoutIcon: `djvue/components/layouts/icons/${p.layout}.png`
      }))
    },

    getLayouts() {
      this.layouts = _.toPairs(layouts).map(l => ({
        id: l[0],
        name: l[0],
        layoutIcon: `djvue/components/layouts/icons/${l[0]}.png`,
        data:l[1].data,
        getPageTemplate: l[1].getPageTemplate
      })).filter(l => l.id != "empty")
    },

    clonePage() {
      let cloned = _.find(this.app.pages, p => p.id == this.selected[0].id);
      let clone = JSON.parse(JSON.stringify(cloned))
      clone.id = ((clone.id) ? clone.id : '') + "clone";
      clone.title = clone.title + " (Clone)"
      // console.log(JSON.stringify(clone, null, "\t"))
      this.app.pages.push(clone)
      this.getPages()

    },


    deletePages() {

      this.selected.forEach(page => {

        if (page.id == this.app.currentPage.id) {
          this.$djvue.warning({
            type: "error",
            title: "Cannot delete page" + page.title,
            text: "Switch to another page and delete " + page.title + " page"
          })
          return
        }

        let pageIndex = _.findIndex(this.app.pages, p => p.id == page.id)
        if (pageIndex >= 0) {
          this.app.pages.splice(pageIndex, 1)
        }
      })

      this.selected = []
      this.search = ""
      this.getPages()

    },

    commit() {
      this.$emit('submit', null)
    }

  },

  created() {
    this.getPages()
    this.getLayouts()

  }

}

</script>
