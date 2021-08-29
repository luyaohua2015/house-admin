<template>
  <div :class="[prefixCls, reverseColor && 'reverse-color' ]">
    <span>
      <slot name="term"></slot>
      <span class="item-text">
        <slot></slot>
      </span>
    </span>
    <CaretUpOutlined v-if="flag === 'up'" :class="[flag]"/>
    <CaretDownOutlined v-else :class="[flag]"/>
  </div>
</template>

<script>
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'
import { defineComponent} from 'vue'
export default defineComponent({
  name: 'Trend',
  props: {
    prefixCls: {
      type: String,
      default: 'fang-pro-trend'
    },
    /**
       * 上升下降标识：up|down
       */
    flag: {
      type: String,
      required: true
    },
    /**
       * 颜色反转
       */
    reverseColor: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CaretUpOutlined,
    CaretDownOutlined
  }
})
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
