import useSWR from "swr";
import api from "../../api.js";
import GamesList from "../GamesListA1";
import SearchFilters from "./SearchFilters";
import { Grid, Hidden } from "@material-ui/core";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from 'next/head'
import Button from '@material-ui/core/Button';

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data.result;
};

// offset and limit
let offset = 0;
let limit = 9;
//

//all data are fetched
let allDataFetched = false;

let reqUrlStr = null;

let data;
let setData;

const Main = (props) => {
  console.log("render - search/Games");

  let gamesListComponent;
  const router = useRouter();

  // cols
  let cols = null;
  if (!props.isMobile)
    cols = 3;
  //

  const [showMoreTitle, setShowMoreTitle] = useState('نمایش بیشتر');

  [data, setData] = useState([]);
  const fetchGamesHandler = async () => {
    if (allDataFetched == true) {
      return;
    }

    reqUrlStr = (typeof props.requestUrl !== "undefined" && props.requestUrl !== "undefined") ? props.requestUrl : '';
    let newRes = await fetcher(api.search + reqUrlStr + '&offset=' + offset + '&limit=' + limit);
    setData([...data, ...newRes]);
    offset = offset + limit;
    if (newRes.length < limit) {
      allDataFetched = true;
      if (data.length > 0)
        setShowMoreTitle('بازی بیشتری برای نمایش وجود ندارد');
      else
        setShowMoreTitle('نتیجه ای پیدا نشد');
    }

  }

  gamesListComponent = <GamesList data={data} cols={cols} isMobile={props.isMobile} />;

  useEffect(() => { //side effects on new search
    setData([]);// empty game list
    offset = 0;// reset offset
    allDataFetched = false;
    setShowMoreTitle('نمایش بیشتر');
    fetchGamesHandler();
  }, [props.requestUrl])

  /*
  const { data, error } = useSWR(
    // () => id && `/api/parks/${id}`,
    api.search + reqUrlStr + 'offset='+offset+'&limit='+limit,
    fetcher
  );
  if (error) gamesListComponent = error.message;
  if (!data) gamesListComponent = "loading...";
  else gamesListComponent = <GamesList data={data} cols={cols} isMobile={props.isMobile} />;
  */


  // -----------------------------------------------------------------
  // -----------------------------------------------------------------
  // -----------------------------------------------------------------
  // searchFilters data:
  const searchFiltersData = {
    searchTerm: "",
    cities: [],
    districts: [],
    genres: [],
    types: [],
    gameStates: [],
    searchNearByGames: false,
  };
  props.requestUrl &&
    props.requestUrl.split("&").forEach((item) => {
      const itemObj = item.split("=");
      const name = itemObj[0];
      const value = itemObj[1];

      switch (name) {
        case "offset":
        case "limit":
        case "types":
        case "gameStates":
        case "cities":
        case "districts":
        case "genres":
          !searchFiltersData[name] && (searchFiltersData[name] = []);
          searchFiltersData[name].push(Number(value));
          break;
        case "searchTerm":
          searchFiltersData[name] = value;
          break;
        case "searchNearByGames":
          searchFiltersData[name] = value === "true";
          break;
        case "isNew":
          searchFiltersData[name] = value === "true";
          break;
        case "lat":
        case "lng":
          searchFiltersData[name] = Number(value);
          break;
        case 'isSuggestion':
          searchFiltersData[name] = value === "true";
          break;
      }
    });
  // -----------------------------------------------------------------

  return (
    <>
      <Head>
        <meta name='robots' content='noindex' />
      </Head>
      <SearchFilters
        data={searchFiltersData}
        isMobile={props.isMobile}
      />
      {gamesListComponent}
      <Grid container justify="center" lg={12} xs={12} md={12}>
        <Button color="primary" style={{ 'text-align': 'center' }} onClick={fetchGamesHandler} variant="outlined">{showMoreTitle}</Button>
      </Grid>

    </>
  );
};
export default Main;
