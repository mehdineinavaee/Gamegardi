import style from "../styles/ReservationShowing.module.css";
import { useState } from "react";
import api from "../api";

// dialog
import { forwardRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  button: {
    // padding: "10px 50px",
    // background: "pink",
    width: "100%",
  },
  buttonLabel: {
    fontSize: "14px",
    color: "white",
  },
  dialogContent: {
    padding: "20px",
    backgroundColor: "#eee",
  },
});

// icons
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { digitsComma } from "../assets/tools";

const fetchAdminForm = async (url, postData) => {
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

  return result;
};

const Main = (props) => {
  console.log("render - ReservationShowing");
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // styling
  const classes = useStyles();

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // isReserved state
  const [isReserved, setIsReserved] = useState(props.data.isReserved);

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog state
  const [dialogOpenState, setDialogOpenState] = useState(0);
  const [adminDialogOpenState, setAdminDialogOpenState] = useState(false);
  const handleClick = (e) => {
    // admin mode:
    if (props.isAdmin) {
      setAdminDialogOpenState(true);
    }
    // client mode:
    else {
      if (!isReserved) {
        if (props.authentication.state) setDialogOpenState(true);
        else props.setLoginFormOpenState(true);
      }
    }
  };
  const handleDialogClose = () => {
    setDialogOpenState(false);
  };
  const handleAdminDialogClose = () => {
    setAdminDialogOpenState(false);
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // dialog state
  const handleSubmitReservation = async (e) => {
    const id = props.data.id;
    const type = props.data.type;
    const numOfPersons = counterData.number;
    const postData = {
      id,
      type,
      numOfPersons,
    };
    if (type == "weeklySchedule") {
      postData.startDateTime = new Date(props.data.start).getTime();
      postData.endDateTime = new Date(props.data.end).getTime();
    }

    let response = await fetch(api.reserveShowing, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      // if HTTP-status is 200-299
      handleDialogClose();
      setIsReserved(true);

      // get the response body (the method explained below)
      let result = await response.json();
      alert("بازی با موفقیت رزرو شد!");
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // counter
  const [counterData, setCounterData] = useState({
    number: props.data.playersNumber.min,
    price: Number(props.data.price * props.data.playersNumber.min),
  });
  const handleCounterClick = (n) => {
    const min = props.data.playersNumber.min;
    const max = props.data.playersNumber.max;
    let number = counterData.number + n;
    if (number < min) number = min;
    if (number > max) number = max;
    const price = number * Number(props.data.price);
    setCounterData({
      number,
      price,
    });
  };
  const [agreed, setAgreed] = useState(false);
  const handleAgreedChange = (e) => {
    setAgreed(e.target.checked);
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // admin form
  const [adminFormData, setAdminFormData] = useState({
    id: props.data.id,
    type: props.data.type,
    endDateTime: new Date(props.data.end).getTime(),
    startDateTime: new Date(props.data.start).getTime(),
    isReserved: props.data.isReserved,
    isReservable:
      props.data.isReservable === undefined ? true : props.data.isReservable,
    price: props.data.price,
  });
  const handleAdminInputChange = (e, key) => {
    const data = {};
    data[key] = e.target.value;
    setAdminFormData({ ...adminFormData, ...data });
  };
  const handleAdminCheckboxChange = (e, key) => {
    const data = {};
    data[key] = e.target.checked;
    setAdminFormData({ ...adminFormData, ...data });
  };
  const handleAdminFormSubmit = async () => {
    const postData = {
      ...adminFormData,
      price: Number(adminFormData.price),
    };
    const id = await fetchAdminForm(api.adminUpdateShowing, postData).id;
    const type = "schedule";

    setAdminFormData({
      ...adminFormData,
      id,
      type,
    });

    handleAdminDialogClose();
  };

  return (
    <>
      <div
        className={`${style.main} ${!props.isMobile && style.desktop} ${
          isReserved ? style.isReserved : ""
        }`}
        onClick={handleClick}
      >
        <div className={style.sec}>
          {/* <label>ساعت</label> */}
          <ConfirmationNumberOutlinedIcon fontSize="16px" />
          <span className={style.value}>{props.data.render.timeStart}</span>
          <label className={style.label}>تا</label>
          <span className={style.value}>{props.data.render.timeEnd}</span>
        </div>
        <div className={`${style.sec} ${style.priceSec}`}>
          <label>هر نفر</label>
          <span className={`${style.value} ${style.price}`}>
            {digitsComma(props.data.price)}
          </span>
          <label>ریال</label>
        </div>
      </div>
      <Dialog
        open={dialogOpenState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogContent classes={{ root: classes.dialogContent }}>
          <div className={style.confirm}>
            <div className={`${style.sec} ${style.title}`}>
              <ConfirmationNumberOutlinedIcon />
              اطلاعات سانس
            </div>
            <div className={style.confirmBody}>
              <div className={`${style.sec} ${style.gameTitle}`}>
                اتاق فرار {props.data.render.gameTitle}
              </div>
              <div className={`${style.sec} ${style.date}`}>
                {props.data.render.weekDay} {props.data.render.monthDay}{" "}
                {props.data.render.month} {props.data.render.year}
              </div>
              <div className={`${style.sec} ${style.time}`}>
                <label>ساعت</label>
                {props.data.render.timeStart}
                <label className={style.left}>تا</label>
                {props.data.render.timeEnd}
              </div>
              <div className={`${style.sec} ${style.price}`}>
                <label>هر نفر</label>
                {digitsComma(props.data.price)}
                <label className={style.left}>ریال</label>
              </div>
            </div>
            <div className={style.counter}>
              <div className={style.counterControls}>
                <IconButton
                  onClick={() => {
                    handleCounterClick(1);
                  }}
                  aria-label="delete"
                >
                  <AddBoxIcon />
                </IconButton>
                <span className={style.counterTotal}>
                  تعداد: <span>{counterData.number}</span>
                </span>
                <IconButton
                  onClick={() => {
                    handleCounterClick(-1);
                  }}
                  aria-label="delete"
                >
                  <IndeterminateCheckBoxIcon />
                </IconButton>
              </div>
              <div className={style.counterPrice}>
                قیمت نهایی:<span>{digitsComma(counterData.price)}</span>ریال
              </div>
              {/* <div className={style.counterPrice}>
                پیش پرداخت:<span className={style.bold}>{props.data.price}</span>ریال
              </div> */}
            </div>
            <div className={style.agreed}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreed}
                    onChange={(e) => {
                      handleAgreedChange(e);
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                // label="قوانین را مطالعه کردم و آنها را می‌پذیرم"
                label={
                  <Typography
                    style={{ fontSize: "12px", color: "#555" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    قوانین را مطالعه کردم و آنها را می‌پذیرم
                  </Typography>
                }
              />
            </div>
            <div className={`${style.sec} ${style.actions}`}>
              <Button
                variant="contained"
                // startIcon={<CreditCardIcon />}
                style={{ backgroundColor: "#21b6ae" }}
                style={{ backgroundColor: "#0718fc" }}
                classes={{
                  root: classes.button,
                  label: classes.buttonLabel,
                }}
                disabled={!agreed}
                onClick={handleSubmitReservation}
              >
                پیش پرداخت
                <span className={style.prepay}>{digitsComma(props.data.price)}</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={adminDialogOpenState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAdminDialogClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        className={style.adminForm}
      >
        <DialogContent>
          <TextField
            value={adminFormData.price}
            onChange={(e) => {
              handleAdminInputChange(e, "price");
            }}
            type="number"
            className={style.input}
            label="قیمت"
            variant="outlined"
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={adminFormData.isReserved}
                onChange={(e) => {
                  handleAdminCheckboxChange(e, "isReserved");
                }}
                name="checkedB"
                color="primary"
              />
            }
            label="رزرو شده"
            className={style.checkbox}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={adminFormData.isReservable}
                onChange={(e) => {
                  handleAdminCheckboxChange(e, "isReservable");
                }}
                name="checkedB"
                color="primary"
              />
            }
            label="قابل رزرو"
            className={style.checkbox}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={props.close}>بستن</Button> */}
          <Button
            onClick={handleAdminFormSubmit}
            variant="contained"
            color="primary"
          >
            افزودن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Main;
