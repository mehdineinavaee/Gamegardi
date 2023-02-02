import { useState, useEffect } from "react";
import style from "../../styles/admin/UsersList.module.css";
import api from "../../api";

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
  setState(result.users);
};
const Main = (props) => {
  console.log("render - Admin UsersList");
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  // fetch games
  const [gamesListData, setGamesListData] = useState([]);
  useEffect(() => {
    fetchGamesList(api.adminGetUsersList, setGamesListData);
  }, []);

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog state
  const [dialogOpenState, setDialogOpenState] = useState(false);
  const handleDialogClose = () => {
    setDialogOpenState(false);
  };
  const handleAddClick = () => {
    setDialogOpenState(true);
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog state
  const handleAddGameFormSubmit = (addedGame) => {
    setGamesListData([addedGame, ...gamesListData]);
  };

  return (
    <>
      <div className={style.list}>
        {gamesListData.map((game) => (
          <div className={style.main}>
            <div className={style.name}>{game.fullName}</div>
            <div className={style.phone}>{game.phoneNum}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Main;
