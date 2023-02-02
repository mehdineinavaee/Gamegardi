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

const fetchAdminForm = async (postData) => {
  let result;

  let response = await fetch(api.adminAddAdmin, {
    method: "POST",
    // credentials: "include",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
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
    const addedAdmin = await fetchAdminForm(formData);
    /* const addedAdmin = {
      id: 1000,
      fullName: 'ایکس ایکس',
      phoneNum: '101010'
    } */
    const admin = {
      fullName: formData.firstName + " " + formData.lastName,
      phoneNum: formData.phoneNum,
    };
    props.submit(admin);
  };

  return (
    <div className={style.main}>
      <TextField
        value={formData.firstName}
        onChange={(e) => {
          handleInputChange(e, "firstName");
        }}
        className={style.input}
        label="نام"
        variant="outlined"
      />
      <TextField
        value={formData.lastName}
        onChange={(e) => {
          handleInputChange(e, "lastName");
        }}
        className={style.input}
        label="نام خانوادگی"
        variant="outlined"
      />
      <TextField
        value={formData.phoneNum}
        type="number"
        onChange={(e) => {
          handleInputChange(e, "phoneNum");
        }}
        className={style.input}
        label="تلفن"
        variant="outlined"
      />
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
