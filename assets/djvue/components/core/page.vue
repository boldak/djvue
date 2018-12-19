<template>
  <div>
    <component :is="layout" :options="options"></component>
  </div>
</template>
<script>
import layouts from "djvue/components/layouts/index.js"
import mixin from "djvue/mixins/core/djvue.mixin.js"


export default {

  mixins: [mixin],
  components: layouts,

  props: {
    type: {
      default: "layout-1-2"
    },
    "options": {}
  },

  data: () => ({
    layout: "empty"
  }),

  watch: {
    '$route'(to, from) {
      this.setCurrentPage(this.getPage(this.$route.params.page))
      this.layout = "empty"
      this.$nextTick(() => {
        this.layout = this.getPage(this.$route.params.page).layout
      })
    }
  },

  updated() {
    window.document.title = `${this.appName}${(this.getPage(this.$route.params.page).title?"-":"")}${this.getPage(this.$route.params.page).title || ""}`
  },

  created() {
    // console.log(this.$route)
    this.setCurrentPage(this.getPage(this.$route.params.page))
    this.layout = this.getPage(this.$route.params.page).layout
    // console.log("currentPage", this.app.currentPage)  
  }

}

</script>
