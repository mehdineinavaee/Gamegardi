import { useState, useEffect } from "react";
import style from "../../styles/admin/GamesList.module.css";
import useSWR from "swr";
import api from "../../api";
import GamesListItem from "./GamesListItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Form from "./AddGameForm";

/* const fetchGames = (url) => fetch(url).then((res) => res.json());
const { data: fetchData, error } = useSWR(api.getAdminGames, fetchGames);
let render
if (error) render = "Error";
if (!data) render = "بارگیری بازی‌ها...";
if (data) {
  setData(fetchData.games);
  render = data.map((game) => <GamesListItem key={game.id} data={game} />);
}
return render; */

const fetchGamesList = async (url, setState) => {
  let result;
  let response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(body),
  });
  if (response.ok) {
    result = await response.json();
  } else {
    console.log("HTTP-Error: " + response.status);
  }
  setState(result.games);
};
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

  let finalResult;
  switch (resultKey) {
    case "clubs":
      finalResult = result.clubs;
      break;
    default:
      finalResult = result.result;
  }
  return finalResult;
};
const fetchDependencies = async (setState) => {
  const cities = await fetcher(api.getAllCities);
  const districts = await fetcher(api.getAllDistricts);
  const types = await fetcher(api.getAllGameTypes);
  const genres = await fetcher(api.getAllGenres);
  const clubs = await fetcher(api.adminGetClubsList, "clubs");
  setState({
    cities,
    districts,
    types,
    genres,
    clubs,
  });
};

const Main = (props) => {
  console.log("render - Admin GamesList");
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  // fetch games
  const [gamesListData, setGamesListData] = useState([]);
  const [addGameFormDependencies, setAddGameFormDependencies] = useState({});
  useEffect(async () => {
    fetchGamesList(api.getAdminGames, setGamesListData);
    fetchDependencies(setAddGameFormDependencies);
  }, []);

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // game form mode
  const [gameFormMode, setGameFormMode] = useState("add");

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog state
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const handleDialogClose = () => {
    setDialogOpenState(false);
  };
  const [gameFormInitData, setGameFormInitData] = useState({});
  const handleAddClick = () => {
    // add mode:
    const initData = {
      name: "بازی جدید",
      cityId:
        addGameFormDependencies.cities[0] &&
        addGameFormDependencies.cities[0].id,
      location: "0.12345",
      gameType:
        addGameFormDependencies.types[0] && addGameFormDependencies.types[0].id,
      defaultCost: 650000,
      defaultCommissionCost: 6500,
      escapeRoomMinPlayer: 2,
      escapeRoomMaxPlayer: 15,
      escapeRoomConditions: '[{"text":""}]',
      escapeRoomQuestions: '[{"text":""}]',
      clubId:
        addGameFormDependencies.clubs[0] && addGameFormDependencies.clubs[0].id,
      address: "تهران، سعادت آباد",
      duration: 120,
      districtId:
        addGameFormDependencies.districts[0] &&
        addGameFormDependencies.districts[0].id,
      priority: 1,
      phoneNum: "09123169658",
      smsPhoneNum: "09123169658",
      isReservable: true,
      linkToGameSite: "http://www.gamegardi.com",
      linkToInstagram: "https://instagram.com/gamegardi",
      linkToWhatsApp: "https://wa.me/",
      year: 1400,
      month: 1,
      genreIds: [
        addGameFormDependencies.genres && addGameFormDependencies.genres[0].id,
      ],
      escapeRoomStory: "",
    };
    setGameFormMode("add");
    setGameFormInitData(initData);
    setDialogOpenState(true);
  };
  const handleEditGamesListItem = async (initData) => {
    // init data:
    // Warning: If "handleEditGamesListItem" is called before
    // "fetchDependencies" is complete, the "addGameFormDependencies" would be null &
    // error occures:
    /* addGameFormDependencies
    debugger */
    // process init data:
    initData = {
      name: initData.name,
      cityId: initData.city.id,
      location: initData.location,
      gameType: initData.gameType,
      defaultCost: initData.defaultCost,
      defaultCommissionCost: initData.defaultCommissionCost,
      escapeRoomMinPlayer: initData.escapeRoomMinPlayer,
      escapeRoomMaxPlayer: initData.escapeRoomMaxPlayer,
      escapeRoomConditions: initData.escapeRoomConditions,
      escapeRoomQuestions: initData.escapeRoomQuestions,
      clubId: initData.club.id,
      address: initData.address,
      duration: initData.duration,
      districtId: initData.district.id,
      priority: initData.priority,
      phoneNum: initData.phoneNum,
      smsPhoneNum: initData.smsPhoneNum,
      isReservable: initData.isReservable,
      linkToGameSite: initData.linkToGameSite,
      linkToInstagram: initData.linkToInstagram,
      linkToWhatsApp: initData.linkToWhatsApp,
      year: initData.year,
      month: initData.month,
      genreIds: initData.Genres.map((Genre) => Genre.id),
      escapeRoomStory: initData.escapeRoomStory,
      gameId: initData.id,
      gameState: initData.gameState,
      description: initData.description,
      isSuggestion: initData.isSuggestion

    };
    setGameFormMode("edit");
    setGameFormInitData(initData);
    setDialogOpenState(true);
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog stat
  const handleAddGameFormSubmit = (game) => {
    // add:
    if (gameFormMode == "add") {
      setGamesListData([game, ...gamesListData]);
    }
    // eidt:
    else {
      /* const gameToBeEdited = gamesListData.find(
        (gamesListItem) => gamesListItem.id == game.id
      );
      const index = gamesListData.indexOf(gameToBeEdited);
      const n = JSON.parse(JSON.stringify(gamesListData));
      game.id = "xxx";
      n[index] = game;
      n;
      debugger;
      const aaa = new Array(16); */
      setGamesListData(
        gamesListData.map((gamesListItem) =>
          gamesListItem.id == game.id ? game : gamesListItem
        )
      );
    }

    handleDialogClose();
  };

  return (
    <>
      <div className={style.header}>
        {props.authentication.state &&
          props.authentication.cookies.userType != 2 && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              افزودن بازی
            </Button>
          )}
      </div>
      <div className={style.list}>
        {gamesListData.map((game, i) => (
          <GamesListItem
            key={game.id}
            data={game}
            edit={handleEditGamesListItem}
            isMobile={props.isMobile}
            authentication={props.authentication}
          />
        ))}
      </div>
      <Dialog
        open={dialogOpenState}
        onClose={handleDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          <Form
            dependencies={addGameFormDependencies}
            initData={gameFormInitData}
            close={handleDialogClose}
            submit={handleAddGameFormSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Main;
