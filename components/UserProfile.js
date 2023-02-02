import { useState } from "react";
import style from "../styles/UserProfile.module.css";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import moment from "jalali-moment";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";

// components
import Card from "./Card";
import PreviewCard from "./PreviewCard";
import Reservation from "./ReservationMobile";
import Comments from "./UserProfileComments";
import CommentForm from "./CommentForm";
import Gallery from "./Gallery";
import Teaser from "./Teaser";

// mapir
import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
  () => {
    // import('./api-key');
    // return import('../components/map');
    return import("./Mapir");
  },
  {
    ssr: false,
  }
);

// icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
/* import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import LinkIcon from "@material-ui/icons/Link";
import InstagramIcon from "@material-ui/icons/Instagram";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
 */
// tab
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Height } from "@material-ui/icons";
const theme = createMuiTheme({
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "rgba(0,0,0,0.9)",
      },
    },
  },
});

const useStyles = makeStyles({
  tabsIndicator: {
    backgroundColor: "#ff3543",
    backgroundColor: "#0718fc",
  },
  tab: {
    width: "50%",
    "&$selected": {
      color: "black",
    },
  },
  selected: {},
  dialogContentRoot: {
    padding: "10px !important",
  },
});

const Main = (props) => {
  console.log("render - Game");

  const classes = useStyles();

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // tabs
  const [tabVisibleIndex, setTabVisibleIndex] = useState(props.qrCode ? 1 : 0);
  const handleTabChange = (event, newValue) => {
    setTabVisibleIndex(newValue);
  };

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // add comment dialog
  /* const [addCommentDialogOpenState, setAddCommentDialogOpenState] = useState(
    props.qrCode ? true : false
  );
  const openAddCommentDialog = () => {
    if (props.authentication.state) setAddCommentDialogOpenState(true);
    else props.setLoginFormOpenState(true);
  };
  const handleAddCommentDialogClose = () => {
    setAddCommentDialogOpenState(false);
  }; */

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // total comments
  const [totalComments, setTotalComments] = useState("");
  const handleCommentsLoaded = (totalComments) => {
    setTotalComments(`تعداد نظرات: ${totalComments}`);
  };

  // const storyView = props.data.escape_room_story.substring(0, 90) + "...";

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // poster full size
  /* const [posterFullSizeOpenState, setPosterFullSizeOpenState] = useState(false);
  const handlePosterClick = (e) => {
    setPosterFullSizeOpenState(true);
  };
  const handlePosterFullSizeClose = () => {
    setPosterFullSizeOpenState(false);
  };
  let fullSizePosterDimentions = {
    width: "100%",
  };
  !props.isMobile &&
    (fullSizePosterDimentions = {
      // height: window.screen.height * 0.7 + 'px',
      height: "70vh",
    }); */

  /* const Map = Mapir.setToken({
    transformRequest: (url) => {
      debugger;
      return {
        url: url,
        headers: {
          "x-api-key":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM3N2M0YjNlMzVkZTMyZWJhNTJiZmYzMjE3NzM5NDQxZGNlNjc3YTU3NTVkZWVhZmQ5ZDI4YzJkNjRmZDJlMzQyYzNlZTJmMzEzZDgxYWJlIn0.eyJhdWQiOiIxNTUxNiIsImp0aSI6ImM3N2M0YjNlMzVkZTMyZWJhNTJiZmYzMjE3NzM5NDQxZGNlNjc3YTU3NTVkZWVhZmQ5ZDI4YzJkNjRmZDJlMzQyYzNlZTJmMzEzZDgxYWJlIiwiaWF0IjoxNjMxOTU4ODU0LCJuYmYiOjE2MzE5NTg4NTQsImV4cCI6MTYzNDY0MDg1NCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.M3Z8gRhk0ETprnyzOp7iPs6puNpjQwhtSVfBigTUx7SRunQhTClW5biZY1-ADP9dtDWGWkaR4ZqGwnWI6Zpg_NIfne4OPXQ1m3CcDsFt1l7f-eSXXZkTDlT4-xKNGUEcE-CPlhCSWMniMWlR1bIDnCeyL2bvpjRqLCLhsQHbzvYVvNFnqOnCxBNJYDwwUUXWzDp6rIAaa5dNJjxt7E4tRoKmB53VF5vC-jjeqOqKxtq6UXQkMA_fPF1W5u4XwSjxBnmjy4DOjM8TrhpaqYE-aAZdeK-cYDsdUeCMMXdoF8wkVaL59YH07uWaSF7PWGWaZtdT7b73T0Ol1ZEpGnz9mw", //Mapir api key
          "Mapir-SDK": "reactjs",
        },
      };
    },
  }); */

  return (
    <div className={`${style.main} ${!props.isMobile && style.desktop}`}>
      <div className={style.cover}>
        <AccountCircleIcon />
        <div className={style.name}>{props.data.fullName}</div>
      </div>

      <Paper square>
        <Tabs
          value={tabVisibleIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="disabled tabs example"
          classes={{ indicator: classes.tabsIndicator }}
          className={style.tabs}
        >
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="اطلاعات کاربر"
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="نظرات"
          />
        </Tabs>
      </Paper>
      <TabPanel visibleIndex={tabVisibleIndex} index={0}>
        <div className={style.dataGrid} style={{ marginTop: '30px' }}>
          <div className={style.field}>
            <label>نام</label>
            <div className={style.value}>
              {props.data.fullName}
            </div>
          </div>
          <div className={style.field}>
            <label>تاریخ عضویت</label>
            <div className={style.value}>
              {moment(props.data.updatedAt).format("jYYYY/jMM/jDD")}
            </div>
          </div>
          <div className={style.field}>
            <label>شماره تماس</label>
            <div className={style.value}>
              {
                props.data.phoneNum
              }
            </div>
          </div>
          <div className={style.field}>
            <label>وضعیت مالی</label>
            <div className={style.value}>0</div>
          </div>
        </div>
      </TabPanel>
      <TabPanel visibleIndex={tabVisibleIndex} index={1}>
        <div className={style.commentsHeader}>
          <div className={style.totalComments}>{totalComments}</div>
          {/* <Button onClick={openAddCommentDialog} variant="outlined">
            + افزودن نظر
          </Button> */}
        </div>
        <Card>
          <Comments userId={props.data.userId} loaded={handleCommentsLoaded} />
        </Card>
      </TabPanel>

      {/* <Dialog
        open={addCommentDialogOpenState}
        onClose={handleAddCommentDialogClose}
        fullWidth={true}
      >
        <DialogTitle id="simple-dialog-title">
          بازی {props.data.name} - ثبت نظر
        </DialogTitle>
        <DialogContent>
          <CommentForm
            gameId={props.data.id}
            qrCode={props.qrCode}
            submit={handleAddCommentDialogClose}
          />
        </DialogContent>
      </Dialog> */}

      {/* <ThemeProvider theme={theme}>
        <Dialog
          open={posterFullSizeOpenState}
          onClose={handlePosterFullSizeClose}
          fullWidth={props.isMobile && true}
          classes={props.isMobile && { paper: classes.dialogPaper }}
        >
          <DialogContent
            // classes={props.isMobile && { root: classes.dialogContentRoot }}
            classes={{ root: classes.dialogContentRoot }}
          >
            <img
              src={props.data.tileFilePath}
              style={{
                display: "block",
                ...fullSizePosterDimentions,
              }}
            />
          </DialogContent>
        </Dialog>
      </ThemeProvider> */}
    </div>
  );
};

export default Main;
