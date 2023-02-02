import style from "../styles/Bottom.module.css";
import { Grid, Hidden } from "@material-ui/core";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRounded from "@material-ui/icons/HomeRounded";
import MenuRounded from "@material-ui/icons/MenuRounded";
import SearchRounded from "@material-ui/icons/SearchRounded";
import NearMeRounded from "@material-ui/icons/NearMeRounded";
import { locationPrompt } from "../assets/tools";


const menuItems = [
  {
    id: "1",
    title: "اتاق فرار",
    link: "/search/games",
  },
  {
    id: "2",
    title: "مجموعه‌ها",
    link: "/clubs",
  },
  /*{
    id: "3",
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

const Bottom = function ({ isMobile }) {
  const router = useRouter();
  if (router.asPath.includes("/admin")) return "";
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

  const [value, setValue] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuClick = () => {
    document.querySelector("#menu-btn").click();
  }
  const handleSearchClick = () => {
    document.querySelector("#search-btn").click();
  }
  const handleNearbyGamesClick = () => {
    let queryString = "/search/games?";
    locationPrompt((res) => {
      for (const prop in res) {
        queryString += `${prop}=${res[prop]}&`;
      }
      router.push(queryString);
      toggleDrawer("close");
    });
  };



  let menu = <div className={`${style.menu} ${style.wide}`}>{dom}</div>;
  return (
    <Grid item lg={12} md={12} xs={12}>
      <BottomNavigation style={{ position: 'fixed', bottom: 0, width: '100%', display: `${isMobile ? "" : "none"}`, 'z-index': '1000', 'box-shadow': 'inset 0px 0px 2px 0px' }}
        showLabels={true}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction onClick={() => { router.push('/') }} showLabel={true} label="خانه" icon={<HomeRounded />} />
        <BottomNavigationAction onClick={handleSearchClick} showLabel={true} label="جستجو" icon={<SearchRounded />} />
        <BottomNavigationAction onClick={handleNearbyGamesClick} showLabel={true} label="نزدیک من" icon={<NearMeRounded />} />
        <BottomNavigationAction onClick={handleMenuClick} showLabel={true} label="بیشتر" icon={<MenuRounded />} />
      </BottomNavigation>

      <Grid
        item
        container
        justify="center"
        className={`${style.main} ${isMobile ? style.mobile : ""}`}
      >
        <Grid item lg={8} md={10} xs={11}>
          <div className={style.logo}>
            <Link href={`/`}>
              <a className="ggtxtcolor1">
                <img src="/images/MainLogo.svg" />
                <span>گیم&zwnj;گــــــــردی</span>
              </a>
            </Link>
          </div>
          {menu}
          <div className={style.copyright}>
            تمامی حقوق این وب سایت برای گیم گردی محفوظ می‌باشد.
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Bottom;
