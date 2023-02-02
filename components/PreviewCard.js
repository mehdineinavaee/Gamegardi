import style from "../styles/Card.module.css";

// dialog
import { useState, forwardRef, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
  dialogPaper: {
    background: "#eeeeee",
  },
});

const Main = ({ icon, title, preview, children, isMobile, locHashName }) => {
  console.log("render - Preview Card");
  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  // classes
  const classes = useStyles();

  useEffect(() => {
    const onHashChange = () => setDialogOpenState(window.location.hash === "#" + locHashName);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------
  // dialog
  const [dialogOpenState, setDialogOpenState] = useState(window.location.hash === "#" + locHashName);
  const handleReadmoreClick = () => {
    setDialogOpenState(true);
    window.location.hash = "#" + locHashName
  };

  const handleCloseDialogClick = () => {
    setDialogOpenState(false);
    window.history.back();
  };
  const handleDialogClose = () => {
    window.history.back();
  }
  return (
    <div className={style.main}>
      <div className={style.header}>
        {icon}
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.preview}>{preview}</div>
      <div className={style.footer}>
        <div className={style.readMore} onClick={handleReadmoreClick}>
          نمایش بیشتر
        </div>
      </div>
      <Dialog
        fullScreen
        open={dialogOpenState}
        onClose={handleDialogClose}
        TransitionComponent={Transition}
        classes={{ paper: classes.dialogPaper }}
      >
        <div className={style.moreContent}>
          <div className={style.header}>
            <div className={style.title}>
              {/* {icon} */}
              <div className={style.title}>{title}</div>
            </div>
            <CloseIcon onClick={handleCloseDialogClick} />
          </div>
          <div className={style.body}>{children}</div>
        </div>
      </Dialog>
    </div>
  );
};
export default Main;
