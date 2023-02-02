import style from "../styles/GamesList.module.css";
import api from "../api.js";
import useSWR from "swr";
import GamesListItem from "./GamesListItem";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Link from "next/link";
import { Grid, Box } from "@material-ui/core";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Main = (props) => {
  const { data, error } = useSWR(api.homeGames, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const gameMainPageComponentSelector = (cat) => {
    if (cat.type == "game") {
      // game row
      return (
        <div className={style.cat}>
          <div className={style.catHeader}>
            <div className={style.catTitle}>{cat.title}</div>
            <div className={style.readMore}>
              <Link href={`/search/games?${cat.qs}`}>
                <a>مشاهده همه</a>
              </Link>
              <KeyboardArrowLeftIcon /* onClick={handleNextClick} */ />
            </div>
          </div>
          <div className={style.games}>
            {cat.items.map((game, i) => (
              <GamesListItem key={i} data={game} isMobile={props.isMobile} />
            ))}
          </div>
        </div>
      );
    } else if (cat.type == "banner1x") {
      // banner row (1 Col)
      let style = props.isMobile
        ? { marginBottom: "16px", marginTop: "-29px" }
        : { marginBottom: "20px" };
      return (
        <Grid xs={12} md={12} lg={12} className={style.cat} style={style}>
          <Link href={cat.qs}>
            <a target="_blank">
              <img src={cat.imageUrl} style={{ width: "100%" }} />
            </a>
          </Link>
        </Grid>
      );
    } else if (cat.type == "banner2x") {
      // banner row (2 Cols)
      let style = props.isMobile
        ? {
            marginBottom: "16px",
            marginTop: "-29px",
            overflow: "hidden",
            alignContent: "center",
          }
        : {
            marginBottom: "20px",
            height: "400px",
            overflow: "hidden",
            alignContent: "center",
          };
      return (
        <Grid
          container
          xs={12}
          md={12}
          lg={12}
          className={style.cat}
          style={style}
        >
          <Grid item xs={6} md={6} lg={6}>
            <Link href={cat.qs[0]}>
              <a target="_blank">
                <img src={cat.imageUrl[0]} style={{ width: "100%" }} />
              </a>
            </Link>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Link href={cat.qs[1]}>
              <a target="_blank">
                <img src={cat.imageUrl[1]} style={{ width: "100%" }} />
              </a>
            </Link>
          </Grid>
        </Grid>
      );
    }
  };

  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  /******************************************************************************/
  const handleNextClick = (e) => {
    alert();
  };

  // return (
  //   <div className={`${style.main} ${props.isMobile && style.mobile}`}>
  //     {data.result.map((cat, i) => (
  //       <div className={style.cat}>
  //         <div className={style.catHeader}>
  //           <div className={style.catTitle}>{cat.title}</div>
  //           <div className={style.readMore}>
  //             <Link href={`/search/games?${cat.qs}`}>
  //               <a>مشاهده همه</a>
  //             </Link>
  //             <KeyboardArrowLeftIcon /* onClick={handleNextClick} */ />
  //           </div>
  //         </div>
  //         <div className={style.games}>
  //           {cat.items.map((game, i) => (
  //             <GamesListItem key={i} data={game} isMobile={props.isMobile} />
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className={`${style.main} ${props.isMobile && style.mobile}`}>
      {data.result.map((cat, i) => gameMainPageComponentSelector(cat))}
    </div>
  );
};

export default Main;
