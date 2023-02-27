<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ##-translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2">
        <li v-for="menu in menus?.menu" :key="menu.name">
          <div
            v-if="!menu.submenu"
            href="#"
            :class="`transition-all ease-in-out duration-500 w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${
              menus?.activeMenu === menu?.name && 'dark:bg-gray-700'
            } `"
            @click="handleclickMenu(menu?.url)"
          >
            <Icon :name="menu?.icon" />

            <span class="ml-3">{{ menu?.name }}</span>
          </div>
          <template v-else-if="menu.submenu">
            <LayoutSidebarSubmenu
              :submenu="menu?.submenu"
              :active-menu="menus?.activeMenu"
              :open-submenu="isSubmenuOpen(menu?.url)"
              :menu="menu"
            />
          </template>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script lang="ts" setup>
import menu from "@/menu";

const route = useRoute();
const router = useRouter();

// state
const openSubmenu = ref<boolean>(false);

// Menu Data
const menus: ComputedRef = computed(() => {
  let res = {};
  const url = route.path;
  let activeMenu: string | undefined = "";
  const submenu = route.path.split("/").length === 3;
  if (!submenu) {
    activeMenu = menu.find((item: any) => item.url === url)
      ? menu.find((item) => item.url === url)?.name
      : "Register";
  } else {
    const hasSubmenu: any = menu
      .filter((item) => item.hasOwnProperty("submenu"))
      .find((item2: any) =>
        item2.submenu.find((item3: any) => item3.url === url)
      );

    activeMenu = hasSubmenu.submenu.find((item: any) => item.url === url)
      ? hasSubmenu.submenu.find((item: any) => item.url === url)?.name
      : "Register";
  }
  res = {
    menu,
    activeMenu,
  };
  return res;
});

// Function Menu
const handleclickMenu = (url: string) => {
  router.push(url);
};

const isSubmenuOpen = (url: string) => {
  return route.path.startsWith(url, 0);
};
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
