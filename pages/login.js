import { useRef } from "react";
import api from '../api'
// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import style from "../styles/Login.module.css";

const theme = createMuiTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  typography: {
    fontFamily: `"escapeRoom", "shabnam", "Tahoma",`,
  },
});

export default function Main({ isMobile }) {
  const $phoneNumber = useRef(null);
  const $verificationCode = useRef(null);
  const login = async () => {
    let result;
    const postData = {
      phoneNum: $phoneNumber.current.querySelector("input").value,
      code: Number($verificationCode.current.querySelector("input").value),
    };
    let response = await fetch(api.smsLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      result = await response.json();
      alert(
        "Successfuly Logged In"
      );
      console.log(result);
    } else {
      alert('Error - View details in the browser devtool console.');
      console.log("Gamegardi Login HTTP-Error: " + response.status);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Dialog aria-labelledby="simple-dialog-title" open={true}>
        <DialogTitle id="simple-dialog-title">ورود</DialogTitle>
        <DialogContent className={style.main}>
          <TextField
            ref={$phoneNumber}
            className={style.input}
            id="outlined-basic"
            label="شماره تلفن"
            variant="outlined"
          />
          <TextField
            ref={$verificationCode}
            className={style.input}
            id="outlined-basic"
            label="کد تایید"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={login}>
            ورود
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
