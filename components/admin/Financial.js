import { useState, useEffect } from "react";
import style from "../../styles/admin/Financial.module.css";
import api from "../../api";
import moment from "jalali-moment";


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
  setState(result.transactions);
};
const Main = (props) => {
  console.log("render - Admin Financial");
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------
  // fetch games
  const [gamesListData, setGamesListData] = useState([]);
  useEffect(() => {
    fetchGamesList(api.adminGetTransactions, setGamesListData);
  }, []);

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
        {gamesListData.length &&
          gamesListData.map((game) => (
            <div className={style.main}>
              <div className={style.sec1}>
                <div className={style.amount}>{game.amount}</div>
                <div className={style.date}>{moment(game.dateTime).format("jYYYY/jMM/jDD")}</div>
                <div className={style.direction}>
                  از {game.drAccount.name} به {game.crAccount.name}
                </div>
              </div>
              <div className={style.sec2}>
                <div className={style.type}>
                  {['', 'شارژ کیف', 'رزرو بازی', 'کمیسیون'][game.type]}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Main;
