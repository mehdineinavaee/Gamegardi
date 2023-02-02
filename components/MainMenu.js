import Link from "next/link";
import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import style from "../styles/MainMenux.module.css";
import { locationPrompt } from "../assets/tools";
import { useRouter } from "next/router";



const data = [
  {
    id: 1,
    title: "اتاق‌فرار‌",
    link: "/search/games",
  },
  {
    id: 1.1,
    title: "اتاق‌فرار‌های نزدیک من",
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
  /* props.authentication.state && data.unshift({
    id: 0,
    title: "مدیریت",
    link: "/admin/games"
  })  */

  const router = useRouter();

  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  const handleNearbyGamesClick = () => {
    let queryString = "/search/games?";
    locationPrompt((res) => {
      for (const prop in res) {
        queryString += `${prop}=${res[prop]}&`;
      }
      router.push(queryString);
      // toggleDrawer("close");
    });
  };

  const setMenu = (isMobile, menuItems) => {
    //

    const dom = (
      <ul>
        {menuItems.map((menuItem) => {
          if (menuItem.name == "nearby_games") {
            return (
              <li key={menuItem.id} onClick={handleNearbyGamesClick}>
                <a style={{cursor:'pointer'}}>{menuItem.title}</a>
              </li>
            );
          } else
            return (
              <li key={menuItem.id} onClick={() => toggleDrawer("close")}>
                <Link href={menuItem.link}>
                  <a>{menuItem.title}</a>
                </Link>
              </li>
            );
        })}
      </ul>
    );
    let menu = <div className={`${style.menu} ${style.wide}`}>{dom}</div>;

    if (isMobile) menu = "";
    return menu;
  };

  return <div>{setMenu(props.isMobile, props.menuItems)}</div>;
};
export default Main;
