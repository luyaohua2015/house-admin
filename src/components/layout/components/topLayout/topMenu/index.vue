<template>
	<div class="top-layout-menu">
    <a-menu
		id="fangMenu"
		:theme="navTheme === 'black' ? 'dark' : navTheme"
		v-model:selectedKeys="selectedKeys"
		mode="horizontal"
		@click="handleClick"
		:style="{ lineHeight: '48px', height: '48px' }"
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
	<div :class="`fang-header-right ${navTheme}`">
		<span class="fange-account">
			<a-dropdown>
				<span class="ant-dropdown-link">
					<span class="fang-account-avatar">
						<img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
					</span>
					<span class="fang-account-name">陆耀华</span>
				</span>
				<template #overlay>
					<a-menu @click="onClick">
						<a-menu-item key="0">
							<span> 个人中心 </span>
						</a-menu-item>
						<a-menu-item key="1">
							<span> 个人设置 </span>
						</a-menu-item>
						<a-menu-divider />
						<a-menu-item key="2">
							<span> 退出登录 </span>
						</a-menu-item>
					</a-menu>
				</template>
			</a-dropdown>
		</span>
		<span class="fang-header-dropdown">
			<SelectLanguage />
		</span>
	</div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import { useRouter, onBeforeRouteUpdate, useRoute } from 'vue-router'
import SelectLanguage from '@/components/selectLanguage/index.vue'
export default defineComponent({
	props: {
		collapsed: {
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

		const router = useRouter()
		const route = useRoute()
		const store = useStore()
		onBeforeRouteUpdate((to) => {
			state.selectedKeys = [to.name]
			state.openKeys = [to.fullPath.split('/')[1]]
		})

		const handleClick = function ({ item, key, keyPath }) {
			router.push({
				path: `/${keyPath.join('/')}`
			})
		}

		const onClick = ({ key }) => {
			const item = {
				0: () => {},
				1: () => {},
				2: () => {
					this.$store.dispatch('user/logout').then(() => {
						this.$router.push({
							path: '/user/login'
						})
					})
				}
			}
			item[key]()
		}

		return {
			...toRefs(state),
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
			handleClick,
			onClick
		}
	},
	components: {
		AppstoreOutlined,
		SettingOutlined,
    SelectLanguage
	}
})
</script>

<style lang="less" scoped>
.top-layout-menu {
  display: flex;
  flex: 1;
  .ant-menu {
    flex: 1;
  }
}
.fang-header-right {
	margin-right: 8px;
  display: flex;
	height: 48px;
	overflow: hidden;
  align-items: center;
  &.light {
    .fang-account-name, span {
      color: rgba(0, 0, 0, 0.65);
    }
  }
	.fang-account {
		display: inline-block;
		padding: 0 12px;
		cursor: pointer;
		-webkit-transition: all 0.3s;
		transition: all 0.3s;
		&-avatar {
			margin-right: 8px;
			> img {
				max-width: 24px;
				height: 24px;
				border: 50%;
			}
		}
    &-name {
      color: #fff;
    }
	}
	.fang-header-dropdown {
		padding: 0 12px;
		font-size: 16px;
    color: #fff;
	}
}
</style>
