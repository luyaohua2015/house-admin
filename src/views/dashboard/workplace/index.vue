<template>
  <div>
    <a-typography-title :level="4" v-for="item in [1,2,3,4,5,6,7,8,9,10,11]" :key="item">首页</a-typography-title>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log('首页')
  }
}
</script>
<style lang="less" scope>

</style>