import { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import api from "../../api";
import TextField from "@material-ui/core/TextField";
import { forwardRef } from "react";


import style from "../../styles/admin/GalleryForm.module.css";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  tabsIndicator: {
    backgroundColor: "#ff3543",
  },
  tab: {
    width: "50%",
    "&$selected": {
      color: "black",
    },
  },
  selected: {},
});

// tab
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../TabPanel";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

import LinkIcon from '@material-ui/icons/Link';


const fetchImageSubmit = async (url, data) => {
  let result;

  const formData = new FormData();
  formData.append("asset", data);

  let response = await fetch(url, {
    method: "POST",
    credentials: "include",
    // headers: {
    //   "Content-Type": "application/json;charset=utf-8",
    // },
    // body: JSON.stringify(formData),
    body: formData,
  });
  if (response.ok) {
    result = await response.json();
  } else alert("HTTP-Error: " + response.status);
  return result.game;
};
const fetchLinkSubmit = async (url) => {
  let result;

  // const formData = new FormData();
  // formData.append("asset", 0);

  let response = await fetch(url, {
    method: "POST",
    // credentials: "include",
    // headers: {
    //   "Content-Type": "application/json;charset=utf-8",
    // },
    // body: JSON.stringify(formData),
    // body: formData,
  });
  if (response.ok) {
    result = await response.json();
  } else alert("HTTP-Error: " + response.status);
  return result.game;
};
const fetchDeleteAsset = async (url, postData) => {
  let result;

  let response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
    // body: formData,
  });
  if (response.ok) {
    result = await response.json();
  } else alert("HTTP-Error: " + response.status);
  return result
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Main = (props) => {
  console.log("render - AssetsForm");

  const classes = useStyles();

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  // tabs
  const [tabVisibleIndex, setTabVisibleIndex] = useState(props.qrCode ? 1 : 0);
  const handleTabChange = (event, newValue) => {
    setTabVisibleIndex(newValue);
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // image
  const [imageFile, setImageFile] = useState("");
  const handleImageInputChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleImageSubmit = async () => {
    const updatedGame = await fetchImageSubmit(
      api.adminAssetUpload + "?gameId=" + props.gameId,
      imageFile
    );
    // props.submit(updatedGame);
    alert("بارگذاری شد");
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // link
  const [link, setLink] = useState("");
  const handleLinkInputChange = (e) => {
    setLink(e.target.value);
  };
  const handleLinkSubmit = async () => {
    const updatedGame = await fetchLinkSubmit(
      api.adminAssetUpload + "?gameId=" + props.gameId + "&link=" + link
    );
    // props.submit(updatedGame);
    alert("بارگذاری شد");
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // assets
  const [assets, setAssets] = useState(props.data);
  const [clickedAssetId, setClickedAssetId] = useState(null);
  const [deleteAssetDialogOpenState, setDeleteAssetDialogOpenState] = useState(false);
  const handleAssetClick = (e) => {
    setClickedAssetId(e.currentTarget.dataset.id)
    setDeleteAssetDialogOpenState(true)
  };
  const closeDeleteAssetDialog = () => {
    setDeleteAssetDialogOpenState(false)
  }
  const handleDeleteAssetBtnClick = async () => {
    const assetToBeDeletedId = clickedAssetId
    const postData = {
      // id: assetToBeDeletedId
      assetId: assetToBeDeletedId
    }
    const status = await fetchDeleteAsset(api.adminDeleteAsset, postData)
    setAssets(
      assets.filter(asset => asset.id != assetToBeDeletedId)
    )
    closeDeleteAssetDialog()
  }

  return (
    <div className={style.main}>
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
            label="محتوا"
          />
          <Tab
            classes={{ root: classes.tab, selected: classes.selected }}
            label="لینک"
          />
        </Tabs>
      </Paper>
      <TabPanel visibleIndex={tabVisibleIndex} index={0}>
        <div className={style.galleryThumbs}>
          {assets.filter(asset => asset.filePath).map(image => (
            <div
              className={`${style.thumb} ar-img`}
              style={{ backgroundImage: `url(${image.filePath})` }}
              data-id={image.id}
              onClick={handleAssetClick}
            >
              <img className="ar" src="/images/ar_10_x_10.png" />
            </div>
          ))}
        </div>
        <div className={style.uploadAssetForm}>
          <input fullWidth style={{ margin: '0 0 8px 0' }} onChange={handleImageInputChange} type="file" />
          <Button fullWidth onClick={handleImageSubmit} variant="contained" color="primary">
            ارسال تصویر
          </Button>
        </div>
      </TabPanel>
      <TabPanel visibleIndex={tabVisibleIndex} index={1}>

        <div className={style.links}>
          {assets.filter(asset => asset.fileLink).map(link => (
            <div
              data-id={link.id}
              className={style.link}
              onClick={handleAssetClick}
            >
              <LinkIcon /> {link.fileLink}
            </div>
          ))}
        </div>

        <div className={style.uploadAssetForm}>
          <TextField
            fullWidth
            onChange={handleLinkInputChange}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            style={{ background: 'white', margin: '0 0 5px' }}
          />
          <Button fullWidth onClick={handleLinkSubmit} variant="contained" color="primary">
            ارسال
          </Button>
        </div>
      </TabPanel>
      <Dialog
        open={deleteAssetDialogOpenState}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeDeleteAssetDialog}
        fullWidth
      >
        <DialogContent>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteAssetBtnClick}
            fullWidth
          >
            حذف شود
          </Button>
        </DialogContent>
      </Dialog>
      {/* <input onChange={handleImageInputChange} type="file" />
      <input onChange={handleLinkInputChange} type="file" />
      <DialogActions>
        <Button onClick={props.close}>بستن</Button>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          ذخیره
        </Button>
      </DialogActions> */}
    </div>
  );
};
export default Main;
