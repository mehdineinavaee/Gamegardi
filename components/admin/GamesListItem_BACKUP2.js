import { useState } from "react";
import style from "../../styles/admin/GamesListItem.module.css";
import api from "../../api";

// icons
import GridOnIcon from "@material-ui/icons/GridOn";

// components
import Scheduler from "./SchedulerWeek";
import UploadImagesForm from "./UploadImagesForm";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const fetchSchedulerShowings = async (url) => {
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
  return result.WeeklyScheduleRes;
};

const Main = (props) => {
  console.log("render - GamesLIstItem");

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // scheduler load state
  const [gamesListItemData, setGamesListItemData] = useState(props.data);

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // scheduler load state
  const [schedulerLoad, setSchedulerLoad] = useState(false);

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // scheduler data state
  const [schedulerShowings, setSchedulerShowings] = useState([]);
  const handleLoadScheduler = async () => {
    // fetch
    const schedulerFetchedShowings = await fetchSchedulerShowings(
      api.adminGetScheduler + `?gameId=${props.data.id}`
    );
    setSchedulerShowings(schedulerFetchedShowings);
    setSchedulerLoad(true);
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // scheduler dialog state
  const [schedulerDialogOpenState, setSchedulerDialogOpenState] =
    useState(false);
  const handleSchedulerDialogClose = () => {
    setSchedulerDialogOpenState(false);
  };
  const handleOpenSchedulerClick = async () => {
    setSchedulerDialogOpenState(true);
    handleLoadScheduler();
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // upload images form submit
  const handleUploadImagesFormSubmit = (data) => {
    setGamesListData([addedGame, ...gamesListData]);
  };

  return (
    <div className={style.main}>
      <div className={style.sec1}>
        <div className={style.poster}>
          <div
            className="ar-img"
            style={{ backgroundImage: `url(${props.data.poster})` }}
          >
            <img className="ar" src="/images/ar_10_x_10.png" />
          </div>
        </div>
        <div className={style.title}>{props.data.name}</div>
      </div>
      <div className={style.sec2}>
        <div className={style.qr}>
          <div
            className="ar-img"
            style={{ backgroundImage: `url(${props.data.QRLink})` }}
          >
            <img className="ar" src="/images/ar_10_x_10.png" />
          </div>
        </div>
        <GridOnIcon
          className={style.schedulerIcon}
          onClick={handleOpenSchedulerClick}
        />
      </div>
      <Dialog
        open={schedulerDialogOpenState}
        onClose={handleSchedulerDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          {schedulerLoad && (
            <Scheduler
              load={handleLoadScheduler}
              gameId={props.data.id}
              showings={schedulerShowings}
              editable={true}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={uploadImageDialogOpenState}
        onClose={handleSchedulerDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          {schedulerLoad && (
            <UploadImagesForm
              load={handleLoadUploadImagesForm}
              submit={handleUploadImagesFormSubmit}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Main;
