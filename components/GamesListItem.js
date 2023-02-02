import Link from "next/link";
import style from "../styles/GamesListItem.module.css";

export const Main = (props) => {
  return (
    <Link href={`/games/${props.data.id}`}>
      <a className={`${style.game} ${props.isMobile && style.mobile}`}>
        <div
          className={`${style.gamePoster} ar-img`}
          style={{ backgroundImage: `url(${props.data.tileFilePath})` }}
        >
          <img className="ar" src="/images/ar_7_x_10.png" />
          {props.data.gameState == 2 && (
            <div className={style.tag} style={{ background: "#0d9330" }}>
              به زودی
            </div>
          )}
          {props.data.gameState == 3 && (
            <div className={style.tag} style={{ background: "#e90000" }}>
              متوقف شده
            </div>
          )}
           {props.data.gameState == 4 && (
            <div className={style.tag} style={{ background: "#ff9337" }}>
              توقف موقت
            </div>
          )}
          {(props.data.gameState == 1 && props.data.isSuggestion == true) && (
             <div className={style.tag} style={{ background: "#218ae5" }}>
            پیشنهاد ما
           </div>
          ) }
        </div>
        <div className={style.title}>{props.data.name}</div>
        <div className={`${style.genre} ggtxtcolor1`}>
          {props.data.Genres[0] && props.data.Genres[0].name}
        </div>
        <div className={style.district}>
          {props.data.city && props.data.city.name}{" "}
          {props.data.district && props.data.district.name}
        </div>
      </a>
    </Link>
  );
};

export default Main;
