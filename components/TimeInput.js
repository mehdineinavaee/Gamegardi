import { useState, useRef } from "react";
import style from "../styles/TimeInput.module.css";
const handleClick = e => {
  e.target.select()
}
const Main = (props) => {
  /* const [val, setVal] = useState({
    hour: "00",
    minute: "00",
  }); */
  const val = useRef({
    hour: "00",
    minute: "00",
  });
  const handleChange = (e) => {
    const currentVal = {};
    currentVal[e.target.dataset.name] = e.target.value;
    /* setVal({
      ...val,
      ...currentVal,
    }); */
    val.current = {
      ...val.current,
      ...currentVal,
    };
    props.onChange(val.current.hour + ":" + val.current.minute);
  };
  return (
    <div className={styleMedia.main}>
      <label className={style.label}>{props.label || ""}</label>
      <div className={style.inputs}>
        <input
          data-name="minute"
          value={val.current.minute}
          onInput={handleChange}
          onClick={handleClick}
          type="number"
        />
        <span>:</span>
        <input
          data-name="hour"
          value={val.current.hour}
          onInput={handleChange}
          onClick={handleClick}
          type="number"
        />
      </div>
    </div>
  );
};
export default Main;
