<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="logo">
      刚需买房 {{mainMenu}}
    </div>
    <div class="fang-menu">
      <a-menu
        id="fangMenu"
        theme="dark"
        :openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @openChange="onOpenChange"
        mode="inline"
        inlineCollapsed="true"
        @click="handleClick"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>仪器表</template>
          <a-menu-item key="1">分析页</a-menu-item>
          <a-menu-item key="2">欢迎页</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>系统设置</template>
          <a-menu-item key="3">角色管理</a-menu-item>
          <a-menu-item key="4">权限管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script>
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const state = reactive({
      rootSubmenuKeys: ['sub1', 'sub2'],
      openKeys: ['sub1'],
      selectedKeys: ['1'],
    })

    const onOpenChange = openKeys => {
      const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);

      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        state.openKeys = openKeys;
      } else {
        state.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
    return {
      ...toRefs(state),
      onOpenChange,
      mainMenu: computed(() => {
        // console.log(store)
      })
    };
  },
  components: {
    AppstoreOutlined,
    SettingOutlined
  }
})
</script>

<style scoped>
.logo {
  padding: 12px;
}
</style>
