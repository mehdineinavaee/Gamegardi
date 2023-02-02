import { useState } from "react";
import style from "../styles/GameMobile.module.css";
import GamesList from './GamesListA1'

const Main = (props) => {
  console.log("render - Club");

  return (
    <div className={style.main}>
      <div className={style.logo}>LOGO</div>
      <div className={style.title}>عنوان مجموعه</div>
      <div className={style.games}><GamesList data={[]} /></div>
    </div>
  );
};

export default Main;
