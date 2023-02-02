import { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Link from "next/link";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// icons
import MenuIcon from "@material-ui/icons/Menu";

import style from "../../styles/admin/Index.module.css";

const No = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px", direction: "ltr" }}>
      you should not be here
    </div>
  );
};

const AuthenticatedChildren = (props) => {
  // userTpe = 1 or 2
  //
  let R = props.children;
  if (props.authentication && props.authentication.cookies.userType == 2) {
    if (props.childrenName == "users" || props.childrenName == "clubs") {
      R = <No />;
    }
  }
  return R;
};

const isUser2_isUsers_isClubs = (props) => {
  let R = false;
  if (props.authentication && props.authentication.cookies.userType == 2) {
    if (props.childrenName == "users" || props.childrenName == "clubs") {
      R = true;
    }
  }
  return R;
};

const Main = (props) => {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  const handleDrawerClose = () => {
    setDrawerOpenState(false);
  };
  const handleMenuIconClick = () => {
    setDrawerOpenState(true);
  };

  const MainContent = (props) => {
    return (
      <div className={style.main}>
        <div className={style.topBar}>
          <MenuIcon onClick={handleMenuIconClick} />
        </div>
        <div className={style.content}>
          {isUser2_isUsers_isClubs(props) ? <No /> : props.children}
        </div>
      </div>
    );
  };

  const AuthenticatedContent = (props) => {
    let R = <div></div>;
    if (props.authentication.state) {
      if (props.authentication.cookies.userType == 3) {
        R = <No />;
      } else {
        R = MainContent(props);
      }
    } else {
      R = <No />;
    }
    return R;
  };

  return (
    <>
      {AuthenticatedContent(props)}
      <Drawer anchor="left" open={drawerOpenState} onClose={handleDrawerClose}>
        <ul className={style.menu}>
          {props.authentication && props.authentication.cookies.userType == 1 && (
            <>
              <li>
                <Link href="/admin/users">
                  <a>کاربران</a>
                </Link>
              </li>
              <li>
                <Link href="/admin/clubs">
                  <a>مجموعه‌ها</a>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href="/admin/comments">
              <a>نظرات</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/games">
              <a>بازی‌ها</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/financial">
              <a>امور مالی</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a style={{ display: "flex" }}>
                <ArrowForwardIcon />
                <span style={{ padding: "0 5px 0 0" }}>صفحه اصلی</span>
              </a>
            </Link>
          </li>
        </ul>
      </Drawer>
    </>
  );
  // return <MainContent />;
};
export default Main;
