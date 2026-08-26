<script lang="ts" setup>
const router = useRouter()

const route = useRoute()

const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } = useTabbar()

function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value)
  router.pushTab({ name: value })
}

onMounted(() => {
  // #ifdef APP
  uni.hideTabBar()
  // #endif
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name)
    }
  })
})
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <slot />
  <wd-gap safe-area-bottom height="var(--wot-tabbar-height, 50px)" />
  <wd-tabbar
    :model-value="activeTabbar.name" bordered safe-area-inset-bottom fixed
    @change="handleTabbarChange"
  >
    <wd-tabbar-item
      v-for="(item, index) in tabbarList" :key="index" :name="item.name"
      :value="getTabbarItemValue(item.name)" :title="item.title" :icon="item.icon"
    >
      <template v-if="item.type === 'icon'" #icon="{ active }">
        <text
          class="text-size-[var(--wot-tabbar-item-icon-size,var(--wot-n-24,24px))]"
          :class="[active ? (item.iconActive ?? item.icon) : item.icon, active ? 'text-[var(--wot-tabbar-item-color-active,var(--wot-primary-6,var(--wot-blue-6,#1c64fd)))]' : 'text-[var(--wot-tabbar-item-color-inactive,var(--wot-text-main,var(--wot-coolgrey-10,#1d1f29)))]']"
        />
      </template>
    </wd-tabbar-item>
  </wd-tabbar>
</template>
