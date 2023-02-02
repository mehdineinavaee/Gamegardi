import { useState } from "react";
import style from "../styles/CommentForm.module.css";
import Rating from "@material-ui/lab/Rating";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import api from "../api";
import AddableInputText from "./AddableInputText";

const fetchSubmitComment = async (url, postData, props) => {
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
    props.submit();
  } else alert("HTTP-Error: " + response.message);

  
};

const Main = (props) => {
  const [formData, setFormData] = useState({
    text: "",
    escaperoomMysteryScore: 5,
    escaperoomScenarioScore: 5,
    escaperoomDecorationScore: 5,
    escaperoomPersonnelBehaviorScore: 5,
    escaperoomStrengths: [""],
    escaperoomBadPoints: [""],
  });

  const [showError, setShowError] = useState(false);
  const [isLogin , setIsLogin] = useState(props.authentication.state);
  const handleRatingChange = (name, newValue) => {
    const data = {};
    data[name] = newValue;
    setFormData({
      ...formData,
      ...data,
    });
  };
  const handleTextFieldChange = (e, name) => {
    const data = {};
    data[name] = e;
    setFormData({
      ...formData,
      ...data,
    });
  };
  const handleMainTextChange = (e, name) => {
    const data = {};
    data[name] = e.target.value;
    setFormData({
      ...formData,
      ...data,
    });
  };
  const handleFormSubmit = () => {
    const postData = {
      ...formData,
      gameId: props.gameId,
      QRCode: props.qrCode,
    };
    let hasError = false;
    if (postData.text.length <= 15)
      {
        setShowError(true);
        hasError = true;
      }
     if(hasError) return;

    fetchSubmitComment(api.addComment, postData, props);

  };

  return (
    
    <div className={style.main}>
      <div className={style.sec2}>
        <div className={style.rate}>
          <div className={style.label}>سناریو</div>
          <Rating
            name="escaperoomScenarioScore"
            value={formData.escaperoomScenarioScore}
            onChange={(e, newValue) => {
              handleRatingChange("escaperoomScenarioScore", newValue);
            }}
          />
        </div>
        <div className={style.rate}>
          <div className={style.label}>دکور</div>
          <Rating
            name="escaperoomDecorationScore"
            value={formData.escaperoomDecorationScore}
            onChange={(e, newValue) => {
              handleRatingChange("escaperoomDecorationScore", newValue);
            }}
          />
          {(typeof isLogin == "undefined") ? props.onLoginClose() :""}
        </div>
        <div className={style.rate}>
          <div className={style.label}>رفتار پرسنل</div>
          <Rating
            name="escaperoomPersonnelBehaviorScore"
            value={formData.escaperoomPersonnelBehaviorScore}
            onChange={(e, newValue) => {
              handleRatingChange("escaperoomPersonnelBehaviorScore", newValue);
            }}
          />
        </div>
        <div className={style.rate}>
          <div className={style.label}>معمای بازی</div>
          <Rating
            name="escaperoomMysteryScore"
            value={formData.escaperoomMysteryScore}
            onChange={(e, newValue) => {
              handleRatingChange("escaperoomMysteryScore", newValue);
            }}
          />
        </div>
      </div>
      <div className={style.sec1}>
        {/* <TextField
          onChange={(e) => {
            handleTextFieldChange(e, "escaperoomBadPoints");
          }}
          className={style.inputText}
          id="outlined-basic"
          label="نقاط ضعف"
          variant="outlined"
          fullWidth
        /> */}
        <AddableInputText
          label="نقاط ضعف"
          onChange={(e) => {
            handleTextFieldChange(e, "escaperoomBadPoints");
          }}
        />
        {/* <TextField
          onChange={(e) => {
            handleTextFieldChange(e, "escaperoomStrengths");
          }}
          className={style.inputText}
          id="outlined-basic"
          label="نقاط قوت"
          variant="outlined"
          fullWidth
        /> */}
        <AddableInputText
          label="نقاط قوت"
          onChange={(e) => {
            handleTextFieldChange(e, "escaperoomStrengths");
          }}
        />
      </div>
      <div className={style.sec3}>
        <TextField
          onChange={(e) => {
            handleMainTextChange(e, "text");
          }}
          multiline
          rows={3}
          className={style.inputText}
          id="outlined-basic"
          label="متن نظر"
          variant="outlined"
          fullWidth
        />
        { (showError) ? <Alert severity="error" > تعداد کلمات وارد شده برای کامنت کمتر از حد مجاز است</Alert> : "" }
      </div>
      <div className={style.actions}>
        <Button onClick={  handleFormSubmit } variant="contained" color="primary">
          ارسال نظر
        </Button>
       
      </div>
    </div>
  );
};
export default Main;
