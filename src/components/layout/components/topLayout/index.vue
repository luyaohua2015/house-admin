<template>
	<a-layout class="top-layout">
    <a-layout-header :class="`top-layout-header ${navTheme}`">
      <div class="logo">LOGO</div>
      <TopMenu />
    </a-layout-header>
    <MenuTab class="top-layout-menu-tab" />
    <a-layout-content class="top-layout-content">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import TopMenu from './topMenu/index.vue'

export default defineComponent({
	setup() {
		const collapsed = ref(false)
    const store = useStore()
		return {
      navTheme: computed(() => store.getters.style),
			collapsed
		}
	},
	components: {
		TopMenu
	}
})
</script>

<style lang="less">
.top-layout-header {
  height: 48px;
  display: flex;
  color: #fff;
  line-height: 48px;
  padding-left: 16px;
  padding-right: 0;
  &.light {
    background: #fff;
  }
}
.top-layout-menu-tab {
  padding-top: 6px
}
.top-layout-content {
  margin: 24px;
}
</style>
