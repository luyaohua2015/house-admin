<template>
	<a-layout-sider
		:theme="navTheme === 'black' ? 'dark' : layout === 'MixLayout' ? 'light' : navTheme"
		v-model:collapsed="triggercollapsed"
		collapsible
		class="fang-side-bar"
		:class="{'fixed-side-bar': fixedSidebar}"
	>
		<div class="logo" :class="navTheme" v-if="!hideLogo">
			刚需买房
		</div>
		<div class="fang-menu">
			<a-menu
				id="fangMenu"
				:theme="navTheme === 'black' ? 'dark' : layout === 'MixLayout' ? 'light' : navTheme"
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
import { computed, defineComponent, reactive, toRefs, watch, ref } from 'vue'
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
	setup(props, context) {
		const state = reactive({
			rootSubmenuKeys: [],
			openKeys: [],
			selectedKeys: []
		})
		var triggercollapsed = ref(props.collapsed)
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
		watch(props, (newVal) => {
			triggercollapsed.value = newVal && newVal.collapsed
			console.log(triggercollapsed.value)
		}, {
			deep: true
		})

		watch(triggercollapsed, (newVal) => {
			context.emit('update:collapsed', newVal)
		}, {
			deep: true
		})
    console.log(store.getters.style)
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
      navTheme: computed(() => store.getters.style),
			handleClick: function ({ item, key, keyPath }) {
				router.push({
					path: `/${keyPath.join('/')}`
				})
			},
			layout: computed(() => store.getters.layout),
			fixedSidebar: computed(() => store.getters.fixedSidebar),
			triggercollapsed
		}
	},
	components: {
		AppstoreOutlined,
		SettingOutlined
	}
})
</script>

<style lang="less" scoped>
.fang-side-bar {
	overflow: auto;
	&.fixed-side-bar {
	  height: 100vh;
		position: fixed;
		left: 0;
	}
  .logo {
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 16px;
    line-height: 32px;
    cursor: pointer;
    &.dark {
      color: #fff;
    }
  }
  .fang-menu {
    // flex: 1;
  }
}
</style>
