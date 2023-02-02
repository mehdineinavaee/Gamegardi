import style from "../styles/ClubsListA1.module.css";
import Link from "next/link";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";

const Main = (props) => {
  console.log("render - GamesListA1");

  return (
    <div
      className={`${style.main} ${!props.isMobile && style.desktop} ${props.cols && style['cols'+props.cols]}`}
      style={{ padding: props.padding }}
    >
      {props.data.map((game) => (
        <Link href={`/clubs/${game.id}`}>
          <a className={style.game}>
            <div className={`${style.sec1} ${style.image}`}>
              <div
                className={`ar-img ${style.imageIn}`}
                // className='ar-img'
                style={{ backgroundImage: `url(${game.headerFilePath})` }}
              >
                <img className="ar" src="/images/ar_10_x_10.png" />
              </div>
            </div>
            <div className={style.sec2}>
              <div className={style.title}>
                {`${game.name}`}
              </div>

              {/* <div className={`${style.genres} ggtxtcolor1`}>
                {game.Genres &&
                  game.Genres.map((genre) => <span>{genre.name + " "}</span>)}
              </div> */}

              {/* <div className={style.district}>
                {game.city && game.city.name} منطقه{" "}
                {game.district && game.district.name}
              </div> */}

              {/* {(!props.fields ||
                (props.fields && props.fields.club !== false)) && (
                <div className={style.club}>مجموعه {game.club.name}</div>
              )} */}

              {/* {(!props.fields ||
                (props.fields && props.fields.buyButton !== false)) && (
                <div className={style.buy}>
                  <ConfirmationNumberOutlinedIcon /> خرید بلیط
                </div>
              )} */}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
export default Main;
