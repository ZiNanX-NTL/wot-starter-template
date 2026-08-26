/*
 * @Author: weisheng
 * @Date: 2025-11-25 19:57:54
 * @LastEditTime: 2026-08-26 16:35:07
 * @LastEditors: ZiNanX-NTL
 * @Description:
 * @FilePath: \wot-starter-template\uno.config.ts
 * 记得注释
 */
import { presetUni } from '@uni-helper/unocss-preset-uni'
import { presetWot } from '@wot-ui/unocss-preset'

import {
  defineConfig,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
    presetWot({
      preflight: false,
    }),
    presetIcons({
      scale: 1,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // HBuilderX 必须针对要使用的 Collections 做异步导入
      // collections: {
      //   carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      // },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: [
    {
      'center': 'flex justify-center items-center',
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-y-center-between': 'flex items-center justify-between',
      'flex-vertical': 'flex flex-col',
      'flex-vertical-center': 'flex-center flex-col',
      'flex-vertical-stretch': 'flex-vertical items-stretch',
      'flex-y-between': 'flex items-center justify-between',
      'i-flex-center': 'inline-flex justify-center items-center',
      'i-flex-x-center': 'inline-flex justify-center',
      'i-flex-y-center': 'inline-flex items-center',
      'i-flex-vertical': 'inline-flex flex-col',
      'i-flex-vertical-stretch': 'i-flex-vertical items-stretch',
      'flex-1-hidden': 'flex-1 overflow-hidden',
      'flex-vertical-full': 'flex-vertical-stretch overflow-hidden',
    },
    {
      'absolute-lt': 'absolute left-0 top-0',
      'absolute-lb': 'absolute left-0 bottom-0',
      'absolute-rt': 'absolute right-0 top-0',
      'absolute-rb': 'absolute right-0 bottom-0',
      'absolute-tl': 'absolute-lt',
      'absolute-tr': 'absolute-rt',
      'absolute-bl': 'absolute-lb',
      'absolute-br': 'absolute-rb',
      'absolute-center': 'absolute-lt flex-center size-full',
      'fixed-lt': 'fixed left-0 top-0',
      'fixed-lb': 'fixed left-0 bottom-0',
      'fixed-rt': 'fixed right-0 top-0',
      'fixed-rb': 'fixed right-0 bottom-0',
      'fixed-tl': 'fixed-lt',
      'fixed-tr': 'fixed-rt',
      'fixed-bl': 'fixed-lb',
      'fixed-br': 'fixed-rb',
      'fixed-center': 'fixed-lt flex-center size-full',
    },
    {
      'nowrap-hidden': 'overflow-hidden whitespace-nowrap',
      'ellipsis-text': 'nowrap-hidden text-ellipsis',
    },
    {
      'transition-base': 'transition-all duration-300 ease-in-out',
      'page': ' pb-[calc(12px+env(safe-area-inset-bottom))] space-y-3',
      'h-page': 'h-[calc(100vh-44px-env(safe-area-inset-top))]',
      'page-bottom-safe': 'pb-[calc(12px+env(safe-area-inset-bottom))] box-border',
    },
  ],
  theme: {
    colors: {
      /** 主题色，用法如: text-primary */
      primary: 'var(--wot-primary-6)',
    },
  },
  safelist: [
    'i-cuida-warning-outline',
    'i-typcn:warning',
    'i-line-md-map-marker-alt',
    'i-line-md-map-marker-alt-filled',
    'i-mdi-order-bool-ascending-variant',
  ],
})
