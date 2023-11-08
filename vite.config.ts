/*
 * @Author: luoxi
 * @Date: 2022-01-25 09:51:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-21 22:57:42
 * @FilePath: \vue-admin-box\vite.config.ts
 * @Description: 
 */
import { ConfigEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import viteImagemin from 'vite-plugin-imagemin'
import { resolve } from 'path'

const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir)
}

const alias: Record<string, string> = {
  '@': pathResolve("src")
}

/** 
 * @description-en vite document address
 * @description-cn vite官网
 * https://vitejs.cn/config/ */
export default ({ command }: ConfigEnv): UserConfigExport => {
  const prodMock = true;
  return {
    base: '/',
    resolve: {
      alias
    },
    server: {
      port: 8100,
      host: '0.0.0.0',
      open: true,
      proxy: { // 代理配置
        '/api': {
          target: `http://www.custifymedia.com/`, // 线上环境
          // target: `http://8.222.197.192/`, // 线上环境
          // target: `http://172.30.136.251:8781/`, // 刘环境
          // target: `http://172.30.130.129:8789/`, // djack环境
          changeOrigin: true,
        }
      },
    },
    build: {
      outDir: "web",
      rollupOptions: {
        output: {
          manualChunks: {
            'echarts': ['echarts'],
            'element-plus': ['element-plus']
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      viteCompression(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        watchFiles: true,
        injectCode: `
          import { setupProdMockServer } from '../mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
      }),

      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹(路径为存放所有svg图标的文件夹不单个svg图标)
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      // viteImagemin({
      //   gifsicle: {
      //     optimizationLevel: 7,
      //     interlaced: false,
      //   },
      //   optipng: {
      //     optimizationLevel: 7,
      //   },
      //   mozjpeg: {
      //     quality: 20,
      //   },
      //   pngquant: {
      //     quality: [0.8, 0.9],
      //     speed: 4,
      //   },
      //   svgo: {
      //     plugins: [
      //       {
      //         name: 'removeViewBox',
      //       },
      //       {
      //         name: 'removeEmptyAttrs',
      //         active: false,
      //       },
      //     ],
      //   },
      // }),
    ],
    css: {
      postcss: {
        plugins: [
            {
              postcssPlugin: 'internal:charset-removal',
              AtRule: {
                charset: (atRule) => {
                  if (atRule.name === 'charset') {
                    atRule.remove();
                  }
                }
              }
            }
        ],
      },
    }
  };
}
