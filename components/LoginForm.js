import { useState, useRef, useEffect } from "react";
import api from "../api";
// dialog
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import style from "../styles/Login.module.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Grid, Hidden } from "@material-ui/core";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import router from "next/router";


const fetcher = async (url, postData) => {
  let result;
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
  });
  if (response.ok) {
    result = await response.json();
  } else {
    alert("اطلاعات وارد شده صحیح نیست");
  }
  return result;
};
const getFetcher = async (url) => {
  let result;
  let response = await fetch(url, {
    method: "GET",
    // headers: new Headers(),
    // redirect: 'follow'
  });
  if (response.ok) {
    result = response.text();
  } else {
    alert("اطلاعات وارد شده صحیح نیست");
  }
  return result;
};
const Main = (props) => {



  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  // form type
  const [formType, setFormType] = useState("userInfo");

  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  // send info
  // const $phoneNumber = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [captchaText, setCaptcha] = useState("");
  const [captchaImage, setCaptchaImage] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const handleSmsCodeChange = (e) => {
    setSmsCode(e.target.value);
  }
  const handlePhoneNumberChange = (e) => {
    // setPhoneNumber(e.querySelector("input").value);
    setPhoneNumber(e.target.value);
  };
  const handleCaptchaText = (e) => {
    // setPhoneNumber(e.querySelector("input").value);
    setCaptcha(e.target.value);
  };
  //
  const handleSendInfo = async () => {
    const res = await fetcher(api.sendSms, {
      // phoneNum: $phoneNumber.current.querySelector("input").value,
      phoneNum: phoneNumber,
      captchaText: captchaText,
      isSms: true
    });
    if (res.notRegister) {
      props.formChange(phoneNumber);
      return;
    }
    if (res) setFormType("codeConfirmation");
  };
  var resC;
  const handleGetCaptchaImage = async () => {
    resC = await getFetcher(api.getCaptcha);
    setCaptchaImage(resC);
    let cpt = document.querySelector("#captcha-box");
    cpt.innerHTML = resC;
  }

  useEffect(async () => {
    if (captchaImage == "") {
      resC = await getFetcher(api.getCaptcha);
      setCaptchaImage(resC);
      let cpt = document.querySelector("#captcha-box");
      cpt.innerHTML = resC;
    }
  });

  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  // code confirmation
  const $code = useRef(null);
  //
  const handleCodeConfirmation = async () => {
    const res = await fetcher(api.smsLogin, {
      // phoneNum: $phoneNumber.current.querySelector("input").value,
      // code: $code.current.querySelector("input").value,
      phoneNum: phoneNumber,
      code: smsCode
    });
    if (res) {
      props.setAuthentication();
      props.close();
      router.reload();
    }
    // else
  };

  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  // handle back
  const handleBackClick = () => {
    setFormType("userInfo");
  };

  return (
    <>
      <div className={style.formHeader}>
        {formType == "userInfo" ? (
          <div className={style.title}>ورود | ثبت‌نام</div>
        ) : (
          <>
            <IconButton
              className={style.backButton}
              onClick={handleBackClick}
              aria-label="صفحه قبل"
            >
              <ArrowBackIcon />
            </IconButton>
          </>
        )}
      </div>
      <DialogContent className={style.main}>
        {formType == "userInfo" ? (
          <>
            <TextField
              // ref={$phoneNumber}
              type="tel"
              className={style.input}
              id="outlined-basic"
              label="شماره تلفن"
              variant="outlined"
              onChange={handlePhoneNumberChange}
            />
            <TextField
              // ref={$phoneNumber}
              type='number'
              className={style.input}
              id="outlined-basic1"
              label="حروف امنیتی"
              variant="outlined"
              onChange={handleCaptchaText}
            />
            <Grid container className={style.input}>
              <Grid container lg={8} md={8} xs={8} id="captcha-box"></Grid>
              <Grid container lg={1} md={1} xs={1}>
                <Button
                  onClick={handleGetCaptchaImage}
                  variant="outlined"
                >
                  <RefreshRoundedIcon></RefreshRoundedIcon>
                </Button>
              </Grid>


            </Grid>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSendInfo}
            >
              ارسال
            </Button>
          </>
        ) : (
          <>
            <div className={style.description}>کد دریافتی را وارد کنید</div>
            <TextField
              //ref={$code}
              type="number"
              value={smsCode}
              className={style.input}
              id="outlined-basic"
              label="کد تایید"
              variant="outlined"
              onChange={handleSmsCodeChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCodeConfirmation}
            >
              ارسال
            </Button>
          </>
        )}
      </DialogContent>
    </>
  );
};
export default Main;
