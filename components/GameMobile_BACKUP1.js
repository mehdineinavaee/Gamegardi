import style from "../styles/GameMobile.module.css";
// icons
import PaymentIcon from "@material-ui/icons/Payment";
import InfoIcon from "@material-ui/icons/Info";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PeopleIcon from "@material-ui/icons/People";
//////
import { useState } from "react";
import { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
///////////////////
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

// list
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    background: "#5f5e5e",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GameMobile = ({ data, isMobile }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={style.main}
      style={{ height: `${window.innerHeight - 60}px` }}
    >
      <div className={style.coverInfo}>
        <div className={style.titles}>
          <div className={style.gameTitle}>{data.name}</div>
          <div className={style.clubTitle}>{data.club.name}</div>
        </div>
        <div className={style.labels}>
          <div className={style.lbl}>
            <LocalLibraryIcon style={{ fontSize: 20 }} />
            <span>{data.escapeRoomGenreTypeTitle}</span>
          </div>
          <div className={style.lbl}>
            <AccessTimeIcon style={{ fontSize: 20 }} />
            <span>{data.duration} دقیقه</span>
          </div>
          <div className={style.lbl}>
            <PeopleIcon style={{ fontSize: 20 }} />
            <span>
              {data.escapeRoomMinPlayer} تا {data.escapeRoomMaxPlayer} نفر
            </span>
          </div>
          {/* <div className={style.lbl}>
            <PaymentIcon style={{ fontSize: 20 }} />
            <span>نفری 80 سانس آخر 90</span>
          </div> */}
        </div>
      </div>
      <button className={style.infoButton} onClick={handleClickOpen}>
        {/* اطلاعات بازی */}
        <InfoIcon style={{ fontSize: 30 /* marginRight:'5px' */ }} />
      </button>
      {/* <div
        className={style.poster}
        style={{ backgroundImage: `url("/images/game_2.jpg")` }}
      ></div> */}
      <div className={style.shortDescription}>
        {data.city.name} - {data.address}
      </div>
      <div className={style.bottomBar}>
        <button className={style.buyButton}>
          <PaymentIcon style={{ fontSize: 20, marginLeft: 5 }} />
          خرید بلیط
        </button>
        {/* <div className={style.price}>نفری 80 سانس آخر 90</div> */}
      </div>
      <div
        className={style.bg}
        style={{ backgroundImage: `url(${data.tileFilePath})` }}
      ></div>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="default"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <span className={style.gameInfoTitle}>اطلاعات بازی</span>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className={style.contentBox}>
            <div className={style.title}>سناریو</div>
            <div className={style.content}>
              <p>{data.escape_room_story}</p>
            </div>
          </div>
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
          <div className={style.contentBox}>
            <div className={style.title}>آدرس</div>
            <div className={style.content}>
              <p>
                {data.city.name} - {data.address}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameMobile;
