import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import api from "../../api";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import style from "../../styles/admin/GameForm.module.css";

const fetchAddGame = async (url, files) => {
  let result;

  const formData = new FormData();
  files.forEach((item) => {
    formData.append(item.name, item.file);
  });

  let response = await fetch(url, {
    method: "POST",
    credentials: "include",
    /* headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData), */
    body: formData,
  });

  if (response.ok) {
    result = await response.json();
  } else alert("HTTP-Error: " + response.status);
  return result.club;
};

/* const districtsField = (allDistricts, cityId) => {
  return allDistricts.filter((district) => district.city.id == cityId);
}; */

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
  // image
  const [imageFile, setImageFile] = useState("");
  const handleImageInputChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  /* const [fields, setFields] = useState({
    ...props.dependencies,
    districts: districtsField(
      props.dependencies.districts,
      props.dependencies.cities[0].id
    ),
  }); */
  const [fields, setFields] = useState(props.dependencies);
  const handleCityChange = (e, key) => {
    const cityId = e.target.value;

    // set districts:
    /* const districts = districtsField(props.dependencies.districts, cityId);
    setFields({
      ...fields,
      districts,
    }); */

    // set formData
    const data = {};
    data.cityId = cityId;
    // data.districtId = districts[0] && districts[0].id;

    setFormData({ ...formData, ...data });
  };

  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
  const handleFormSubmit = async () => {
    let query = "?";
    for (const prop in formData) {
      query += `${prop}=${formData[prop]}&`;
    }

    const files = [
      {
        name: "headerImage",
        file: imageFile,
      },
    ];

    query
    debugger

    const addedGame = await fetchAddGame(api.adminAddClub + query, files);
    addedGame
    debugger
    props.submit(addedGame);
  };

  return (
    <div className={style.main}>
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
        value={formData.description}
        onChange={(e) => {
          handleInputChange(e, "description");
        }}
        className={style.input}
        label="توضیحات"
        variant="outlined"
        style={{ width: "100%" }}
        multiline
        rows={2}
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
      <input fullWidth onChange={handleImageInputChange} type="file" />
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
