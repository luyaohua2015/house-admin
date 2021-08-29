<template>
	<a-layout-header :class="`fang-header ${navTheme}`" :theme="navTheme === 'black' ? 'dark' : navTheme">
		<div class="fang-header-box">
      <div class="fang-header-trigger">
			<menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => $emit('update:collapsed', !collapsed)" />
			<menu-fold-outlined v-else class="trigger" @click="() => $emit('update:collapsed', !collapsed)" />
		</div>
		<div class="fang-header-right">
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
	</a-layout-header>
</template>

<script>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import SelectLanguage from '@/components/selectLanguage/index.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
	name: 'Header',
	props: {
		collapsed: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const store = useStore()
		const router = useRouter()
    const onClick = ({ key }) => {
			const item = {
				0: () => {},
				1: () => {},
				2: () => {
					store.dispatch('user/logout').then(() => {
						router.push({
							path: '/user/login',
						})
					})
				},
			}
			item[key]()
		}
    return {
      onClick,
      navTheme: computed(() => store.getters.style)
    }
  },
	components: {
		MenuFoldOutlined,
		MenuUnfoldOutlined,
		SelectLanguage,
	},
}
</script>

<style lang="less" scoped>
.fang-header {
  &.light, &.dark {
    .fang-account-name, span {
      color: rgba(0, 0, 0, 0.65);
    }
  }
  &-box {
    position: relative;
    height: 100%;
    padding: 0 16px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
  }
	&-trigger {
		padding: 0 22px;
		font-size: 20px;
		display: inline-block;
	}
	&-right {
		float: right;
		margin-right: 8px;
		height: 100%;
		overflow: hidden;
		.fang-account {
			display: inline-block;
			height: 100%;
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
		}
		.fang-header-dropdown {
			padding: 0 12px;
			font-size: 16px;
		}
	}
}
</style>
