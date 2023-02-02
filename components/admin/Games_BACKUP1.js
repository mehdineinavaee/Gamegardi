import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import style from "../../styles/admin/Games.module.css";
import api from "../../api";
import GamesList from "./GamesList_BACKUP1";

// theme
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  typography: {
    "fontFamily": `"escapeRoom", "shabnam", "Tahoma",`
  },
});

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

// form
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// #Games List Data, #Get Games, #Load Games, #Club Games
const fetchGamesList = async (url, setState) => {
  let result;
  // post data:
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(body),
  });
  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    result = await response.json();
  } else console.log("HTTP-Error: " + response.status);

  setState(result.result);
};

const Main = (props) => {
  console.log("Render - Admin Games");
  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // Route
  const router = useRouter();
  const { id: clubId } = router.query;

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // Games List Data
  /*  const { data: gamesListData, error: gamesListDataError } = useSWR(
    `/api/games`,
    fetchGamesList
  );
  if (gamesListDataError) return <div>{gamesListDataError.message}</div>;
  if (!gamesListData) return <div>Loading Games...</div>; */
  const [gamesListData, setGamesListData] = useState([]);
  useEffect(() => {
    fetchGamesList(api.clubGames + `?clubId=${clubId}`, setGamesListData);
  }, []);

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // Add Game Dialog
  const [addGameDialogOpenState, setAddGameDialogOpenState] = useState(false);
  const openAddGameDialog = () => {
    setAddGameDialogOpenState(true);
  };
  const closeAddGameDialog = () => {
    setAddGameDialogOpenState(false);
  };

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // form, submit add game, add fame form ---------------------------------------
  const $addGameForm = useRef(null);
  const submitAddGame = async () => {
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    // text fields post data ------------------------------------------------------
    const textFieldsPostData = {};
    const $inputs = $addGameForm.current.querySelectorAll(".addGameInput");
    $inputs.forEach(($input) => {
      let data;
      switch ($input.dataset.type) {
        case "string":
          data = $input.querySelector("input").value;
          break;
        case "number":
          data = Number($input.querySelector("input").value);
          break;
        case "json":
          data = { توجه: $input.querySelector("input").value };
          break;
        /* case "file":
          data = $input.files[0];
          break; */
      }
      // formData.append($input.dataset.key, data);
      textFieldsPostData[$input.dataset.key] = data;
    });
    textFieldsPostData["clubId"] = clubId;
    // submit add game text fields
    let addGameTextFieldsResponse = await fetch(api.adminAddGame, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: textFieldsPostData,
    });
    if (addGameTextFieldsResponse.ok) {
      // if HTTP-status is 200-299
      // get the addGameTextFieldsResponse body (the method explained below)
      let result = await addGameTextFieldsResponse.json();
      alert("Game Added Successfully");
      const gameId = result.gameId.id
      //-----------------------------------------------------------------------------
      //-----------------------------------------------------------------------------
      // small image post data ------------------------------------------------------
      const $smallImageInput = $addGameForm.current.querySelector(
        ".addGameInputSmallImage"
      );
      const smallImageFormData = new FormData();
      smallImageFormData.append(
        $smallImageInput.dataset.key,
        $smallImageInput.files[0]
      );
      smallImageFormData.append("gameId", gameId);
      // submit add game small image
      let addGameSmallImageResponse = await fetch(api.clubSetSmallImage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: smallImageFormData,
      });
      if (addGameSmallImageResponse.ok) {
        // if HTTP-status is 200-299
        // get the addGameSmallImageResponse body (the method explained below)
        let result = await addGameSmallImageResponse.json();
        alert("Small Image Uploaded.");
      } else {
        alert(
          "HTTP-Error - Small Image: " +
            addGameSmallImageResponse.status
        );
      }
      //-----------------------------------------------------------------------------
      //-----------------------------------------------------------------------------
      // big image post data ------------------------------------------------------
      const $bigImageInput = $addGameForm.current.querySelector(
        ".addGameInputBigImage"
      );
      const bigImageFormData = new FormData();
      bigImageFormData.append(
        $bigImageInput.dataset.key,
        $bigImageInput.files[0]
      );
      bigImageFormData.append("gameId", gameId);
      // submit add game small image
      let addGameBigImageResponse = await fetch(api.clubSetBigImage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: bigImageFormData,
      });
      if (addGameBigImageResponse.ok) {
        // if HTTP-status is 200-299
        // get the addGameBigImageResponse body (the method explained below)
        let result = await addGameBigImageResponse.json();
        alert("Big Image Uploaded.");
        closeAddGameDialog()
      } else {
        alert(
          "HTTP-Error - Big Image: " + addGameBigImageResponse.status
        );
      }
    } else {
      alert("HTTP-Error 1: " + addGameTextFieldsResponse.status);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={style.panel1}>
        <button onClick={openAddGameDialog}>+ افزودن بازی</button>
      </div>

      <GamesList data={gamesListData} />

      {/* add game dialog */}
      <Dialog
        onClose={closeAddGameDialog}
        aria-labelledby="simple-dialog-title"
        open={addGameDialogOpenState}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title">افزودن بازی</DialogTitle>
        <DialogContent>
          <form ref={$addGameForm} noValidate autoComplete="off">
            <TextField
              data-key="name"
              data-type="string"
              className={`${style.formBlock} addGameInput`}
              label="عنوان"
              variant="outlined"
            />
            <TextField
              data-key="cityId"
              data-type="number"
              className={`${style.formBlock} addGameInput`}
              label="آیدی شهر"
              variant="outlined"
            />
            <TextField
              data-key="location"
              data-type="string"
              className={`${style.formBlock} addGameInput`}
              label="آدرس"
              variant="outlined"
            />
            <TextField
              data-key="gameType"
              data-type="number"
              className={`${style.formBlock} addGameInput`}
              label="نوع بازی"
              variant="outlined"
            />
            <TextField
              data-key="defaultCost"
              data-type="number"
              className={`${style.formBlock} addGameInput`}
              label="قیمت"
              variant="outlined"
            />
            <TextField
              data-key="escapeRoomMinPlayer"
              data-type="number"
              className={`${style.formBlock} addGameInput`}
              label="حداقل بازیکن"
              variant="outlined"
            />
            <TextField
              data-key="escapeRoomMaxPlayer"
              data-type="number"
              className={`${style.formBlock} addGameInput`}
              label="حداکثر بازیکن"
              variant="outlined"
            />
            <TextField
              data-key="escapeRoomGenreType"
              data-type="number"
              className={`${style.formBlock} addGameInput`}
              label="ژانر"
              variant="outlined"
            />
            <TextField
              data-key="escapeRoomConditions"
              data-type="json"
              className={`${style.formBlock} addGameInput`}
              label="قوانین"
              variant="outlined"
            />
            <div className={style.formBlock}>
              <label>عکس کوچک:</label>
              <input
                className="addGameInputSmallImage"
                data-key="tileImage"
                accept="image/*"
                type="file"
                data-type="file"
              />
            </div>
            <div className={style.formBlock}>
              <label>عکس بزرگ:</label>
              <input
                className="addGameInputBigImage"
                data-key="headerImage"
                accept="image/*"
                type="file"
                data-type="file"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={submitAddGame} color="primary">
            تایید
          </Button>
          <Button autoFocus onClick={closeAddGameDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default Main;
