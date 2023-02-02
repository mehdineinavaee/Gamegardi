import { useState } from "react";
import style from "../../styles/admin/GamesListItem.module.css";
import api from "../../api";
import WSchedule from "./SchedulerWeek";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

// theme
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    type: "dark",
  },
  typography: {
    "fontFamily": `"escapeRoom", "shabnam", "Tahoma",`
  },
});

const Main = (props) => {
  console.log("Render - Admin Games List Item");

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // WSchedule Data
  const [wscheduleData, setWScheduleData] = useState({
    showings: [],
    gameId: -1,
  });

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // WSchedule Dialog
  const [wscheduleDialogOpenState, setWScheduleDialogOpenState] =
    useState(false);
  const openWScheduleDialog = () => {
    setWScheduleDialogOpenState(true);
  };
  const closeWScheduleDialog = () => {
    setWScheduleDialogOpenState(false);
  };

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // QR Dialog
  const [qrDialogOpenState, setQRDialogOpenState] = useState(false);
  const closeQRDialog = () => {
    setQRDialogOpenState(false);
  };
  const handleQRClick = (e) => {
    e.stopPropagation();
    setQRDialogOpenState(true);
  };

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // Load WSchedule
  const loadWSchedule = async () => {
    // request wschedule data:
    let result;
    let response = await fetch(
      api.getAdminShowings + `?gameId=${props.data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        // body: formData,
      }
    );
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      result = await response.json();
    } else {
      alert("HTTP-Error: " + response.status);
    }
    console.log("TEST RESPONSE: ", result.WeeklyScheduleRes);

    setWScheduleData({
      showings: result.WeeklyScheduleRes,
      gameId: props.data.id,
    });
  };

  //-----------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  // Handle Game Click
  const handleMainClick = async () => {
    await loadWSchedule();
    openWScheduleDialog();
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={style.main} onClick={handleMainClick}>
        <div className={style.row1}>
          <div className={`${style.image} ar-wrap`}>
            <img className="ar" src="/images/ar_10_x_4.png" />
            <div
              className="ar-img"
              style={{ backgroundImage: `url(${props.data.tileFilePath})` }}
            ></div>
          </div>
        </div>
        <div className={style.row2}>
          <div className={style.title}>{props.data.name}</div>
          <div className={style.qr} onClick={handleQRClick}>
            <img src={props.data.QRLink} />
          </div>
        </div>
      </div>

      {/* wschedule dialog */}
      <Dialog
        onClose={closeWScheduleDialog}
        aria-labelledby="simple-dialog-title"
        open={wscheduleDialogOpenState}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title">سانس های بازی</DialogTitle>
        <DialogContent>
          <WSchedule
            data={wscheduleData}
            editable={true} /* isMobile={isMobile} */
            load={loadWSchedule}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeWScheduleDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* QR Dialog */}
      <Dialog
        onClose={closeQRDialog}
        aria-labelledby="simple-dialog-title"
        open={qrDialogOpenState}
      >
        <DialogTitle id="simple-dialog-title">Scan Here !</DialogTitle>
        <DialogContent>
          <img className={style.originalQR} src={props.data.QRLink} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeQRDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};
export default Main;
