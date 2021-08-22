<template>
	<a-layout class="fang-mix-layout">
    <a-layout-header class="top-layout-header">
      <div class="logo">LOGO</div>
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
    </a-layout-header>
		<a-layout class="fang-mix-layout-box">
      <Sidebar v-model:collapsed="collapsed" class="fang-mix-layout-side"  :hideLogo="true"/>
      <a-layout class="fang-mix-layout-content">
        <MenuTab style="padding-top: 6px;"/>
        <a-layout-content class="fang-content">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center"> Ant Design ©2018 Created by Ant UED </a-layout-footer>
      </a-layout>
    </a-layout>
	</a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { MenuTab, Sidebar } from '@/components/layout/index.js'
import SelectLanguage from '@/components/selectLanguage/index.vue'
export default defineComponent({
	setup() {
		const collapsed = ref(false)
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
			collapsed,
      onClick
		}
	},
	components: {
		Sidebar,
		MenuTab,
    SelectLanguage
	}
})
</script>

<style lang="less">
.fang-mix-layout-content {
  overflow: auto;
}
.fang-mix-layout-box {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
}
.top-layout-header {
  display: flex;
  justify-content: space-between;
}
.fang-header-right {
	margin-right: 8px;
  display: flex;
	height: 48px;
	overflow: hidden;
  align-items: center;
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
