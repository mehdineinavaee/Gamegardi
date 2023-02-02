import style from "../styles/GamesListA1.module.css";
import Link from "next/link";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import ExploreIcon from '@material-ui/icons/Explore';

const Main = (props) => {
  console.log("render - GamesListA1");

  // const game_distance = 0.8

  return (
    <div
      className={`${style.main} ${!props.isMobile && style.desktop} ${
        props.cols && style["cols" + props.cols]
      }`}
      style={{ padding: props.padding }}
    >
      {props.data.map((game) => (
        <Link href={`/games/${game.id}`}>
          <a className={style.game}>
            <div className={`${style.sec1} ${style.image}`}>
              <div
                className="ar-img"
                style={{ backgroundImage: `url(${game.tileFilePath})` }}
              >
                <img className="ar" src="/images/ar_7_x_10.png" />
              </div>
              {game.gameState == 2 && (
                <div className={style.tag} style={{ background: "#0d9330" }}>
                  به زودی
                </div>
              )}
              {game.gameState == 3 && (
                <div className={style.tag} style={{ background: "#e90000" }}>
                  متوقف شده
                </div>
              )}
              {game.gameState == 4 && (
                <div className={style.tag} style={{ background: "#ff9337" }}>
                  توقف موقت
                </div>
              )}
              {(game.isSuggestion == true && game.gameState == 1) && (
                <div className={style.tag} style={{ background: "#218ae5" }}>
                  پیشنهاد ما
                </div>
              )}
          
            </div>
            <div className={style.sec2}>
              <div
                className={style.title}
              >{`${game.name}`}</div>
              <div className={`${style.genres} ggtxtcolor1`}>
                {game.Genres &&
                  game.Genres.map((genre) => <span>{genre.name + " "}</span>)}
              </div>
              <div className={style.district}>
                {game.city && game.city.name} محدوده{" "}
                {game.district && game.district.name}
              </div>
              {game.distance && (
                <div className={style.distance}>
                  <ExploreIcon />
                  فاصله: {
                    (game.distance > 1 ? game.distance + ' ' + 'کیلومتر' : 'کمتر از یک کیلومتر')
                  }
                </div>
              )}
              {(!props.fields ||
                (props.fields && props.fields.club !== false)) && (
                <div className={style.club}>مجموعه {game.club.name}</div>
              )}
              {(!props.fields ||
                (props.fields && props.fields.buyButton !== false)) && (
                <div className={style.buy}>
                  <ConfirmationNumberOutlinedIcon /> مشاهده جزئیات
                </div>
              )}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default Main;
