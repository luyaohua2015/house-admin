<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    return {
    }
  }
})
</script>

<style lang="">

</style>