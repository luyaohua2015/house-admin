<template>
  <a-row :gutter="24">
    <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }" v-for="item in [1,2,3,4]" :key="item">
      <chart-card :loading="loading" title="总销售额" total="￥126,560">
        <template v-slot:action>
          <a-tooltip title="指标说明">
            <InfoCircleOutlined />
          </a-tooltip>
        </template>
        <trend flag="up" style="margin-right: 16px;">
          <template v-slot:term>
            <span>周同比</span>
          </template>
            12%
        </trend>
        <trend flag="down">
          <template v-slot:term>
            <span>日同比</span>
           11%
          </template>
        </trend>
        <template v-slot:footer>
          日均销售额<span>￥ 234.56</span>
        </template>
      </chart-card>
    </a-col>
  </a-row>
</template>
<script>
import { defineComponent} from 'vue'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import {
  Trend,
  ChartCard
} from '@/components'
export default defineComponent({
  components: {
    ChartCard,
    Trend,
    InfoCircleOutlined
  }
})
</script>
<style lang="less" scope>

</style>