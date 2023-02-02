import moment from "jalali-moment";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import style from "../styles/Comment.module.css";
import api from "../api";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";
import { Alert } from "@material-ui/lab"

// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

// icons
import ReplyIcon from "@material-ui/icons/Reply";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const QRIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-8 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1z" />
    </svg>
  );
};

const fetchCommentVerification = async (url, commentId, status) => {
  let result;
  const successMessage =
    status == "accept" ? "کامنت تایید شد" : "عدم تایید کامنت انجام شد";
  const postData = {
    commentId,
    status,
  };
  let response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
  });
  if (response.ok) {
    result = await response.json();
    //alert(successMessage);

  } else {
    alert("HTTP-Error: " + response.status);
  }
  // setState(result.games);
};
const fetchSubmitComment = async (url, postData, setReplyToShow) => {
  let result;
  let response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
  });
  if (response.ok) {
    result = await response.json();
  } else alert("HTTP-Error: " + response.status);

  setReplyToShow([
    {
      id: result.comment.id,
      text: result.comment.text,
    },
  ]);
};
const Replys = (props) => {
  if (props.data && props.data.length) {
    return (
      <div className={style.replys}>
        {props.data.map((reply) => (
          <div className={style.reply}>
            <b>{reply.user.fullName}</b> <ReplyIcon />
            <div className={style.replyBody}>{reply.text}</div>
          </div>
        ))}
      </div>
    );
  }
  return "";
};
const Main = (props) => {
  console.log("render - Comments");
  const handleVerificationClick = (state) => {
    if (state == "accept") {
      setState("accept");
      setConfirmMessage("کامنت تایید شد");
    }
    if (state == "reject") {
      setState("reject");
      setConfirmMessage("کامنت رد شد");
    }
    let result = fetchCommentVerification(
      api.adminCommentVerification,
      props.data.id,
      state
    );
    setShowMessage(true);
  };

  const [state, setState] = useState(props.data.state);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // admin reply dialog
  const [adminReplyDialogOpenState, setAdminReplyDialogOpenState] =
    useState(false);
  const openAdminReplyDialog = () => {
    setAdminReplyDialogOpenState(true);
  };
  const handleAdminReplyDialogClose = () => {
    setAdminReplyDialogOpenState(false);
  };
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  // admin reply text change
  const [adminReplyText, setAdminReplyText] = useState("");
  const handleAdminReplyTextChange = (e) => {
    setAdminReplyText(e.target.value);
  };
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  // show reply
  const [replyToShow, setReplyToShow] = useState(props.data.reply);
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------
  // admin reply
  const handleReplyClick = () => {
    openAdminReplyDialog();
  };
  const handleAdminReplySubmit = () => {
    handleAdminReplyDialogClose();
    const postData = {
      gameId: props.data.game_id,
      replyId: props.data.id,
      text: adminReplyText,
    };
    fetchSubmitComment(api.addComment, postData, setReplyToShow);
  };

  return (
    <div
      className={`${style.main} ${props.admin && style.admin} ${props.admin && props.data.state && style.reacted
        }`}
    >
      <div className={`${style.sec} ${style.sec1}`}>
        <div className={style.user}>
          <div className={style.avatar}>
            <Avatar>
              {props.data.user && props.data.user.fullName.split("")[0]}
            </Avatar>
          </div>
          <div className={style.info}>
            <span className={style.name}>
              <Link href={`/user/${props.data.user.id}`}>
                <a className={`${style.game} ${props.isMobile && style.mobile}`} >
                  {props.data.user && props.data.user.fullName}
                </a>
              </Link>
            </span>
            {props.data.user &&
              props.data.user.reservations &&
              props.data.user.reservations.length ? (
              <span className={`${style.experience} ggtxtcolor1`}>
                تجربه بازی در{" "}
                {moment(
                  props.data.user &&
                  props.data.user.reservations[
                    props.data.user.reservations.length - 1
                  ].startDateTime
                ).format("jYYYY/jMM/jDD")}
                <br />
                از طریق گیم‌گردی
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={style.details}>
          {props.admin && (
            <div className={style.gameInfo}>بازی {props.data.game.name}</div>
          )}
          <div className={style.rating}>
            <span className={style.ratingScore}>
              {props.data.escaperoomAverageCommentScore}
            </span>
            <Rating
              value={props.data.escaperoomAverageCommentScore}
              defaultValue={0}
              precision={0.1}
              size="small"
            />
          </div>
          {props.data.isQRCodeRedirected && (
            <div className={style.certificates}>
              <QRIcon className={`${style.icon} ${style.qrIcon}`} />
            </div>
          )}
        </div>
      </div>
      {props.data.escaperoomStrengths &&
        JSON.parse(props.data.escaperoomStrengths).length && (
          <div className={style.sec_points}>
            <InsertEmoticonIcon className={style.iconMain} />
            <label>نقاط قوت</label>
            {JSON.parse(props.data.escaperoomStrengths).map((point) => (
              <div className={style.point}>
                <AddIcon className={style.icon} />
                {point}
              </div>
            ))}
          </div>
        )}
      {props.data.escaperoomBadPoints &&
        JSON.parse(props.data.escaperoomBadPoints).length && (
          <div className={style.sec_points}>
            <label>نقاط ضعف</label>
            <SentimentVeryDissatisfiedIcon className={style.iconMain} />
            {JSON.parse(props.data.escaperoomBadPoints).map((point) => (
              <div className={`${style.point} ${style.badPoint}`}>
                <RemoveIcon className={style.icon} />
                {point}
              </div>
            ))}
          </div>
        )}
      <label style={{ color: "#888", "font-size": "12px", "padding-right": "5px" }}>متن نظر</label>
      <div className={`${style.sec} ${style.sec2} ${style.commentBody}`}>
        {props.data.text}
      </div>
      <div className={`${style.sec} ${style.sec3} ${style.date}`}>
        {/* <label>تاریخ: </label> */}
        {moment(props.data.updatedAt).format("jYYYY/jMM/jDD")}
      </div>
      <Replys data={replyToShow} />
      {
        props.admin && (
          <div className={style.adminActions}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ReplyIcon />}
              onClick={() => {
                handleReplyClick();
              }}
              variant="outlined"
            >
              پاسخ
            </Button>

            {props.authentication && props.authentication.cookies.userType == 1 && (
            <>
            <Button disabled={(state == "accept")}
              variant="contained"
              size="small"
              startIcon={<DoneOutlineIcon />}
              style={{ "background-color": "green" }}
              onClick={() => {
                handleVerificationClick("accept");
              }}
            >
              تایید
            </Button>

            <Button disabled={(state == "reject")}
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<CloseIcon />}
              onClick={() => {
                handleVerificationClick("reject");
              }}

            >
              رد
            </Button>
            </>
            )}
            


          </div>
        )
      }
      <Dialog
        open={adminReplyDialogOpenState}
        onClose={handleAdminReplyDialogClose}
        fullWidth={true}
      >
        <DialogTitle id="simple-dialog-title">پاسخ</DialogTitle>
        <DialogContent>
          <TextField
            value={adminReplyText}
            onChange={(e) => {
              handleAdminReplyTextChange(e);
            }}
            multiline
            rows={8}
            className={style.inputText}
            id="outlined-basic"
            label="متن پاسخ"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdminReplyDialogClose} variant="outlined">
            بستن
          </Button>
          <Button
            onClick={handleAdminReplySubmit}
            variant="contained"
            color="primary"
          >
            ثبت پاسخ
          </Button>
        </DialogActions>
      </Dialog>
      {(showMessage) ? <Alert severity="info" style={{ display: "flex", justifyContent: "center" }}>{confirmMessage}</Alert> : ""}
    </div >
  );
};
export default Main;
