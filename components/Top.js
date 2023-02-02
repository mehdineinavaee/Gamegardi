import style from "../styles/Top.module.css";
import Mainmenu from "./MainMenu";
import Link from "next/link";
import Drawer from "@material-ui/core/Drawer";
import api from "../api";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import Authenticator from "./Authenticator";
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Button } from "@material-ui/core";
//icons
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import { locationPrompt } from "../assets/tools";
import { ExpandMoreTwoTone } from "@material-ui/icons";

// search/games?cities=1&genres=2
const fetcher = async (url, resultKey) => {
  let result;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(body),
  });
  if (response.ok) {
    result = await response.json();
  } else console.log("HTTP-Error: " + response.status);
  return result.result;
};

const useStyles = makeStyles({
  paperAnchorRight: {
    background: "#232323",
    background: "white",
  },
});
const fetchDependencies = async () => {
  const cities = await fetcher(api.getAllCities);
  const genres = await fetcher(api.getAllGenres);
  return { cities, genres };
}

const Main = function (props) {

  const router = useRouter();
  if (router.asPath.includes("/admin")) return "";
  const menuItems = [
    {
      id: 1,
      name: "games",
      title: "اتاق فرار",
      link: "/search/games",
    },
    {
      id: 1.1,
      name: "nearby_games",
      title: "اتاق‌فرار‌های نزدیک من",
      link: "/",
    },
    {
      id: 2,
      title: "مجموعه‌ها",
      link: "/clubs",
    },
    /* {
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

  const [fields, setFields] = useState({});
  useEffect(async () => {
    const dep = await fetchDependencies();

    setFields(dep)
  }, {});

  const classes = useStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const toggleDrawer = (state) => {
    if (state == "open")
      setDrawerIsOpen((drawerIsOpen) => (drawerIsOpen = true));
    else setDrawerIsOpen((drawerIsOpen) => (drawerIsOpen = false));
  };
  //
  const [mpExpanded, setMpExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleMainPanel = (panel) => (event, isExpanded) => {
    setMpExpanded(isExpanded ? panel : false);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const setMobileMenu = (isMobile) => {
    const dom = (
      <ul>
        {menuItems.map((menuItem) => {
          if (menuItem.name == "games") {
            return (
              <li key={menuItem.id} style={{ "border-bottom": "1px solid #eee" }}>

                <Accordion mpExpanded={mpExpanded === 'panel0'} onChange={handleMainPanel('panel0')} elevation={0} >
                  <AccordionSummary style={{ "margin-right": "15px" }}
                    expandIcon={<ExpandMoreTwoTone />}
                    aria-controls="panel0bh-content"
                    id="panel0bh-header"
                  >

                    {menuItem.title}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ width: "100%" }}>
                      {fields.cities && fields.cities.slice(0,5).map((city) => {
                        return (<ul><li key={city.id}>
                          <Accordion expanded={expanded === `panel${city.id}`} onChange={handleChange(`panel${city.id}`)} elevation={0}>
                            <AccordionSummary expandIcon={<ExpandMoreTwoTone />}
                              aria-controls={`panel${city.id}bh-content`}
                              id={`panel${city.id}bh-header`}>
                              {city.name}
                            </AccordionSummary>
                            <AccordionDetails>
                              <div>
                                {fields.genres && fields.genres.filter(genre => [1,2,3,5,20].includes(genre.id)).map((genre) => {
                                  return (<Link href={`/search/games?searchTerm=&cities=${city.id}&genres=${genre.id}&searchNearByGames=false&`}><ul><li key={genre.id}  >
                                    <Button variant="text" style={{ width: "100%",display: "flex", "justify-content": "right" }} onClick={() => toggleDrawer("close")}>
                                      {genre.name}
                                    </Button>
                                  </li></ul></Link>)
                                })}
                                <Link href={`/search/games?searchTerm=&cities=${city.id}&searchNearByGames=false&`}><ul><li> <Button variant="text" style={{ width: "100%", display: "flex", "justify-content": "right" }} onClick={() => toggleDrawer("close")}>
                                  {"همه ژانر ها"}
                                </Button> </li></ul></Link>
                              </div>
                            </AccordionDetails>
                          </Accordion> </li></ul>)
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </li>
            )
          }
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
    let mobileMenu = "";
    if (isMobile) {
      mobileMenu = (
        <>
          <button id="menu-btn" onClick={() => toggleDrawer("open")}>
            <MenuIcon style={{ fontSize: 30 /* marginLeft: '5px' */ }} />
          </button>
          <Drawer
            anchor="left"
            open={drawerIsOpen}
            onClose={() => toggleDrawer("close")}
            classes={{
              paperAnchorRight: classes.paperAnchorRight, // class name, e.g. `classes-nesting-root-x`
            }}
          >
            <div className={`${style.menu} ${style.drawer}`}>{dom}</div>
          </Drawer>
        </>
      );
    }
    //

    return mobileMenu;
  };

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
      toggleDrawer("close");
    });
  };

  return (
    <div className={`${style.top} ${props.isMobile ? style.mobile : ""}`}>
      <div className={style.logoAndMenu}>
        <div className={style.menuButton}>{setMobileMenu(props.isMobile)}</div>
        <div className={style.logo}>
          <Link href={`/`}>
            <a className="ggtxtcolor1">
              <img src="/images/MainLogo.svg" />
              <span>گیم‌گــــــــردی</span>
            </a>
          </Link>
        </div>
        <div className={style.menu}>
          <Mainmenu
            isMobile={props.isMobile}
            authentication={props.authentication}
            menuItems={menuItems}
          />
        </div>
      </div>
      <div className={style.utils}>
        <Link href={`/search/games`}>
          <a id="search-btn" className={style.search}>
            <SearchIcon />
          </a>
        </Link>
        <Authenticator
          loginFormOpenState={props.loginFormOpenState}
          setLoginFormOpenState={(state) => {
            props.setLoginFormOpenState(state);
          }}
          authentication={props.authentication}
          setAuthentication={props.setAuthentication}
        />
      </div>
    </div>
  );
};
export default Main;
