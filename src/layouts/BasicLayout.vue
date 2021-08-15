<template>
  <a-layout class="fang-layout" style="min-height: 100vh">
    <Sidebar v-model:collapsed="collapsed" />
    <a-layout>
      <Header v-model:collapsed="collapsed"/>
      <a-layout-content style="margin: 0 16px">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, reactive, watchEffect } from 'vue'
import {
  Header,
  MenuTab,
  Sidebar
} from '@/components/layout/index.js'
export default defineComponent({
  setup () {
    const collapsed = reactive(false)
    console.log(collapsed)
    return {
      collapsed
    }
  },
  components: {
    Header,
    Sidebar
  }
})
</script>

<style lang="less">
@import "./BasicLayout.less";
</style>
