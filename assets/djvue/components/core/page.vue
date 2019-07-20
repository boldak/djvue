<template>
  <div>
    <component :is="layout" :options="options"></component>
  </div>
</template>
<script>
import layouts from "djvue/components/layouts/index.js"
import djvueMixin from "djvue/mixins/core/djvue.mixin.js"
import listenerMixin from "djvue/mixins/core/listener.mixin.js"


export default {

  mixins: [djvueMixin,listenerMixin],
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
    },
    'app.mode'(value) {
      this.emit("change-mode", value)
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
