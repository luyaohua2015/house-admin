<template>
  <a-dropdown placement="bottomCenter">
    <GlobalOutlined />
    <template #overlay>
      <a-menu>
        <a-menu-item v-for="item in locales" :key="item">
          {{ languageLabels[item] }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { GlobalOutlined } from '@ant-design/icons-vue'
export default {
  setup() {
    const locales = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR']
    const languageLabels = {
      'zh-CN': '简体中文',
      'zh-TW': '繁体中文',
      'en-US': 'English',
      'pt-BR': 'Português'
    }
    // eslint-disable-next-line
    const languageIcons = {
      'zh-CN': '🇨🇳',
      'zh-TW': '🇭🇰',
      'en-US': '🇺🇸',
      'pt-BR': '🇧🇷'
    }
    return {
      locales,
      languageLabels,
      languageIcons
    }
  },
  components: {
    GlobalOutlined
  }
}
</script>
<style lang="less" scope>

</style>