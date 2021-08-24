<template>
	<a-layout class="fang-container">
		<Sidebar v-model:collapsed="collapsed" />
		<a-layout :style="{ marginLeft: marginLeft }">
			<Header v-if="fixedHeader"></Header>
			<a-tabs v-if="fixedMenuTab" :tabBarStyle="{margin: 0, padding: 0, borderBottom: 0}"></a-tabs>
			<Header v-model:collapsed="collapsed"  :class="{'fixed-header': fixedHeader || fixedMenuTab, 'fixed-collapsed-header': collapsed}"/>
			<MenuTab :class="{'fixed-menu-tab': fixedMenuTab, 'fixed-collapsed-tab': collapsed}"/>
			<a-layout-content class="fang-content">
				<transition name="slide-in-right" :duration="500">
					<router-view />
				</transition>
			</a-layout-content>
			<a-layout-footer style="text-align: center">{{collapsed}}Ant Design ©2018 Created by Ant UED </a-layout-footer>
		</a-layout>
	</a-layout>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue'
import { Header, MenuTab, Sidebar } from '@/components/layout/index.js'
import { useStore } from 'vuex'
export default defineComponent({
	setup() {
		const collapsed = ref(false)
		const store = useStore()
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
			})
		}
	},
	components: {
		Header,
		Sidebar,
		MenuTab
	}
})
</script>
