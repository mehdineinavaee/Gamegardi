import { useState, useRef } from "react";
import { forwardRef } from "react";
import styles from "../../styles/Scheduler.module.css";
import uniqid from "uniqid";
import api from "../../api";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";

import TextField from "@material-ui/core/TextField";
import TimeInput from "../TimeInput";

const totalMinutes = (timeString = "00:00", day = 0) => {
  // day = 0 (Saturday), 1, 2, 3, 4, 5, 6
  // [converts 'hh:mm' format string to total week minuts.]
  return (
    eval(
      timeString
        .split(":")
        .map((item, i) => {
          let R = Number(item);
          if (i == 0) {
            R = R * 60 + "+";
          }
          return R;
        })
        .join("")
    ) +
    day * 24 * 60
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const weekDayLabel = (weekDayIndex) => {
  return ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"][
    weekDayIndex
  ];
};

const Main = (props) => {
  console.log("~> Render - Day");
  //
  const showings = useRef([]);
  const showingToBeDeletedId = useRef(undefined);
  //
  // const { data, error } = useSWR("/api/parks", fetcher);
  //
  const [timeDialogOpenState, setTimeDialogOpenState] = useState(false);
  const handleClickTimeDialogOpen = () => {
    setTimeDialogOpenState(true);
  };
  const handleClickTimeDialogClose = () => {
    setTimeDialogOpenState(false);
  };
  // submit add showing, submit add item
  const submitAddShowing = async () => {
    const day = props.data.day;
    const start = totalMinutes(startTime, day);
    let end = totalMinutes(endTime, day);

    // we do not correct extended showings end.
    // we correct! :
    if (startTime >= endTime) end = totalMinutes(endTime, day + 1);

    /* const showing = {
      id: uniqid(),
      day,
      start,
      end,
      startText: startTime,
      endText: endTime,
    }; */

    const apiShowing = {
      start,
      end,
      price,
      gameId: props.data.gameId,
    };

    // post data:
    let response = await fetch(api.adminAddShowing, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(apiShowing),
    });
    if (response.ok) {
      let result = await response.json();
      props.load();

      // close dialog:
      setTimeDialogOpenState(false);
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };
  //
  // Deletion
  const [deleteShowingDialogOpenState, setDeleteShowingDialogOpenState] =
    useState(false);
  const handleShowingClick = (e, props) => {
    e.preventDefault();
    if (props.editable) {
      showingToBeDeletedId.current = e.currentTarget.dataset.id;
      setDeleteShowingDialogOpenState(true);
    } else {
      // request reserve
      alert("رزرو شد");
    }
  };
  const closeDeleteShowingDialog = () => {
    setDeleteShowingDialogOpenState(false);
  };
  // submit delete showing
  const submitDeleteShowing = async () => {
    const id = showingToBeDeletedId.current;

    if (id) {
      // props.data.submitDeleteShowing(id);
      // post data:
      const postData = {
        weeklyScheduleId: Number(id),
        gameId: props.data.gameId,
      };
      let response = await fetch(api.adminDeleteShowing, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let result = await response.json();
        //
        // props.data.submitAddShowing(showing);
        // reload instead of updating the state:
        props.load();

        // close dialog:
        setDeleteShowingDialogOpenState(false);
      } else {
        alert("HTTP-Error: " + response.status);
      }
    }
  };

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // start
  const [startTime, setStartTime] = useState("00:00");
  const handleChangeStartTime = (e) => {
    /* const timeString = e.target.value;
    setStartTime(timeString); */
    console.log("starttime: ", e);
    setStartTime(e);
  };
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // end
  const [endTime, setEndTime] = useState("00:00");
  const handleChangeEndTime = (e) => {
    /* const timeString = e.target.value;
    setEndTime(timeString); */
    setEndTime(e);
  };
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // price
  const [price, setPrice] = useState(750000);
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div className={styles.day}>
      <div className={styles.dayTitle}>{weekDayLabel(props.data.day)}</div>
      {props.data.blocks.map((block, i) => {
        let $el;
        switch (block.type) {
          case "gap":
            $el = (
              <div
                key={i}
                className={`${styles.dayBlock} ${styles.gap}`}
                onClick={handleClickTimeDialogOpen}
              >     
                <div className={styles.time}>           
                  <span className={styles.time}>{block.startText}</span>
                  <span>-</span>
                  <span className={styles.time}>{block.endText}</span>
                </div>
                <span className={styles.icon}>+</span>
              </div>
            );
            break;
          case "showing":
          case "showing/extendedStart":
            $el = (
              <div
                key={i}
                className={`${styles.dayBlock} ${styles.showing}`}
                data-id={block.id}
                onClick={(e) => {
                  handleShowingClick(e, props);
                }}
              >
                <div className={styles.time}>
                  <span className={styles.time}>{block.startText}</span>
                  <span>-</span>
                  <span className={styles.time}>{block.endText}</span>
                </div>
                <span className={styles.price}>{block.price}</span>
              </div>
            );
            break;
          case "showing/extendedEnd":
            $el = (
              <div
                key={i}
                className={`${styles.dayBlock} ${styles.showingExtendedEnd}`}
                data-id={block.id}
                onClick={(e) => {
                  handleShowingClick(e, props);
                }}
              >
                <div className={styles.time}>{block.startText}</div>
                <div className={styles.time}>{block.endText}</div>
              </div>
            );
            break;
        }
        return $el;
      })}
      <Dialog
        open={timeDialogOpenState}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickTimeDialogClose}
        fullWidth={true}
      >
        <DialogTitle></DialogTitle>
        <DialogContent style={{ padding: "0 50px" }}>
          {/* <TextField
            id="timeEnd"
            label="Start"
            type="time"
            defaultValue={startTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleChangeStartTime}
          />
          <TextField
            id="timeStart"
            label="End"
            type="time"
            defaultValue={endTime}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleChangeEndTime}
          /> */}
          <div className={styles.timeInput}>
            <TimeInput label="ساعت شروع" onChange={handleChangeStartTime} />
          </div>
          <div className={styles.timeInput} style={{marginBottom: '35px'}}>
            <TimeInput label="ساعت پایان" onChange={handleChangeEndTime} />
          </div>
          <TextField
            value={price}
            onChange={(e) => {
              handlePriceChange(e, "defaultCost");
            }}
            type="number"
            className={styles.input}
            label="قیمت (ریال)"
            variant="outlined"
            fullWidth
            style={{marginBottom: '20px', textAlign:'left', direction: 'ltr'}}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClickTimeDialogClose}>x</Button> */}
          <Button
            onClick={submitAddShowing}
            variant="contained"
            color="primary"
          >
            ثبت
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteShowingDialogOpenState}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDeleteShowingDialog}
      >
        <DialogTitle>{"حذف سانس"}</DialogTitle>
        <DialogContent>
          <DialogContentText>سانس حذف شود؟!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteShowingDialog} color="primary">
            Disagree
          </Button>
          <Button onClick={submitDeleteShowing} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default Main;
