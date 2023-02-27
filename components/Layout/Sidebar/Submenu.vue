<script lang="ts" setup>
import { Submenu, Menus } from "~~/utils/Interface";
const router = useRouter();

interface Props {
  activeMenu?: string;
  submenu?: Submenu[];
  menu?: Menus;
  openSubmenu?: boolean;
}
const props = defineProps<Props>();

// state
const open = ref<boolean>(props.openSubmenu);

// Function
const handleclickMenu = (url: string) => {
  router.push(url);
};
</script>
<template>
  <div
    :class="` transition-all ease-in-out duration-300 w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
      activeMenu === menu?.name && 'dark:bg-gray-700'
    } `"
    @click="open = !open"
  >
    <Icon :name="menu?.icon || ''" />
    <span class="ml-3">{{ menu?.name }}</span>
    <Icon
      :class="`last:ml-auto transition ease-in-out duration-300 ${
        open && 'rotate-180'
      } `"
      name="carbon:chevron-down"
    />
  </div>
  <Transition name="slide-fade">
    <ul v-if="open">
      <li v-for="item in submenu" :key="item.name">
        <div
          :class="
            activeMenu === item?.name
              ? 'mt-2 pl-7  w-full flex items-center p-2 text-base font-normal dark:bg-gray-700 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              : 'mt-2 pl-7  w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
          "
        >
          <div class="ml-3" @click="handleclickMenu(item?.url)">
            {{ item?.name }}
          </div>
        </div>
      </li>
    </ul>
  </Transition>
</template>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatey(-20px);
  opacity: 0;
}
</style>
