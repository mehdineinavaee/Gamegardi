import Link from "next/link";
import style from "../styles/Game.module.css";
import { Grid } from "@material-ui/core";
import Image from "next/image";
import GameMobile from "./GameMobile_BACKUP1";

// tabs
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// acardion
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// icons
import PaymentIcon from "@material-ui/icons/Payment";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";

// list
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// Showings
import ReservationTable from "./ReservationTable";
import { useRouter } from "next/router";
import useSWR from "swr";
import api from "../api.js";
const initShowingsFetcher = async (url, body) => {
  console.log("url > ", url);
  console.log("body > ", body);
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

  console.log("Ali Agha", result);
  return result;
};

//
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&
        // <Box p={3}>
        //   <Typography>{children}</Typography>
        // </Box>
        children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({}));

export const Main = ({ data, isMobile }) => {
  console.log("Game: ", data);
  const classes = useStyles();
  const [value, setValue] = useState(0);

  // showings
  const { data: initShowings, initShowingsError } = useSWR(
    api.getShowings + `?gameId=${data.id}`,
    initShowingsFetcher
  );
  if (initShowingsError) return <div>{error.message}</div>;
  // if (!initShowings) return <div>Loading...</div>;  

  // Reserve Dialog
  const [reserveDialogOpenState, setReserveDialogOpenState] = useState(false);
  const openReserveDialog = () => {
    setReserveDialogOpenState(true);
  };

  const handleReserveDialogCloseState = () => {
    setReserveDialogOpenState(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const $cover_Desktop = (
    <div className={style.cover}>
      <div className={style.coverContent}>
        <div className={style.coverInfo}>
          <div className={style.titles}>
            <div className={style.gameTitle}>{data.name}</div>
            <div className={style.clubTitle}>{data.club.name}</div>
          </div>
          <div className={style.shortDescription}>
            {data.city.name} - {data.address}
          </div>
          <div className={style.labels}>
            <div className={style.lbl}>{data.escapeRoomGenreTypeTitle}</div>
            <div className={style.lbl}>{data.duration} دقیقه</div>
            <div className={style.lbl}>
              {data.escapeRoomMinPlayer} تا {data.escapeRoomMaxPlayer} نفر
            </div>
            {/* <div className={style.lbl}>نفری 80 سانس آخر 90</div> */}
          </div>
          <div className={style.tools}>
            <button className={style.buyButton} onClick={openReserveDialog}>
              <PaymentIcon style={{ fontSize: 20, marginLeft: 5 }} />
              خرید بلیط
            </button>
          </div>
        </div>
        <div
          className={`${style.gameImage} ar-wrap`}
          style={{ backgroundImage: `url(${data.tileFilePath})` }}
        >
          <img className="ar" src="/images/ar_7_x_10.png" />
        </div>
      </div>
      <div
        className={style.coverBg}
        style={{ backgroundImage: `url(${data.tileFilePath})` }}
      ></div>
    </div>
  );

  const $subcover_Desktop = (
    <div className={style.subCover}>
      <Grid container>
        <Grid item className={style.gridItem}>
          <div className={style.gameContent}>
            <div className={`${style.contentBoxWrap} ${style.scenario}`}>
              <div className={style.contentBox}>
                <div className={style.title}>سناریو</div>
                <div className={style.content}>
                  <p>{data.escape_room_story}</p>
                </div>
              </div>
            </div>
            <div className={`${style.contentBoxWrap} ${style.rules}`}>
              <div className={style.contentBox}>
                <div className={style.title}>قوانین بازی</div>
                <div className={style.content}>
                  <List>
                    {eval(JSON.parse(data.escape_room_conditions)).map(
                      (condition) => {
                        return (
                          <ListItem>
                            <ListItemIcon>
                              <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText primary={condition.text} />
                          </ListItem>
                        );
                      }
                    )}
                  </List>
                </div>
              </div>
            </div>
            <div className={`${style.contentBoxWrap} ${style.address}`}>
              <div className={style.contentBox}>
                <div className={style.title}>آدرس</div>
                <div className={style.content}>
                  <p>
                    {data.city.name} - {data.address}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className={`${style.contentBoxWrap} ${style.faq}`}>
            <div className={style.contentBox}>
              <div className={style.title}>سوالات متداول</div>
              <div className={style.content}></div>
            </div>
          </div> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div className={`${style.game} ${isMobile ? style.mobile : ""}`}>
      {isMobile ? <GameMobile data={data} /> : $cover_Desktop}
      {!isMobile ? $subcover_Desktop : ""}
      <Dialog
        onClose={handleReserveDialogCloseState}
        aria-labelledby="simple-dialog-title"
        open={reserveDialogOpenState}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="simple-dialog-title">رزرو بلیط</DialogTitle>
        <DialogContent>
          <ReservationTable data={initShowings} isMobile={isMobile} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleReserveDialogCloseState}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Main;
