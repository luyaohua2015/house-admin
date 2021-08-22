<template>
	<a-layout-sider
		:theme="layout === 'SideLayout' ? 'dark' : 'light'"
		v-model:collapsed="collapsed"
		:trigger="null"
		collapsible
	>
		<div class="logo" style="color: white" v-if="!hideLogo">刚需买房</div>
		<div class="fang-menu">
			<a-menu
				id="fangMenu"
				:theme="layout === 'SideLayout' ? 'dark' : 'light'"
				:openKeys="openKeys"
				v-model:selectedKeys="selectedKeys"
				@openChange="onOpenChange"
				mode="inline"
				@click="handleClick"
			>
				<a-sub-menu v-for="item in menus" :key="item.name">
					<template #icon>
						<AppstoreOutlined />
					</template>
					<template #title>{{ item.meta && item.meta.title }}</template>
					<template v-if="item.children && item.children.length > 0">
						<a-menu-item :key="subItem.name" v-for="subItem in item.children">
							{{ subItem.meta && subItem.meta.title }}
						</a-menu-item>
					</template>
				</a-sub-menu>
			</a-menu>
		</div>
	</a-layout-sider>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteUpdate, useRoute } from 'vue-router'

export default defineComponent({
	props: {
		collapsed: {
			type: Boolean,
			default: false
		},
		hideLogo: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const state = reactive({
			rootSubmenuKeys: [],
			openKeys: [],
			selectedKeys: []
		})

		const onOpenChange = (openKeys) => {
			const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)

			if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
				state.openKeys = openKeys
			} else {
				state.openKeys = latestOpenKey ? [latestOpenKey] : []
			}
		}
		const router = useRouter()
		const route = useRoute()
		const store = useStore()
		onBeforeRouteUpdate((to) => {
			state.selectedKeys = [to.name]
			state.openKeys = [to.fullPath.split('/')[1]]
		})

		return {
			...toRefs(state),
			onOpenChange,
			menus: computed(() => {
				const mainMenu = store.getters.addRouters
				const routes = mainMenu.find((item) => item.path === '/')
				const menus = (routes && routes.children) || []
				state.rootSubmenuKeys = menus.map((item) => item.name)
				state.openKeys = [route.fullPath.split('/')[1]]
				state.selectedKeys = [route.name]
				return menus
			}),
			handleClick: function ({ item, key, keyPath }) {
				router.push({
					path: `/${keyPath.join('/')}`
				})
			},
			layout: computed(() => store.getters.layout)
		}
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
