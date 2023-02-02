import style from "../styles/ReservationMobile.module.css";
import useSWR from "swr";
import api from "../api";
import moment from "jalali-moment";
import { useState } from "react";

// components
import TabPanel from "./TabPanel";
import ReservationShowing from "./ReservationShowing";

const fetcher = async (url, body) => {
  let result;
  // post data:
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // body: JSON.stringify(body),
  });
  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    result = await response.json();
  } else console.log("HTTP-Error: " + response.status);

  return result;
};
const processData = (data) => {
  console.log("res", data);
  const finalData = [];
  let prevDate = -1;
  data.forEach((currentItem) => {
    const date = new Date(currentItem.start);
    const currentDate = new Date(currentItem.start).setHours(0, 0, 0, 0);
    if (currentDate != prevDate) {
      const day = {
        id: currentItem.id,
        date,
        items: [],
      };
      day.items.push(currentItem);
      finalData.push(day);
    } else {
      finalData[finalData.length - 1].items.push(currentItem);
    }
    prevDate = currentDate;
  });
  console.log("final data: ", finalData);
  return finalData;
};
const weekDayLabel = (dayIndex) => {
  return ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"][
    dayIndex
  ];
};
const monthLabel = (monthIndex) => {
  return [
    "",
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ][monthIndex];
};
const timeLabel = (validDate) => {
  const date = new Date(validDate);
  const minutes = date.getMinutes();
  return date.getHours() + (minutes == 0 ? "" : ":" + minutes);
};

const Main = (props) => {
  console.log("render - Reservation Mobile");

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // fetch data
  const { data, error } = useSWR(
    api.getShowings + `?gameId=${props.gameId}`,
    fetcher
  );
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // tabs state
  const [dayVisibleIndex, setDayVisibleIndex] = useState(0);
  const handleDayClick = (e) => {
    setDayVisibleIndex(Number(e.currentTarget.dataset.index));
  };

  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  // render
  let render;
  if (data && data.scheduleRes) {
    // const renderData = processData(data.scheduleRes);
    const renderData = data.scheduleRes;
    render = (
      <>
        <div className={style.days}>
          {renderData.map((day, i) => (
            <div
              key={i}
              data-index={i}
              className={`${style.day} ${
                i === dayVisibleIndex ? style.active : ""
              }`}
              onClick={handleDayClick}
            >
              <div className={style.weekDayLabel}>
                {weekDayLabel(new Date(day.date).getDay())}
              </div>
              <div className={style.dateLabel}>
                <span>{moment(day.date).format("jDD")}</span>
                <span>
                  {monthLabel(Number(moment(day.date).format("jMM")))}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className={style.showings}>
          {renderData.map((day, i) => (
            <TabPanel key={i} index={i} visibleIndex={dayVisibleIndex}>
              <div className={style.dayShowings}>
                {/* {day.items.map((showing) => { */}
                {day.schedules.map((showing) => {
                  const start = showing.start;
                  const data = { ...showing, render: {} };
                  //
                  data.render.gameTitle = props.gameTitle;
                  data.render.year = moment(start).format("jYYYY");
                  data.render.month = monthLabel(
                    Number(moment(start).format("jMM"))
                  );
                  data.render.monthDay = moment(start).format("jDD");
                  data.render.weekDay = weekDayLabel(new Date(start).getDay());
                  data.render.timeStart = timeLabel(start);
                  data.render.timeEnd = timeLabel(showing.end);
                  return (
                    <ReservationShowing
                      authentication={props.authentication}
                      setLoginFormOpenState={(state) => {
                        props.setLoginFormOpenState(state);
                      }}
                      data={{ ...data, playersNumber: props.playersNumber }}
                      isMobile={props.isMobile}
                      isAdmin={props.isAdmin}
                    />
                  );
                })}
              </div>
            </TabPanel>
          ))}
        </div>
      </>
    );
  }

  // fetch results:
  if (error) render = <div>error.message</div>;
  if (!data) render = <div>Loading Reservation Data...</div>;

  return (
    <div className={`${style.main} ${!props.isMobile && style.desktop}`}>
      {render}
    </div>
  );
};
export default Main;
