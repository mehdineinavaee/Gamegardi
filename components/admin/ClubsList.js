import { useState, useEffect } from "react";
import style from "../../styles/admin/ClubsList.module.css";
import api from "../../api";
import ClubsListItem from "./ClubsListItem";

// add club
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Form from "./AddClubForm";

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
  setState(result.clubs);
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
  /* const districts = await fetcher(api.getAllDistricts);
  const types = await fetcher(api.getAllGameTypes);
  const genres = await fetcher(api.getAllGenres);
  const clubs = await fetcher(api.adminGetClubsList, "clubs"); */
  setState({
    cities,
    /* districts,
    types,
    genres,
    clubs, */
  });
};
const Main = (props) => {
  console.log("render - Admin UsersList");
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  // fetch games
  const [gamesListData, setGamesListData] = useState([]);
  const [addGameFormDependencies, setAddGameFormDependencies] = useState({});
  useEffect(() => {
    fetchGamesList(api.adminGetClubsList, setGamesListData);
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
  const handleDialogOpen = () => {
    setDialogOpenState(true);
  };
  const [gameFormInitData, setGameFormInitData] = useState({});
  const handleAddClick = () => {
    // add mode:
    const initData = {
      name: "مجموعه جدید",
      cityId:
        addGameFormDependencies.cities[0] &&
        addGameFormDependencies.cities[0].id,
      location: "0.12345",
      description: "درباره مجموعه",
    };
    setGameFormMode("add");
    setGameFormInitData(initData);
    setDialogOpenState(true);
  };
  const handleEditGamesListItem = async (e, data) => {
    e.stopPropagation();
    // init data:
    // Warning: If "handleEditGamesListItem" is called before
    // "fetchDependencies" is complete, the "addGameFormDependencies" would be null &
    // error occures:
    /* addGameFormDependencies
    debugger */
    // process init data:
    const initData = {
      clubId: data.id,
      name: data.name,
      cityId: data.city.id,
      location: "123456789",
      description: data.description,
    };
    setGameFormMode("edit");
    setGameFormInitData(initData);
    setDialogOpenState(true);
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog state
  const handleAddGameFormSubmit = (addedGame) => {
    // add:
    if (gameFormMode == "add") setGamesListData([addedGame, ...gamesListData]);
    // edit:
    else
      setGamesListData(
        gamesListData.map((gamesListItem) =>
          gamesListItem.id == addedGame.id ? addedGame : gamesListItem
        )
      );

    handleDialogClose();
  };

  return (
    <>
      <div className={style.header}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          افزودن مجموعه
        </Button>
      </div>
      <div className={style.list}>
        {gamesListData.length &&
          gamesListData.map((game) => {
            return (
              <ClubsListItem
                key={game.id}
                data={game}
                onEditButtonClick={(e) => {
                  handleEditGamesListItem(e, game);
                }}
              />
            );
          })}
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
