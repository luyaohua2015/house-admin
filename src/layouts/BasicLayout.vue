<template>
	<a-layout class="fang-container">
		<Sidebar v-model:collapsed="collapsed" />
		<a-layout>
			<Header v-model:collapsed="collapsed" />
			<MenuTab />
			<a-layout-content class="fang-content">
				<router-view />
			</a-layout-content>
			<a-layout-footer style="text-align: center"> Ant Design ©2018 Created by Ant UED </a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Header, MenuTab, Sidebar } from '@/components/layout/index.js'
export default defineComponent({
	setup() {
		const collapsed = ref(false)
		return {
			collapsed
		}
	},
	components: {
		Header,
		Sidebar,
		MenuTab,
	}
})
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
