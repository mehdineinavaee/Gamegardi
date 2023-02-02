import Link from "next/link";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import style from "../styles/MainMenux.module.css";

const data = [
  {
    id: 1,
    title: "بازی ها",
    link: "/",
  },
  {
    id: 2,
    title: "مجموعه‌ها",
    link: "/clubs",
  },
  /*{
    id: 3,
    title: "پرسش های متداول",
    link: "/",
  },*/
  {
    id: 4,
    title: "وبلاگ‌گردی",
    link: "https://gamegardi.com/blog",
  }, 
  // {
  //   id: 5,
  //   title: "درباره ما",
  //   link: "/",
  // },
  {
    id: 6,
    title: "ارتباط با ما",
    link: "/contactUs",
  }
];

const Main = (props) => {

  props.authentication.state && data.unshift({
    id: 0,
    title: "مدیریت",
    link: "/admin/games"
  })  

  const setMenu = (isMobile, menuItems) => {
    const dom = (
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            <Link href={menuItem.link}>
              <a>{menuItem.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    );
    let menu = <div className={`${style.menu} ${style.wide}`}>{dom}</div>;
    if (isMobile) menu = ''
    return menu;
  };  

  return <div>{setMenu(props.isMobile, data)}</div>;
};
export default Main;
