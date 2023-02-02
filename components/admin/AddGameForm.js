import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import api from "../../api";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid"
import style from "../../styles/admin/GameForm.module.css";
import moment from "jalali-moment";

const fetchAddGame = async (url, postData) => {
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
  } else alert("HTTP-Error: " + response.status);

  return result.game;
};

const districtsField = (allDistricts, cityId) => {
  return allDistricts.filter((district) => district.city.id == cityId);
};

const Main = (props) => {
  console.log("render - AddGameForm");

  const [formData, setFormData] = useState(props.initData);

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  const handleInputChange = (e, key) => {
    const data = {};
    data[key] = e.target.value;
    setFormData({ ...formData, ...data });
  };
  const handleCheckboxChange = (e, key) => {
    const data = {};
    data[key] = e.target.checked;
    setFormData({ ...formData, ...data });
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  const [fields, setFields] = useState({
    ...props.dependencies,
    districts: districtsField(
      props.dependencies.districts,
      props.initData.cityId || props.dependencies.cities[0].id
    ),
  });
  const handleCityChange = (e, key) => {
    const cityId = e.target.value;

    // set districts:
    const districts = districtsField(props.dependencies.districts, cityId);
    setFields({
      ...fields,
      districts,
    });

    // set formData
    const data = {};
    data.cityId = cityId;
    data.districtId = districts[0] && districts[0].id;

    setFormData({ ...formData, ...data });
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  const handleFormSubmit = async () => {
    // props.submit(formData);

    // handle escapeRoomConditions:
    const escapeRoomConditions = conditionsFields.map((condition) => ({
      text: condition,
    }));
    const escapeRoomQuestions = questionsFields.map((question) => ({
      text: question,
    }));

    if (formData.year > 1350 && formData.month <= 12 && formData.month > 0) {
      formData.releaseDate = moment(formData.year + '-' + formData.month + '-' + 2, 'jYYYY-jMM-jDD');
    }
    const postData = {
      ...formData,
      escapeRoomConditions,
      escapeRoomQuestions,
    };

    const addedGame = await fetchAddGame(api.adminAddGame, postData);
    props.submit(addedGame);
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  const [conditionsFields, setConditionsFields] = useState(
    JSON.parse(formData.escapeRoomConditions).map((field) => field.text)
    // ['کاند 1', 'کاند 2', 'کاند 3']
  );

  const handleConditionChange = (e) => {
    const index = Number(e.target.getAttribute("index"));
    const updatedConditionsFields = [...conditionsFields];
    updatedConditionsFields[index] = e.target.value;
    setConditionsFields(updatedConditionsFields);
  };

  const renderConditionsFields = (conditionsFields) => {
    return conditionsFields.map((field, i) => (
      <div key={i} className={`${style.input} ${style.deletable}`}>
        <TextField
          inputProps={{ index: i }}
          value={field}
          onChange={handleConditionChange}
          label="شرایط و قوانین"
          variant="outlined"
          style={{ width: "100%" }}
          multiline
          rows={2}
        />
        <IconButton
          aria-label="delete"
          data-index={i}
          onClick={handleDeleteConditionClick}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    ));
  };

  //faq....................................................................................................................//
  const [questionsFields, setQuestionsFields] = useState(
    JSON.parse(formData.escapeRoomQuestions).map((field) => field.text)
  );

  const handleQuestionChange = (e) => {
    const index = Number(e.target.getAttribute("index"));
    const updatedQuestionsFields = [...questionsFields];
    updatedQuestionsFields[index] = e.target.value;
    setQuestionsFields(updatedQuestionsFields);
  };
  const renderQuestionsFields = (questionsFields) => {
    return questionsFields.map((field, i) => (
      <div key={i} className={`${style.input} ${style.deletable}`}>
        <TextField
          inputProps={{ index: i }}
          value={field}
          onChange={handleQuestionChange}
          label="سوالات متداول"
          variant="outlined"
          style={{ width: "100%" }}
          multiline
          rows={2}
        />
        <IconButton
          aria-label="delete"
          data-index={i}
          onClick={handleDeleteQuestionClick}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    ));
  };
  //...............................................................................................................
  const handleAddConditionsClick = (e) => {
    setConditionsFields([...conditionsFields, ""]);
  };
  const handleDeleteConditionClick = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    const updatedConditionsFields = [...conditionsFields];
    updatedConditionsFields.splice(index, 1);
    setConditionsFields(updatedConditionsFields);
  };
  const handleAddQuestionsClick = (e) => {
    setQuestionsFields([...questionsFields, ""]);
  };
  const handleDeleteQuestionClick = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    const updatedQuestionsFields = [...questionsFields];
    updatedQuestionsFields.splice(index, 1);
    setQuestionsFields(updatedQuestionsFields);
  };

  return (
    <div className={style.main}>
      <FormControl className={style.input} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">مجموعه</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={formData.clubId}
          onChange={(e) => {
            handleInputChange(e, "clubId");
          }}
          label="مجموعه"
        >
          {props.dependencies.clubs &&
            props.dependencies.clubs.map((club) => (
              <MenuItem key={club.id} value={club.id}>
                {club.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        value={formData.name}
        onChange={(e) => {
          handleInputChange(e, "name");
        }}
        className={style.input}
        label="نام"
        variant="outlined"
      />
      <TextField
        value={formData.priority}
        onChange={(e) => {
          handleInputChange(e, "priority");
        }}
        type="number"
        className={style.input}
        label="اولویت نمایش"
        variant="outlined"
      />
      <FormControl className={style.input} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">شهر</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={formData.cityId}
          onChange={(e) => {
            handleCityChange(e, "cityId");
          }}
          label="شهر"
        >
          {props.dependencies.cities &&
            props.dependencies.cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={style.input} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">منطقه</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={formData.districtId}
          onChange={(e) => {
            handleInputChange(e, "districtId");
          }}
          label="منطقه"
        >
          {fields.districts &&
            fields.districts.map((district) => (
              <MenuItem key={district.id} value={district.id}>
                {district.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        value={formData.address}
        onChange={(e) => {
          handleInputChange(e, "address");
        }}
        className={style.input}
        label="آدرس"
        variant="outlined"
      />
      <TextField
        value={formData.location}
        onChange={(e) => {
          handleInputChange(e, "location");
        }}
        className={style.input}
        label="لوکیشن"
        variant="outlined"
      />
      <FormControl className={style.input} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">نوع</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={formData.gameType}
          onChange={(e) => {
            handleInputChange(e, "gameType");
          }}
          label="نوع"
        >
          {fields.types &&
            fields.types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        value={formData.defaultCost}
        onChange={(e) => {
          handleInputChange(e, "defaultCost");
        }}
        type="number"
        className={style.input}
        label="قیمت پیش‌فرض (ریال)"
        variant="outlined"
      />
      <TextField
        value={formData.defaultCommissionCost}
        onChange={(e) => {
          handleInputChange(e, "defaultCommissionCost");
        }}
        type="number"
        className={style.input}
        label="کمیسیون (ریال)"
        variant="outlined"
      />
      <TextField
        value={formData.duration}
        onChange={(e) => {
          handleInputChange(e, "duration");
        }}
        type="number"
        className={style.input}
        label="مدت زمان (دقیقه)"
        variant="outlined"
      />
      <TextField
        value={formData.escapeRoomMinPlayer}
        onChange={(e) => {
          handleInputChange(e, "escapeRoomMinPlayer");
        }}
        type="number"
        className={style.input}
        label="حداقل تعداد"
        variant="outlined"
      />
      <TextField
        value={formData.escapeRoomMaxPlayer}
        onChange={(e) => {
          handleInputChange(e, "escapeRoomMaxPlayer");
        }}
        type="number"
        className={style.input}
        label="حداکثر تعداد"
        variant="outlined"
      />
      <FormControl className={style.input} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">ژانر</InputLabel>
        <Select
          multiple
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={formData.genreIds}
          onChange={(e) => {
            handleInputChange(e, "genreIds");
          }}
          label="ژانر"
        >
          {fields.genres &&
            fields.genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <TextField
        className={style.input}
        value={formData.escapeRoomStory}
        onChange={(e) => {
          handleInputChange(e, "escapeRoomStory");
        }}
        label="سناریو"
        variant="outlined"
        style={{ width: "100%" }}
        multiline
        rows={4}
      />
       <TextField
        className={style.input}
        value={formData.description}
        onChange={(e) => {
          handleInputChange(e, "description");
        }}
        label="توضیحات"
        variant="outlined"
        style={{ width: "100%" }}
        multiline
        rows={4}
      />
      {renderConditionsFields(conditionsFields)}
      <div className={style.fieldActions}>
        <IconButton aria-label="add" onClick={handleAddConditionsClick}>
          <AddIcon />
        </IconButton>
      </div>
      {renderQuestionsFields(questionsFields)}
      <div className={style.fieldActions}>
        <IconButton aria-label="add" onClick={handleAddQuestionsClick}>
          <AddIcon />
        </IconButton>
      </div>
      <TextField
        value={formData.phoneNum}
        onChange={(e) => {
          handleInputChange(e, "phoneNum");
        }}
        type="tel"
        className={style.input}
        label="شماره تماس"
        variant="outlined"
      />
      <TextField
        value={formData.smsPhoneNum}
        onChange={(e) => {
          handleInputChange(e, "smsPhoneNum");
        }}
        type="tel"
        className={style.input}
        label="شماره SMS"
        variant="outlined"
      />
      <TextField
        value={formData.linkToGameSite}
        onChange={(e) => {
          handleInputChange(e, "linkToGameSite");
        }}
        className={style.input}
        label="آدرس سایت"
        variant="outlined"
      />
      <TextField
        value={formData.linkToInstagram}
        onChange={(e) => {
          handleInputChange(e, "linkToInstagram");
        }}
        className={style.input}
        label="آدرس اینستاگرام"
        variant="outlined"
      />
      <TextField
        value={formData.linkToWhatsApp}
        onChange={(e) => {
          handleInputChange(e, "linkToWhatsApp");
        }}
        className={style.input}
        label="آدرس واتس‌اپ"
        variant="outlined"
      />
      <Grid container>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.isReservable}
            onChange={(e) => {
              handleCheckboxChange(e, "isReservable");
            }}
            name="checkedB"
            color="primary"
          />
          
        }
        label="قابل رزرو"

       
      />
      <FormControlLabel
         control={
          <Checkbox
            checked={formData.isSuggestion}
            onChange={(e) => {
              handleCheckboxChange(e, "isSuggestion");
            }}
            name="checkedS"
            color="primary"
          />
          
        }
        label="پیشنهاد ما"
      />
      </Grid>
      <TextField
        value={formData.year}
        onChange={(e) => {
          handleInputChange(e, "year");
        }}
        type="number"
        className={style.input}
        label="سال"
        variant="outlined"
      />
      <TextField
        value={formData.month}
        onChange={(e) => {
          handleInputChange(e, "month");
        }}
        type="number"
        className={style.input}
        label="ماه"
        variant="outlined"
      />
      <FormControl className={style.input} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">وضعیت</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={formData.gameState}
          onChange={(e) => {
            handleInputChange(e, "gameState");
          }}
          label="وضعیت"
        >
          {[
            { id: 1, name: "در حال اجرا" },
            { id: 2, name: "به زودی" },
            { id: 3, name: "منقضی شده" },
            { id: 4, name: "توقف موقت" }
          ].map((gameState) => (
            <MenuItem key={gameState.id} value={gameState.id}>
              {gameState.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DialogActions>
        <Button onClick={props.close}>بستن</Button>
        <Button onClick={handleFormSubmit} variant="contained" color="primary">
          افزودن
        </Button>
      </DialogActions>
    </div>
  );
};
export default Main;
