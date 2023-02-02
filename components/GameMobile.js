import { useState, useEffect } from "react";
import style from "../styles/GameMobile.module.css";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";

// components
import Card from "./Card";
import PreviewCard from "./PreviewCard";
import Reservation from "./ReservationMobile";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Gallery from "./Gallery";
import Teaser from "./Teaser";
import { Grid, Hidden } from "@material-ui/core";

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
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import LinkIcon from "@material-ui/icons/Link";
import InstagramIcon from "@material-ui/icons/Instagram";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import DirectionsIcon from '@material-ui/icons/Directions';
import GavelRounded from '@material-ui/icons/GavelRounded';

// tab
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Height, RedoOutlined } from "@material-ui/icons";
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
  const [addCommentDialogOpenState, setAddCommentDialogOpenState] = useState(
    props.qrCode ? true : false
  );
  const openAddCommentDialog = () => {
    if (props.authentication.state) setAddCommentDialogOpenState(true);
    else props.setLoginFormOpenState(true);
  };
  const handleAddCommentDialogClose = () => {
    setAddCommentDialogOpenState(false);
  };
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // total comments
  const [totalComments, setTotalComments] = useState("");
  const [totalCommentsNum, setTotalCommentsNum] = useState(0);
  const handleCommentsLoaded = (totalComments) => {
    setTotalComments(`تعداد نظرات: ${totalComments}`);
    setTotalCommentsNum(totalComments);
  };

  const storyView = props.data.escape_room_story.substring(0, 90) + "...";
  const [dirLink, setDirLink] = useState("");
  const description = props.data.description;
  //comments pagination
  const limit = 10;
  let [offset, setOffset] = useState(0);

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // poster full size
  const [posterFullSizeOpenState, setPosterFullSizeOpenState] = useState(false);
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
    });

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

  useEffect(async () => {
    if (/Android/i.test(navigator.userAgent)) {
      setDirLink("geo:0,0?q=" + props.data.lat + "," + props.data.lng);
    }
    else {
      setDirLink("http://maps.google.com/maps?daddr=" + props.data.lat + "," + props.data.lng);
    }
  }, []);
  const [teasers, setTeasers] = useState([]);

  useEffect(() => {
    let tmp = [];
    props.data.assets.forEach(asset => {
      if (asset.fileLink) tmp.push(asset);
    });
    setTeasers(tmp);
  }, [])

  const isLinkToSite = function () {
    if (props.data.linkToGameSite == null || props.data.linkToGameSite == "") {
      return false;
    }
    else {
      return true;
    }
  }
  const isLinkToWhatsApp = function () {
    if (props.data.linkToWhatsApp == null || props.data.linkToWhatsApp == "") {
      return false;
    }
    else {
      return true;
    }
  }
  const isLinkToInstagram = function () {
    if (props.data.linkToInstagram == null || props.data.linkToInstagram == "") {
      return false;
    }
    else {
      return true;
    }
  }
  const onLoginClose = () => {
    openAddCommentDialog();
    handleAddCommentDialogClose();
  }
  return (
    <div className={`${style.main} ${!props.isMobile && style.desktop}`}>
      <div className={style.cover}>
        <div className={style.content}>
          <div className={style.sec1}>
            {/* <div
            className={`${style.poster} ar-img`}
            style={{ backgroundImage: `url(${props.data.tileFilePath})` }}
          >
            <img className="ar" src="/images/ar_7_x_10.png" />
          </div> */}
            <div className={style.poster}>
              <img src={props.data.tileFilePath} onClick={handlePosterClick} alt={props.data.name} />
              {props.data.gameState == 2 && (
                <div className={style.tag} style={{ background: "#0d9330" }}>
                  به زودی
                </div>
              )}
              {props.data.gameState == 3 && (
                <div className={style.tag} style={{ background: "#e90000" }}>
                  متوقف شده
                </div>
              )}
              {props.data.gameState == 4 && (
                <div className={style.tag} style={{ background: "#ff9337" }}>
                  توقف موقت
                </div>
              )}
              {(props.data.gameState == 1 && props.data.isSuggestion) && (
                <div className={style.tag} style={{ background: "#218ae5" }}>
                  پیشنهاد ما
                </div>
              )}
            </div>
            <div className={style.info}>
              <div className={style.titles}>
                <div className={style.gameTitle}>{props.data.name}</div>
                <div className={style.clubTitle}>
                  <Link href={`/clubs/${props.data.club.id}`}>
                    <a>مجموعه {props.data.club.name}</a>
                  </Link>
                </div>
              </div>
              {/* <MenuBookIcon style={{ fontSize: 20 }} /> */}
              <div className={style.label}>
                <span>
                  ژانر:{" "}
                  {props.data.Genres.map(
                    (genre, i, genres) =>
                      genre.name + (i != genres.length - 1 ? "، " : "")
                  )}
                </span>
              </div>
              <div className={style.label}>
                {/* <AccessibilityNewIcon style={{ fontSize: 20 }} /> */}
                <span>
                  ظرفیت: {props.data.escapeRoomMinPlayer} تا{" "}
                  {props.data.escapeRoomMaxPlayer} نفر
                </span>
              </div>
              <div className={style.label}>
                <AccessTimeIcon style={{ fontSize: 20 }} />
                <span>مدت: {props.data.duration} دقیقه</span>
              </div>
            </div>
          </div>
          {/* <div className={style.sec2}>Gallery</div> */}
        </div>
        <div className={style.gallery}>
          <Gallery data={props.data.assets} isMobile={props.isMobile} gameName={props.data.name} />
        </div>
        <div className={style.backgroundCover}></div>
        <div
          className={style.background}
          style={{
            backgroundImage: `url(${props.data.headerFilePath || props.data.tileFilePath
              })`,
          }}
        ></div>
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
            label="اطلاعات"
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="نظرات"
          />
        </Tabs>
      </Paper>
      <TabPanel visibleIndex={tabVisibleIndex} index={0}>
        <PreviewCard
          locHashName="scenario"
          // icon={<MenuBookIcon />}
          title={`سناریوی اتاق فرار ${props.data.name}`}
          preview={
            storyView.split("\n").map((story) => {
              return (
                <div>
                  {story}
                  <br />
                </div>
              )
            })
          }
        >
          {props.data.escape_room_story.split("\n").map((story) => {
            return (
              <div>
                {story}
                <br />
              </div>
            )
          })}
        </PreviewCard>
        <Reservation
          authentication={props.authentication}
          setLoginFormOpenState={(state) => {
            props.setLoginFormOpenState(state);
          }}
          gameId={props.data.id}
          gameTitle={props.data.name}
          isMobile={props.isMobile}
          playersNumber={{
            min: props.data.escapeRoomMinPlayer,
            max: props.data.escapeRoomMaxPlayer,
          }}
        />
        <Card icon={<OndemandVideoIcon />} title="تیزر">
          {teasers && <Teaser data={teasers.map((teaser) => teaser.fileLink)} />}
        </Card>
        <PreviewCard
          icon={<AssignmentOutlinedIcon />}
          locHashName="rules"
          title="قوانین بازی"
          preview={eval(JSON.parse(props.data.escape_room_conditions))
            .filter((condition, i) => i < 2)
            .map((condition) => {
              return (
                <div className={style.condition}>
                  <GavelRounded />
                  <div>{condition.text}</div>
                </div>
              );
            })}
        >
          {eval(JSON.parse(props.data.escape_room_conditions)).map(
            (condition) => {
              return (
                <div className={style.condition}>
                  <GavelRounded />
                  <div>{condition.text}</div>
                </div>
              );
            }
          )}
        </PreviewCard>
        <PreviewCard
          icon={<ContactSupportIcon />}
          locHashName="questions"
          title="سوالات متداول"
          preview={eval(JSON.parse(props.data.escapeRoomQuestions))
            .filter((condition, i) => i < 2)
            .map((condition) => {
              return (
                <div className={style.condition}>
                  <HelpOutlineIcon />
                  <div>
                    <b>
                      {condition.text.split("؟")[0]} ؟
                    </b>
                    <br />
                    {condition.text.split("؟")[1]}
                  </div>
                </div>
              );
            })}
        >
          {eval(JSON.parse(props.data.escapeRoomQuestions)).map((condition) => {
            return (
              <div className={style.condition}>
                <HelpOutlineIcon />
                <div>
                  <b>
                    {condition.text.split("؟")[0]} ؟
                  </b>
                  <br />
                  {condition.text.split("؟")[1]}
                </div>
              </div>
            );
          })}
        </PreviewCard>

        <PreviewCard
          locHashName="description"
          icon={<DescriptionOutlinedIcon />}
          title={`توضیحات`}
          preview={
            <div>
              {description}
              <br />
            </div>
          }

        >
          {
            <div>
              {description}
              <br />
            </div>
          }
        </PreviewCard>

        <Card icon={<LocationOnOutlinedIcon />} title="آدرس و اطلاعات تماس">
          {/* <iframe
            className={style.map}
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d25901.65958169724!2d51.286733015158816!3d35.75799474840876!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1629469935312!5m2!1sen!2s"
          ></iframe> */}
          <div className={style.mapir}>
            <DynamicComponentWithNoSSR
              lat={props.data.lat}
              lng={props.data.lng}
            />
          </div>
          <div className={style.linkButtons} style={{ marginTop: "5px" }}>
            <a href={dirLink} target="_blank" style={{ width: "100%" }}>
              <DirectionsIcon className={style.icon} />
              مسیریابی
            </a>

          </div>
          <div className={style.address1}>
            {props.data.city.name}
            {props.data.district && props.data.district.name != ""
              ? "، منطقه " + props.data.district.name
              : ""}
          </div>
          <div className={style.address2}>{props.data.address}</div>
          <div className={style.phoneNumber} style={{ marginBottom: "9px" }}>
            تلفن:{" "}
            <a href={`tel:${props.data.phoneNum}`}>
              {props.data.phoneNum || "-"}
            </a>
          </div>
          <div className={style.linkButtons} style={{ marginTop: "5px" }}>
            <a href={props.data.linkToGameSite} target="_blank" style={isLinkToSite() ? {} : { display: "none" }}>
              <LinkIcon className={style.icon} />
              وبسایت بازی
            </a>
            <a href={props.data.linkToInstagram} target="_blank" style={isLinkToInstagram() ? {} : { display: "none" }}>
              <InstagramIcon className={style.icon} />
              اینستاگرام
            </a>
            <a href={props.data.linkToWhatsApp} target="_blank" style={isLinkToWhatsApp() ? {} : { display: "none" }}>
              <WhatsAppIcon className={style.icon} />
              واتس‌اپ
            </a>
          </div>
        </Card>
      </TabPanel>
      <TabPanel visibleIndex={tabVisibleIndex} index={1}>
        <div className={style.commentsHeader}>
          <div className={style.totalComments}>{totalComments}</div>
          <Button onClick={openAddCommentDialog} variant="outlined">
            + افزودن نظر
          </Button>
        </div>
        <Card>
          <Comments gameId={props.data.id} offset={offset} loaded={handleCommentsLoaded} />
          <Grid container justify="center" lg={12} xs={12} md={12}>
            <Button color="primary" style={{ 'text-align': 'center' }} disabled={(offset - limit) < 0} onClick={() => setOffset(offset - limit)} variant="outlined">صفحه قبل</Button>
            <Grid lg={1} md={1} xs={1}></Grid>
            <Button color="primary" style={{ 'text-align': 'center' }} disabled={(totalCommentsNum == 0 || offset >= totalCommentsNum)} onClick={() => setOffset(offset + limit)} variant="outlined">صفحه بعد</Button>
          </Grid>
        </Card>
      </TabPanel>
      <Dialog
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
            handleLoginWithQR={openAddCommentDialog}
            authentication={props.authentication}
            onLoginClose={onLoginClose}
          />
        </DialogContent>
      </Dialog>

      <ThemeProvider theme={theme}>
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
              alt={props.data.name}
              style={{
                display: "block",
                ...fullSizePosterDimentions,
              }}
            />
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default Main;
