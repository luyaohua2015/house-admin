<template>
  <a-layout-header style="background: #fff; padding: 0" >
    <a-tabs v-model:activeKey="activeKey" @change="onChange">
      <a-tab-pane :key="item.fullPath" :tab="item.meta.title || '网站首页'" v-for="item in menus"></a-tab-pane>
    </a-tabs>
  </a-layout-header>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteUpdate } from "vue-router"
import { computed, defineComponent, reactive, ref, toRefs, watchEffect } from 'vue'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    // console.log(store.getters.menus, store)
    // activeKey = store.getters.menus && store.getters.menus[0].fullPath
    // // const menus = reactive([])
    // watchEffect(menus, () => {
    //   activeKey = store.getters.menus && store.getters.menus[0].fullPath
    // })
    const activeKey = ref(store.getters.menus[0].fullPath)
    onBeforeRouteUpdate((to) => {
      activeKey.value = to.fullPath
    })
    const onChange = (activeKey) => {
      router.push({
        path: activeKey
      })
    }
    return {
      menus: computed(() => store.getters.menus),
      activeKey,
      onChange
    }
  }
})
</script>
