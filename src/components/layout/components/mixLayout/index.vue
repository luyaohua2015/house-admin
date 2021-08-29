<template>
	<a-layout class="fang-mix-layout">
    <a-layout-header class="top-layout-header" :class="{'fixed-header': fixedHeader || fixedMenuTab, 'fixed-collapsed-header': collapsed}">
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
    <a-layout-header style="height: 48px;" v-if="fixedHeader"></a-layout-header>
		<a-layout class="fang-mix-layout-box" :style="{ marginLeft: marginLeft }">
      <Sidebar v-model:collapsed="collapsed" class="fang-mix-layout-side"  :hideLogo="true"/>
      <a-layout class="fang-mix-layout-content">
        <MenuTab v-if="fixedMenuTab"></MenuTab>
        <MenuTab :class="{'fixed-menu-tab': fixedMenuTab, 'fixed-collapsed-tab': collapsed}"/>
        <a-layout-content class="fang-content">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center"> Ant Design ©2018 Created by Ant UED </a-layout-footer>
      </a-layout>
    </a-layout>
	</a-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { MenuTab, Sidebar } from '@/components/layout/index.js'
import SelectLanguage from '@/components/selectLanguage/index.vue'
import { useStore } from 'vuex'
export default defineComponent({
	setup() {
		const collapsed = ref(false)
    const store = useStore()
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
			fixedMenuTab: computed(() => store.getters.fixedMenuTab),
			fixedHeader: computed(() => store.getters.fixedHeader),
			showMenuTab: computed(() => store.getters.showMenuTab),
			fixedSidebar: computed(() => store.getters.fixedSidebar),
			marginLeft: computed({
				get: function() {
					if (collapsed.value) {
						if (store.getters.fixedSidebar) {
							return '80px'
						} else {
							return 0
						}
					} else {
						if (store.getters.fixedSidebar) {
							return '200px'
						} else {
							return 0
						}
					}
				}
			}),
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
.fang-mix-layout {
  .fixed-header {
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;
    z-index: 9;
  }
  .fixed-menu-tab {
    position: fixed;
    top: 48px;
    right: 0;
    z-index: 9;
    width: 100%;
    height: 62px;
    transition: width .2s;
    width: calc(100% - 200px);
    &.fixed-collapsed-tab {
      width: calc(100% - 80px);
    }
  }
  .fang-content {
    margin: 24px;
  }
}
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
