import { useState } from "react";
import style from "../../styles/admin/GamesListItem.module.css";
import api from "../../api";

// icons
import GridOnIcon from "@material-ui/icons/GridOn";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import DeleteForever from "@material-ui/icons/DeleteForever";

// components
import Scheduler from "./SchedulerWeek";
import UploadImageForm from "./UploadImagesForm";
import GalleryForm from "./GalleryForm";
import Reservation from "../ReservationMobile";

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
const fetchDeleteGame = async (url, body) => {
  let result;
  let response = await fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });
  if (response.ok) {
    result = await response.json();
  } else {
    console.log("HTTP-Error: " + response.status);
  }
  return result;
};

const Main = (props) => {
  console.log("render - GamesLIstItem");

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // gameslist item
  const [gamesListItemData, setGamesListItemData] = useState(props.data);

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // upload images form submit
  const handleUploadImagesFormSubmit = (updatedGame) => {
    // setGamesListItemData([updatedGame, ...gamesListItemData]);
    setGamesListItemData(updatedGame);
    handleUploadImageFormDialogClose();
  };

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
      api.adminGetScheduler + `?gameId=${gamesListItemData.id}`
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
  //delete game
  const handleDeleteGame = async (body) => {
    // fetch
    const del = await fetchDeleteGame(
      api.deleteGame, body
    );

  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // gallery
  const [galleryFormDialogOpenState, setGalleryFormDialogOpenState] =
    useState(false);
  const handleGalleryFormDialogClose = () => {
    setGalleryFormDialogOpenState(false);
  };
  const handleGalleryClick = async () => {
    setGalleryFormDialogOpenState(true);
    // handleLoadGallery();
  };
  //
  const handleGalleryFormSubmit = (updatedGame) => {
    // setGamesListItemData([updatedGame, ...gamesListItemData]);
    setGamesListItemData(updatedGame);
    // handleGalleryFormDialogClose();
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // upload image dialog state
  const [uploadImageFormDialogOpenState, setUploadImageFormDialogOpenState] =
    useState(false);
  const handleUploadImageFormDialogClose = () => {
    setUploadImageFormDialogOpenState(false);
  };
  const handleUploadImageFormDialogOpen = async () => {
    if (props.authentication.cookies.userType != 2) {
      setUploadImageFormDialogOpenState(true);
      // handleLoadScheduler();
    }
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // edit

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // reservation dialog
  const [reservationDialogOpenState, setReservationDialogOpenState] =
    useState(false);
  const handleReservationDialogClose = () => {
    setReservationDialogOpenState(false);
  };
  const handleReservationClick = async () => {
    setReservationDialogOpenState(true);
  };

  return (
    <div className={style.main}>
      <div className={style.sec1}>
        <div className={style.poster} onClick={handleUploadImageFormDialogOpen}>
          <div
            className="ar-img"
            style={{
              backgroundImage: `url(${gamesListItemData.tileFilePath})`,
            }}
          >
            <img className="ar" src="/images/ar_10_x_10.png" />
          </div>
        </div>
        <div
          className={style.title}
          onClick={() => {
            if (props.authentication.cookies.userType != 2)
              props.edit(props.data);
          }}
        >
          {gamesListItemData.name}
        </div>
      </div>
      <div className={style.sec2}>
        <a href={gamesListItemData.QRLink} target="_blank">
          <div className={style.qr}>
            <div
              className="ar-img"
              style={{ backgroundImage: `url(${gamesListItemData.QRLink})` }}
            >
              <img className="ar" src="/images/ar_10_x_10.png" />
            </div>
          </div>
        </a>
        {props.authentication.cookies.userType == 1 && (
          <>
            <PhotoLibraryIcon
              className={style.icon}
              onClick={handleGalleryClick}
            />
          </>
        )}

        <>
        {props.data.isReservable != 0 && (
        <ConfirmationNumberOutlinedIcon
          className={style.icon}
          onClick={handleReservationClick}
        />
        )}
        </>
        
        <>
        {props.data.isReservable != 0 && (
        <GridOnIcon className={style.icon} onClick={handleOpenSchedulerClick} />
        )}
        </>
        
        
        

        <>
        {props.authentication.cookies.userType == 1 && (
            <DeleteForever className={style.icon} onClick={() => {
              if (confirm('آیا از پاک کردن بازی مطمئن هستید؟')) {
                handleDeleteGame({ gameId: props.data.id })
                location.reload();
              }
            }} />
        )}
        </>
        
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
              gameId={gamesListItemData.id}
              showings={schedulerShowings}
              editable={true}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={uploadImageFormDialogOpenState}
        onClose={handleUploadImageFormDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          <UploadImageForm
            gameId={gamesListItemData.id}
            submit={handleUploadImagesFormSubmit}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={reservationDialogOpenState}
        onClose={handleReservationDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          <Reservation
            authentication={
              // props.authentication
              true
            }
            setLoginFormOpenState={(state) => {
              // props.setLoginFormOpenState(state);
              console.log("cool");
            }}
            gameId={props.data.id}
            gameTitle={props.data.name}
            isMobile={props.isMobile}
            playersNumber={{
              min: props.data.escapeRoomMinPlayer,
              max: props.data.escapeRoomMaxPlayer,
            }}
            isAdmin={true}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={galleryFormDialogOpenState}
        onClose={handleGalleryFormDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          <GalleryForm
            gameId={gamesListItemData.id}
            submit={handleGalleryFormSubmit}
            data={props.data.assets}
          />
        </DialogContent>
      </Dialog>
      {/* <Dialog
        open={editGameDialogOpenState}
        onClose={handleEditGameDialogClose}
        fullWidth={true}
      >
        <DialogContent>
          <EditGameForm
            fields={addGameFormFields}
            close={handleEditGameDialogClose}
            submit={handleEditGameFormSubmit}
          />
        </DialogContent>
      </Dialog> */}

    </div>
  );
};
export default Main;
