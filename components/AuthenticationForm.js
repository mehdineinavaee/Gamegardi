import { useState, useRef } from "react";
import api from "../api";
// dialog
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import style from "../styles/Login.module.css";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Main = (props, { isMobile }) => {
  const handleModalClose = () => {
    props.close();
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  //---------------------------------------------------------------------------------
  // form type
  function formChangeToRegistration(phoNum) {
    handleFormSwitchClick("registration");
    setPhoneNumber(phoNum)
    console.log(phoNum);
  }
  const [formType, setFormType] = useState("login");
  const handleFormSwitchClick = (formType) => {
    setFormType(formType);
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={props.openState}
      onClose={handleModalClose}
    >
      {formType == "registration" ? (
        <>
          <RegistrationForm close={handleModalClose} phone={phoneNumber} />
          <DialogActions>
            <div
              className={style.formSwitch}
              onClick={() => {
                handleFormSwitchClick("login");
              }}
            >
              ورود اعضا
            </div>
          </DialogActions>
        </>
      ) : (
        <>
          <LoginForm
            setAuthentication={props.setAuthentication}
            formChange={formChangeToRegistration}
            close={handleModalClose}
          />
          <DialogActions>
           
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
export default Main;
