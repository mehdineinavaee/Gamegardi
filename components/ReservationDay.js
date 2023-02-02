import moment from "jalali-moment";
import style from "../styles/Reservation.module.css";
import api from "../api";

const timeString = (weekMinutes = 0) => {
  // converts weekMinutes: Number to 'hh:mm' string format.
  const oneDay = 1440; // 24 * 60
  const dayIndex = Math.floor(weekMinutes / oneDay);
  const dayMinutes = weekMinutes % oneDay;
  let h = Math.floor(dayMinutes / 60);
  let m = dayMinutes % 60;
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  return h + ":" + m;
};

const handleShowingClick = async (e) => {
  e.stopPropagation();
  const id = e.currentTarget.dataset.id;
  const type = e.currentTarget.dataset.type;
  const postData = {
    id,
    type,
  };
  if (type == "weeklySchedule") {
    postData.startDateTime = new Date(
      e.currentTarget.dataset.start
    ).getTime();
    postData.endDateTime = new Date(
      e.currentTarget.dataset.end
    ).getTime();
  }

  // submit add game, submit reserve showing, post data:
  let response = await fetch(api.reserveShowing, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
  });
  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let result = await response.json();
    alert("بازی با موفقیت رزرو شد!");
  } else {
    alert("HTTP-Error: " + response.status);
  }
};

const Main = ({ data }) => {  
  return (
    <div className={style.day}>
      {data.map((item, i) => (
        <div
          key={i}
          data-id={item.id}
          data-type={item.type}
          data-start={item.start}
          data-end={item.end}
          onClick={handleShowingClick}
          className={`${style.showing} ${
            item.isReserved ? style.isReserved : ""
          }`}
        >
          <div className={style.date}>
            {moment(item.start).format("jYYYY/jMM/jDD")}
          </div>
          <div className={style.time}>
            <div className={style.start}>{timeString(item.startInMinutes)}</div>{" "}
            -<div className={style.end}>{timeString(item.endInMinutes)}</div>
          </div>
          <div className={style.price}>{item.price}</div>
        </div>
      ))}
    </div>
  );
};
export default Main;
