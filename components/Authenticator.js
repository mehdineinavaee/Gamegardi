import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import style from "../styles/Authenticator.module.css";
import AuthenticationForm from "./AuthenticationForm";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import api from "../api";

// menu
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const fetchLogout = async (url) => {
  let result;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(postData),
  });
  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    result = await response.json();
    // props.login(result.data)
    alert("خارج شدید");
  } else {
    alert("مشکلی پیش آمده");
    // console.log("Gamegardi Login HTTP-Error: " + response.status);
  }
};

const Main = (props) => {
  console.log("render - Authenticator");

  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  // successful login
  const handleLogin = () => {
    closeLoginForm();
    props.setAuthentication();

  };
  useEffect(async () => {
    if (typeof props.authentication.cookies.userType != 'undefined')
      if (props.authentication.cookies.userType != 3)
        setAdmin(true);

  });
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  // menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isAdmin, setAdmin] = useState(false);

  const handleClick = async (e) => {
    if (props.authentication.state) {
      // open menu:
      setMenuAnchorEl(e.currentTarget);
    } else {
      props.setLoginFormOpenState(true);
    }
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  // logout
  const handleLogout = async () => {
    await fetchLogout(api.userLogout);
    props.setAuthentication();
    setMenuAnchorEl(null);
  };

  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------
  // admin menu
  const router = useRouter()
  const handleMenuLink = (link) => {
    router.push(link);
  };

  return (
    <>
      <div className={style.main} onClick={handleClick}>
        {props.authentication.state
          ? props.authentication.username
          : "ورود اعضا"}
        <AccountCircleIcon style={{ fontSize: 30, marginRight: 4 }} />
      </div>
      <AuthenticationForm
        login={handleLogin}
        openState={props.loginFormOpenState}
        close={() => {
          props.setLoginFormOpenState(false);
        }}
        setAuthentication={props.setAuthentication}
      />
      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            let link = "";
            if (isAdmin)
              link = "/admin/games";
            else
              link = `/user/${props.authentication.cookies.id}`
            handleMenuLink(link);
          }}
          style={{ width: "120px" }}
        >

          {isAdmin? `مدیریت` : `پروفایل`}
        </MenuItem>
        <MenuItem onClick={handleLogout} style={{ width: "120px" }}>
          خروج
        </MenuItem>
      </Menu>
    </>
  );
};
export default Main;
