<template>
	<a-drawer
    title=""
    placement="right"
    :closable="false"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
  >
    <a-typography-title :level="5">整体风格设置</a-typography-title>
    <div class="style-setting">
      <a-tooltip placement="top" v-for="item in themes" :key="item.title">
        <template #title>
          <span>{{item.title}}</span>
        </template>
        <div :class="`style-setting-item style-setting-item-${item.theme}`" @click="chooseStyle(item.theme)">
          <CheckOutlined class="style-setting-item-checked" v-if="style === item.theme"/>
        </div>
      </a-tooltip>
    </div>
    <a-typography-title :level="5">导航模式</a-typography-title>
    <div class="nav-setting">
      <a-tooltip placement="top" v-for="item in layouts" :key="item.title">
        <template #title>
          <span>{{item.title}}</span>
        </template>
        <div :class="`nav-setting-item nav-setting-item-${item.class}`" @click="chooseLayout(item.layout)">
          <CheckOutlined class="nav-setting-item-checked" v-if="layout === item.layout"/>
        </div>
      </a-tooltip>
    </div>
    <div :style="{ marginBottom: '24px', marginTop: '24px' }">
      <a-typography-title :level="5">主题色</a-typography-title>
      <div class="theme-tag">
        <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
          <template v-slot:title>
            {{ item.key }}
          </template>
          <a-tag :color="item.color" @click="changeColor(item.color)">
            <template #icon>
              <CheckOutlined v-if="item.color === primaryColor"/>
            </template>
          </a-tag>
        </a-tooltip>
      </div>
    </div>
    <a-typography-title :level="5">其他设置</a-typography-title>
    <a-list item-layout="horizontal" :data-source="otherSettingOption" :bordered="false">
      <template #renderItem="{ item }">
        <a-list-item>
          {{ item.title }}
          <template #actions>
            <a-select
              style="width: 70px"
              v-if="item.key === 'routerAnimation'"
              ref="select"
              v-model:value="otherSetting.routerAnimation"
              @change="onSelectChange"
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
  <a-button type="primary" class="setting-drawer-handle" :class="{active: visible}" @click="showDrawer">
    <SettingOutlined v-if="!visible"/>
    <CloseOutlined v-else/>
  </a-button>
</template>

<script>
import { useStore } from 'vuex'
import { defineComponent, ref, computed, reactive } from 'vue'
import { SettingOutlined, CheckOutlined, CloseOutlined, CheckSquareFilled } from  '@ant-design/icons-vue'
import { colorList, updateTheme } from './settingConfig'
import darkVars from '@/config/dark.json';
import lightVars from '@/config/light.json';
import compactVars from '@/config/compact.json';
export default defineComponent({
	setup() {
    const visible = ref(false)

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
      routerAnimation: store.getters.animation,
      menuTab: store.getters.showMenuTab,
      fixedMenuTab: store.getters.fixedMenuTab,
      fixedHeader: store.getters.fixedHeader
    })

    const otherSettingOption = [
      {
        title: '路由动画',
        key: 'routerAnimation',
        tip: '',
        options: [
          {
            key: 'Null',
            value: ''
          },
          {
            key: 'Slide Right',
            value: 'slide-in-right'
          },
          {
            key: 'Slide Up',
            value: 'slide-in-up'
          },
          {
            key: 'Fade In',
            value: 'fade-in'
          },
          {
            key: 'Zoom In',
            value: 'zoom-in'
          }
        ]
      },
      {
        title: '固定 Header',
        key: 'fixedHeader',
        tip: ''
      },
      {
        title: '固定侧边菜单',
        key: 'fixedSidebar',
        tip: ''
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

    const themes = [
      {
        title: '亮色主题',
        theme: 'light'
      },
      {
        title: '暗色主题风格',
        theme: 'dark'
      },
      {
        title: '暗黑模式',
        theme: 'black'
      }
    ]

    const layouts = [
      {
        title: '侧边菜单布局',
        class: 'side',
        layout: 'SideLayout'
      },
      {
        title: '顶部菜单布局',
        class: 'top',
        layout: 'TopLayout'
      },
      {
        title: '混合布局',
        class: 'mix',
        layout: 'MixLayout'
      }
    ]


    const onChange = (item) => {
      const action = `app/set${item.key.charAt(0).toUpperCase()}${item.key.slice(1)}`
      if (item.key === 'fixedHeader') {
        store.dispatch('app/setFixedMenuTab', otherSetting.fixedHeader)
      }
      store.dispatch(action, otherSetting[item.key])
    }

    const onSelectChange = () => {
      store.dispatch('app/setAnimation', otherSetting.routerAnimation)
    }

    // 改变主题色
    const changeColor = (color) => {
      updateTheme({'@primary-color': color}).then(() => {
        store.dispatch('app/setPrimaryColor', color)
      })
    }

    const chooseStyle = (style) => {
      const styleObj = {
        dark: darkVars,
        light: lightVars,
        mix: compactVars
      }
      updateTheme(styleObj[style]).then(() => {
        store.dispatch('app/setStyle', style)
      })
    }

		return {
      layout: computed(() => store.getters.layout),
      style: computed(() => store.getters.style),
      themes,
      layouts,
      visible,
      otherSetting,
      otherSettingOption,
      colorList,
      primaryColor: computed(() => store.getters.primaryColor),
      afterVisibleChange,
      showDrawer,
      chooseLayout,
      chooseStyle,
      onChange,
      onSelectChange,
      changeColor
		}
	},
	components: {
    SettingOutlined,
    CheckOutlined,
    CloseOutlined,
    CheckSquareFilled
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

.style-setting {
  display: flex;
  margin-bottom: 24px;
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
    &-light::before {
      z-index: 1;
      background-color: #fff;
      content: "";
    }
    &-dark::before {
      background-color: #001529;
      z-index: 1;
    }
    &-dark::after {
      background-color: #FFF;
      z-index: 0;
    }
    &-black::after, &-black::before {
      background-color: transparent;
    }
    &-black {
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
.theme-tag {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > span {
    margin-bottom: 5px;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
