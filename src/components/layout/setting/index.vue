<template>
	<a-drawer
    title=""
    placement="right"
    :closable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <a-typography-title :level="5">整体风格设置</a-typography-title>

    <a-typography-title :level="5">导航模式</a-typography-title>
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
    <h3 :style="{ margin: '16px 0' }">其他设置</h3>
    <a-typography-title :level="5">其他设置</a-typography-title>
    <a-list item-layout="horizontal" :data-source="otherSettingOption" :bordered="false">
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.title }}
          <template #actions>
            <a-select
              v-if="item.key === 'routerAnimation'"
              ref="select"
              v-model:value="otherSetting[item.value]"
            >
              <a-select-option v-for="subItem in item.options" :key="subItem.value" :value="subItem.value">
                {{subItem.value}}
              </a-select-option>
            </a-select>
            <a-switch v-else v-model:checked="otherSetting[item.key]" @change="onChange(item)"/>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </a-drawer>
  <div class="setting-drawer-handle" :class="{active: visible}" @click="showDrawer">
    <SettingOutlined v-if="!visible"/>
    <CloseOutlined v-else/>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { defineComponent, ref, computed, reactive } from 'vue'
import { SettingOutlined, CheckOutlined, CloseOutlined } from  '@ant-design/icons-vue'
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

    const otherSetting = reactive({
      routerAnimation: 'Slide-Right',
      menuTab: false,
      fixedMenuTab: false
    })

    const otherSettingOption = [
      {
        title: '路由动画',
        key: 'routerAnimation',
        tip: '',
        options: [
          {
            key: 'Null',
            value: 'Null'
          },
          {
            key: 'Slide Right',
            value: 'Slide-Right'
          },
          {
            key: 'Fade In',
            value: 'Fade-In'
          },
          {
            key: 'Zoom',
            value: 'Zoom'
          }
        ]
      },
      {
        title: '多标签',
        key: 'menuTab',
        tip: ''
      },
      {
        title: '固定多标签',
        key: 'fixedMenuTab',
        tip: '固定多标签需要先开启多标签并且固定 Header'
      }
    ]

    const onChange = (item) => {
      const actions = {
        'menuTab': () => {
          debugger
          console.log(otherSetting[item.value])
          store.dispatch('app/setMenuTab', otherSetting[item.value])
        },
        'fixedMenuTab': () => {
          
        }
      }
      actions[item.key]()
    }

		return {
      layout: computed(() => store.getters.layout),
      visible,
      afterVisibleChange,
      showDrawer,
      chooseLayout,
      onChange,
      otherSetting,
      otherSettingOption
		}
	},
	components: {
    SettingOutlined,
    CheckOutlined,
    CloseOutlined
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
  right: 0;
  z-index: 9999;
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
  > span {
    transform: 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  }
  &.active {
    right: 256px;
  }
}
</style>
