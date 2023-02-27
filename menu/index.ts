import { Menus } from "@/utils/Interface";

const menu: Menus[] = [
  {
    name: "Register",
    url: "/",
    icon: "carbon:user-follow",
  },
  {
    name: "Masonry",
    url: "/masonry",
    icon: "carbon:image-copy",
  },
  {
    name: "Dynamic Form",
    url: "/dynamicForm",
    icon: "carbon:button-centered",
  },
  {
    name: "Dom",
    icon: "carbon:html-reference",
    collapsible: true,
    url: "/dom",
    submenu: [
      {
        name: "Drag To Scroll",
        url: "/dom/drag-to-scroll",
      },
      {
        name: "Drag To Move",
        url: "/dom/drag-to-move",
      },
    ],
  },
  {
    name: "gg",
    icon: "carbon:html-reference",
    collapsible: true,
    url: "/duw",
    submenu: [
      {
        name: "Drag To awWE",
        url: "/fe/drag-hshd",
      },
      {
        name: "Drag To asda",
        url: "/sd/drag-tsdsd",
      },
    ],
  },
];

export default menu;
