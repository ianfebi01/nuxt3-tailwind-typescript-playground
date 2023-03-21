import { Menus } from "@/utils/Interface";

const menu: Menus[] = [
  {
    name: "Pretest",
    url: "/pretest/login",
    icon: "carbon:pen",
  },
  {
    name: "Node Crypto",
    url: "/",
    icon: "carbon:encryption",
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
    name: "Upload Image",
    url: "/uploadImage",
    icon: "carbon:image-reference",
  },
  {
    name: "To Do List",
    url: "/todolist",
    icon: "carbon:list-boxes",
  },
];

export default menu;
