<template>
	<a-tabs
		v-if="showMenuTab"
		v-model:activeKey="activeKey"
		@change="onChange"
		style="background: #fff; padding-left: 16px; padding-top: 6px;"
		type="card"
	>
		<a-tab-pane :key="item.fullPath" v-for="(item, key) in menus" :closable="true">
			<template #tab>
				<a-dropdown :trigger="['contextmenu']">
					<span
						>{{ item.meta.title }} <ReloadOutlined style="margin-left: 5px" @click="reloadPage(item)" />
						<CloseOutlined v-if="menus.length > 1" @click="onRemove(item.fullPath)"
					/></span>
					<template #overlay>
						<a-menu>
							<a-menu-item :key="1" @click="closeTab(1, item, key)" :disabled="key === 0">关闭其他</a-menu-item>
							<a-menu-item :key="2" @click="closeTab(2, item, key)" :disabled="key <= 0">关闭左侧标签</a-menu-item>
							<a-menu-item :key="3" @click="closeTab(3, item, key)" :disabled="key >= menus.length - 1"
								>关闭右侧标签</a-menu-item
							>
							<a-menu-item :key="4" @click="closeTab(4, item, key)">刷新当前页</a-menu-item>
						</a-menu>
					</template>
				</a-dropdown>
			</template>
		</a-tab-pane>
		<template #tabBarExtraContent>
			<a-dropdown>
				<MoreOutlined class="more-btn" />
				<template #overlay>
					<a-menu>
						<a-menu-item key="1" @click="closeTab(1, {}, 1)">关闭其他</a-menu-item>
						<a-menu-item key="2" @click="closeTab(4, {}, 4)">刷新当前页</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</template>
	</a-tabs>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { computed, defineComponent, ref } from 'vue'
import { ReloadOutlined, MoreOutlined, CloseOutlined } from '@ant-design/icons-vue'
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

		const onRemove = (targetKey) => {
			const index = store.getters.menus.findIndex((item) => item.fullPath === targetKey)
			if (index >= 0) {
				activeKey.value = store.getters.menus[index - 1].fullPath
			}
			store.dispatch('router/removeRoutes', activeKey.value)
		}

		const reloadPage = (item) => {
			router.replace({
				path: item.fullPath
			})
			activeKey.value = item.fullPath
		}
		const closeTab = (key, item, index) => {
			const tabAction = {
				1: () => {
					if (item && !item.fullPath) {
						item = store.getters.menus.find((subItem) => subItem.fullPath === activeKey.value)
					}
					store.dispatch('router/otherRoutes', item).then(() => {
						activeKey.value = store.getters.menus[0].fullPath
						reloadPage(item)
					})
				},
				2: () => {
					store.dispatch('router/removeLeftRoutes', index).then(() => {
						activeKey.value = store.getters.menus[0].fullPath
						reloadPage(item)
					})
				},
				3: () => {
					store.dispatch('router/removeRightRoutes', index).then(() => {
						activeKey.value = store.getters.menus[index].fullPath
						reloadPage(item)
					})
				},
				4: () => {
					if (item && !item.fullPath) {
						item = store.getters.menus.find((subItem) => subItem.fullPath === activeKey.value)
					}
					reloadPage(item)
				}
			}
			tabAction[key]()
		}
		return {
			menus: computed(() => store.getters.menus),
			activeKey,
			onChange,
			onRemove,
			reloadPage,
			closeTab,
			showMenuTab: computed(() => store.getters.showMenuTab)
		}
	},
	components: {
		ReloadOutlined,
		MoreOutlined,
		CloseOutlined
	}
})
</script>

<style lang="less" scoped>
.more-btn {
	margin-right: 8px;
	padding: 12px;
	font-size: 16px;
	cursor: pointer;
}
</style>
