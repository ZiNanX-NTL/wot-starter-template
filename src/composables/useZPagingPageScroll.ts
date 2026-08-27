import type { Ref } from 'vue'
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'

interface ZPagingPageScrollTarget {
  updatePageScrollTop: (scrollTop: number) => void
  doChatRecordLoadMore: () => void
  pageReachBottom: () => void
}

export function useZPagingPageScroll(pagingRef: Ref<ZPagingPageScrollTarget | null | undefined>) {
  onPageScroll((e) => {
    // z-paging 页面滚动模式依赖 scrollTop 判断是否允许下拉刷新。
    pagingRef.value?.updatePageScrollTop(e.scrollTop)

    if (e.scrollTop < 10) {
      pagingRef.value?.doChatRecordLoadMore()
    }
  })

  onReachBottom(() => {
    pagingRef.value?.pageReachBottom()
  })
}
