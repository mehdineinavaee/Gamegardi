import { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import api from "../../api";

import style from "../../styles/admin/GameForm.module.css";

const fetchUploadImage = async (url, data, key) => {
  let result;

  const formData = new FormData();
  formData.append(key, data);

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
const fetchUploadImage_ = () => {
  const formData = new FormData();
  formData.append(key, data);
  formData.append("gameId", gameId);

  var request = new XMLHttpRequest();
  request.open("POST", url);
  request.send(formData);
};

const Main = (props) => {
  console.log("render - UploadImageForm");

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // small image state
  const [smallImageFile, setSmallImageFile] = useState("");
  const handleSmallImageInputChange = (e) => {
    setSmallImageFile(e.target.files[0]);
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  // big image state
  const [bigImageFile, setBigImageFile] = useState("");
  const handleBigImageInputChange = (e) => {
    setBigImageFile(e.target.files[0]);
  };

  //----------------------------------------------------------------------------------------
  const handleFormSubmit = async () => {
    await fetchUploadImage(
      api.adminUploadSmallImage+'?gameId='+props.gameId,
      smallImageFile,
      "tileImage"
    );
    const updatedGame = await fetchUploadImage(
      api.adminUploadBigImage+'?gameId='+props.gameId,
      bigImageFile,
      "headerImage"
    );
    props.submit(updatedGame);
  };

  return (
    <div className={style.main}>
      <input onChange={handleSmallImageInputChange} type="file" />
      <input onChange={handleBigImageInputChange} type="file" />
      <DialogActions>
        <Button onClick={props.close}>بستن</Button>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          ذخیره
        </Button>
      </DialogActions>
    </div>
  );
};
export default Main;
