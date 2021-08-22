<template>
	<a-drawer
    title=""
    placement="right"
    :closable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
  <a-typography-title :level="4">整体风格设置</a-typography-title>

  <a-typography-title :level="4">导航模式</a-typography-title>
  <div class="nav-setting">
    <div class="nav-setting-item nav-setting-item-side" @click="chooseLayout('SideLayout')">
      <CheckOutlined class="nav-setting-item-checked" v-if="layout === 'SideLayout'"/>
    </div>
    <div class="nav-setting-item nav-setting-item-top" @click="chooseLayout('TopLayout')">
      <CheckOutlined class="nav-setting-item-checked" v-if="layout === 'TopLayout'"/>
    </div>
    <div class="nav-setting-item nav-setting-item-mix" @click="chooseLayout('MixLayout')">
      <CheckOutlined class="nav-setting-item-checked" v-if="layout === 'MixLayout'"/>
    </div>
  </div>
  <div class="setting-drawer-handle" @click="showDrawer">
    <SettingOutlined />
  </div>
  </a-drawer>
</template>

<script>
import { useStore } from 'vuex'
import { defineComponent, ref, computed } from 'vue'
import { SettingOutlined, CheckOutlined } from  '@ant-design/icons-vue'
export default defineComponent({
	setup() {
    const visible = ref(true)

    const afterVisibleChange = bool => {
      console.log('visible', bool)
    };

    const showDrawer = () => {
      visible.value = !visible.value
    }
    const store = useStore()

    const chooseLayout = (item) => {
      store.dispatch('app/setLayout', item)
    }
		return {
      layout: computed(() => store.getters.layout),
      visible,
      afterVisibleChange,
      showDrawer,
      chooseLayout
		}
	},
	components: {
    SettingOutlined,
    CheckOutlined
	}
})
</script>

<style lang="less" scoped>
.nav-setting {
  display: flex;
  &-item {
    position: relative;
    width: 44px;
    height: 36px;
    margin-right: 16px;
    overflow: hidden;
    background-color: #f0f2f5;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
    cursor: pointer;
    &-checked {
      position: absolute;
      right: 6px;
      bottom: 4px;
      color: #1890ff;
      font-weight: 700;
      font-size: 14px;
      pointer-events: none;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 33%;
      height: 100%;
      background-color: #fff;
      content: "";
    }
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 25%;
      background-color: #fff;
      content: "";
    }
    &-side::before {
      z-index: 1;
      background-color: #001529;
      content: "";
    }
    &-top::before {
      background-color: #f0f2f5;
    }
    &-top::after {
      background-color: #001529;
    }
    &-mix::after {
      background-color: #001529;
    }
  }
}
.setting-drawer-handle {
  position: fixed;
  top: 240px;
  right: 256px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 16px;
  text-align: center;
  background: #1890ff;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
}
</style>
