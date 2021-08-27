import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteAntdTheme from 'vite-plugin-antd-theme'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

const themesEntry = [
  // 暗黑主题
  {
    entryPath: [
      path.resolve(__dirname, './node_modules/ant-design-vue/lib/style/themes/dark.less'),
      path.resolve(__dirname, './src/styles/theme/dark.less')
    ],
    outputName: 'dark',
    outputPath: './src/config'
  },
  // 默认主题
  {
    entryPath: path.resolve(__dirname, './src/styles/theme/default.less'),
    outputName: 'light',
    outputPath: './src/config'
  }
];

const options = {
  themesEntry,
  // 是否提取全部变量，默认false，优先级低于设置themeVariables
  allVariables: true,
  // 以下是antd-theme-generator配置项
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, './src'), // all files with .less extension will be processed
  varFile: path.join(__dirname, './src/styles/theme/default.less'), // default path is Ant Design default.less file
  themeVariables: [],
  outputFilePath: path.join(__dirname, './public/static/color.less'), // if provided, file will be created with generated less/styles
  customColorRegexArray: [/^fade\(.*\)$/] // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
};

export default defineConfig({
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      vue(),
      ViteComponents({
        customComponentResolvers: [ AntDesignVueResolver() ]
      }),
      viteAntdTheme(options)
    ],
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
      },
      preprocessorOptions: {
        // scss: { additionalData: `@import "@/styles/vars.scss";` },
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/theme/default.less";`
        }
      }
    }
})
