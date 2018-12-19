<template>
  <v-card>
    <v-toolbar extended dark color="primary darken-2">
      <v-icon large>mdi-translate</v-icon>
      <v-toolbar-title>I18n Manager</v-toolbar-title>
      <v-toolbar-title class="subheading">( {{this.selected.length}} items selected )</v-toolbar-title>
      <v-btn fab dark icon absolute bottom left small color="secondary" @click="addTranslation()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark icon absolute bottom right small color="secondary" @click="removeTranslations()" :disabled="selected.length == 0">
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" prepend-icon="search" label="Search" single-line hide-details outline clearable></v-text-field>
    </v-toolbar>
    <v-data-table :headers="[{ text: 'Key', value: 'key', class:'text-xs-left'}, { text: 'Locale EN', value: 'en', class:'text-xs-left'}, { text: 'Locale UA', value: 'ua', class:'text-xs-left'}]" :items.sync="translations" :search="search" v-model.sync="selected" item-key="id" select-all style="max-height:600px; overflow:auto;">
      <template slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected" secondary hide-details></v-checkbox>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item._key" large lazy @save="onSaveValue(props.item)" @cancel="onSaveValue(props.item)" @open="onEditValue(props.item)" @close="onSaveValue(props.item)">
            {{ props.item.key }}
            <v-textarea slot="input" v-model="props.item._key" label="Edit" large lazy></v-textarea>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item.en" large lazy> {{ props.item.en }}
            <v-textarea slot="input" v-model="props.item.en" label="Edit"></v-textarea>
          </v-edit-dialog>
        </td>
        <td class="text-xs-left">
          <v-edit-dialog :return-value.sync="props.item.uk" large lazy> {{ props.item.uk }}
            <v-textarea slot="input" v-model="props.item.uk" label="Edit"></v-textarea>
          </v-edit-dialog>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
      <v-btn flat color="primary" @click="commit">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {

  name: "i18nManager",

  props: ["i18n"],

  data: () => ({

    editMode: false,

    search: "",

    translations: [],

    selected: []
  }),

  methods: {

    onEditValue(item) {
      item._key = item.key
    },

    onSaveValue(item) {
      if (item.key != item._key) {
        item.key = item._key
        this.search = item._key
      }
    },

    addTranslation() {

      let newItem = { id: this.$djvue.randomName(), key: "#KEY VALUE", _key: "#KEY VALUE", en: '# EN TRANSLATION', uk: '# UK TRANSLATION' };
      this.translations = [newItem].concat(this.translations)
      this.search = "#KEY VALUE"
      this.selected.push(newItem)
    },

    removeTranslations() {
      this.selected.forEach(item => {
        const index = this.translations.indexOf(item)
        this.translations.splice(index, 1)
      })

      this.selected = []
      this.search = ""
      // console.log(JSON.stringify(this.i18nSelected, null,"\t"))
    },

    i18n2Translations(i18n) {
      let en = _.toPairs(i18n.en).map(l => ({ key: l[0], en: l[1] }))
      let uk = _.toPairs(i18n.uk).map(l => ({ key: l[0], uk: l[1] }))

      let res = _.union(
        en.map(r => r.key),
        uk.map(r => r.key)
      )

      res = res.map(item => {
        let e = _.find(en, r => r.key == item)
        let u = _.find(uk, r => r.key == item)
        return {
          id: this.$djvue.randomName(),
          key: item,
          _key: item,
          en: (e) ? e.en : "",
          uk: (u) ? u.uk : ""
        }
      })
      return res
    },

    translations2I18n(translations) {
      let res = { en: {}, uk: {} }
      translations.forEach(item => {
        res.en[item.key] = item.en
        res.uk[item.key] = item.uk
      })
      return res
    },

    cancel() {
      this.$emit('submit', null)
    },

    commit() {
      this.$emit('submit', this.translations2I18n(this.translations))
    }

  },

  created() {
    // console.log("create", JSON.stringify(this.i18n, null, "\t"))
    this.translations = this.i18n2Translations(this.i18n)
  }

}

</script>
