<template>
  <component :is="component" />
  <Setting />

</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { Setting, SideLayout, TopLayout, MixLayout } from '@/components/layout/index.js'

export default defineComponent({
	setup() {
    const store = useStore()

    return {
      component: computed(() => store.getters.layout)
    }
	},
	components: {
    Setting,
    SideLayout,
    TopLayout,
    MixLayout
	}
})
</script>

<style lang="less">
@import './BasicLayout.less';
</style>
