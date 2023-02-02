import { useState } from "react";
import style from "../styles/AddableInputText.module.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from "@material-ui/icons/Add";

const Main = (props) => {
  const initData = [""];
  const [fields, setFields] = useState(initData);
  const handleFieldChange = (e) => {
    const index = Number(e.target.getAttribute("index"));
    const updatedFields = [...fields];
    updatedFields[index] = e.target.value;
    setFields(updatedFields);
    props.onChange(updatedFields);
  };
  const renderFields = (fields) => {
    return fields.map((field, i) => (
      <div key={i} className={`${style.input}`}>
        <TextField
          inputProps={{ index: i }}
          value={field}
          onChange={handleFieldChange}
          label={props.label}
          variant="outlined"
          style={{ width: "100%" }}
        />
        <IconButton
          aria-label="delete"
          data-index={i}
          onClick={handleDeleteFieldClick}
        >
          <HighlightOffIcon fontSize="small" />
        </IconButton>
      </div>
    ));
  };
  const handleAddFieldsClick = (e) => {
    setFields([...fields, ""]);
  };
  const handleDeleteFieldClick = (e) => {
    const index = Number(e.currentTarget.dataset.index);
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };
  return (
    <div className={style.main}>
      <div className={style.fields}>{renderFields(fields)}</div>
      <div className={style.fieldActions}>
        <IconButton aria-label="add" onClick={handleAddFieldsClick}>
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default Main;
