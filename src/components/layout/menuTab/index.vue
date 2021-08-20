<template>
	<a-tabs
		v-model:activeKey="activeKey"
		@change="onChange"
		style="background: #fff"
		hide-add
		type="editable-card"
		@edit="onEdit"
	>
		<a-tab-pane :key="item.fullPath" v-for="item in menus" :closable="menus.length > 1">
      <template #tab>
        <span>
          {{ item.meta.title }}
          <ReloadOutlined style="fontSize: 12px;marginLeft: 5px" @click="reloadPage(item)"/>
        </span>
      </template>
    </a-tab-pane>
	</a-tabs>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteUpdate } from "vue-router"
import { computed, defineComponent, ref } from 'vue'
import { ReloadOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const activeKey = ref(store.getters.menus[0].fullPath)
    onBeforeRouteUpdate((to) => {
      activeKey.value = to.fullPath
    })
    const onChange = (activeKey) => {
      router.push({
        path: activeKey
      })
    }

    const onEdit = (targetKey) => {
      const index = store.getters.menus.findIndex(item => item.fullPath === targetKey)
      if (index >= 0) {
        activeKey.value = store.getters.menus[index - 1].fullPath
      }
      store.dispatch('router/remove_routes', targetKey)
    }

    const reloadPage = (item) => {
      router.replace({
        path: item.fullPath
      })
      activeKey.value = item.fullPath
    }
    return {
      menus: computed(() => store.getters.menus),
      activeKey,
      onChange,
      onEdit,
      reloadPage
    }
  },
  components: {
    ReloadOutlined
  }
})
</script>
