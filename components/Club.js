import { useState } from "react";
import style from "../styles/Club.module.css";

// components
import Card from "./Card";

// icons
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import GamesList from "./GamesListA1";

const Main = (props) => {
  console.log("render - Club");

  return (
    <div className={`${style.main} ${!props.isMobile && style.desktop}`}>
      <div className={style.cover}>
        <div className={style.content}>
          <div className={style.sec1}>
            <img className={style.poster} src={props.data.headerFilePath} alt={props.data.name}  />
            <div className={style.info}>
              <div className={style.titles}>
                <div className={style.gameTitle}>{props.data.name}</div>
                {/* <div className={style.clubTitle}>
                  <Link href="/">
                    <a>مجموعه {props.data.club.name}</a>
                  </Link>
                </div> */}
              </div>
              <div className={style.label}>
                {/* <MenuBookIcon style={{ fontSize: 20 }} /> */}
                <span>ژانر: {props.data.escapeRoomGenreTypeTitle}</span>
              </div>
              <div className={style.label}>
                {/* <AccessibilityNewIcon style={{ fontSize: 20 }} /> */}
                <span>
                  ظرفیت: {props.data.escapeRoomMinPlayer} تا{" "}
                  {props.data.escapeRoomMaxPlayer} نفر
                </span>
              </div>
              <div className={style.label}>
                <AccessTimeIcon style={{ fontSize: 20 }} />
                <span>مدت: {props.data.duration} دقیقه</span>
              </div>
            </div>
          </div>
          {/* <div className={style.sec2}>Gallery</div> */}
        </div>
        {/* <div className={style.gallery}>
          <Gallery data={props.data.assets} isMobile={props.isMobile} />
        </div> */}
        <div className={style.backgroundCover}></div>
        <div
          className={style.background}
          /* style={{ backgroundImage: `url(${props.data.headerFilePath})` }} */
        ></div>
      </div>
      {props.data.description && <Card>{props.data.description}</Card>}
      <Card icon={<OndemandVideoIcon />} title="بازی‌ها">
        <GamesList
          data={props.data.games}
          fields={{ club: false, buyButton: false }}
          padding="10px 0 0"
          isMobile={props.isMobile}
          cols={3}
        />
      </Card>
    </div>
  );
};

export default Main;
