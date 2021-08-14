<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>>
    <div class="logo" />
  </a-layout-sider>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {

  }
}
</script>
