import styles from "../../styles/Scheduler.module.css";
import Day from "./SchedulerDay";
//
const totalMinutes = (timeString = "00:00", dayNumber = 0) => {
  // daynumber = 0 (Saturday), 1, 2, 3, 4, 5, 6
  // [converts 'hh:mm' format string to total week minuts.]
  return (
    eval(
      timeString
        .split(":")
        .map((item, i) => {
          let R = Number(item);
          if (i == 0) {
            R = R * 60 + "+";
          }
          return R;
        })
        .join("")
    ) +
    dayNumber * 24 * 60
  );
};

// returns day index of the give week minutes:
const dayIndex = (weekMinutes = 0) => Math.floor(weekMinutes / 1440);

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
const createWeek = (showings, props) => {
  // [returns week array state, which consists of week showings + gaps.]
  // showings are generally of twe types:
  // 1. normal : start <= end
  // 2. extended : start > end
  // in createWeek function we correct the extended end time and
  // convert them into twe week blocks.
  // a correct time means a valid point of minute in a week : 0 < t < 10080
  // a new extended showing is added to the "showings" array with
  // the incorrect end (end < start) so when getting final data out of the
  // "showings" (in getWeekData function) we again correct the extendeds
  //
  // create week showings:
  const weekShowings = [[], [], [], [], [], [], []];
  showings.forEach((showing) => {
    weekShowings[showing.day].push(showing);
  });
  //
  const week = [];
  const gapSize = 60;
  let prev;
  let curr;
  weekShowings.forEach((weekDay, i) => {
    let extendedShowing = false;
    const day = i;
    // prev:
    if (!prev)
      prev = {
        day,
        end: totalMinutes("00:00", day),
        endText: "00:00",
      };

    // temp helper:
    weekDay.push({
      day,
      start: totalMinutes("24:00", day),
      end: totalMinutes("24:00", day),
      startText: "24:00",
      endText: "24:00",
    });
    weekDay.forEach((showing, j) => {
      curr = showing;
      //
      // create gap:
      if (props.editable) {
        if (curr.start - prev.end >= gapSize) {
          const gap = {
            type: "gap",
            day: prev.day,
            start: prev.end,
            startText: prev.endText,
            end: curr.start,
            endText: curr.startText,
          };
          week.push(gap);
        }
      }

      //
      curr.type = "showing";
      if (curr.start > curr.end) {
        extendedShowing = true;
        // devide showing into extendedStart & extendedEnd:
        // extendedStart:
        const extendedStart = {
          id: curr.id,
          type: "showing/extendedStart",
          day: curr.day,
          start: curr.start,
          startText: curr.startText,
          end: totalMinutes("24:00", curr.day),
          endText: curr.endText,
        };
        week.push(extendedStart);
        //
        // extendedEnd:
        const extendedEndDay = curr.day + 1;
        const extendedEnd = {
          type: "showing/extendedEnd",
          day: extendedEndDay,
          start: totalMinutes("00:00", extendedEndDay),
          startText: "00:00",
          end: totalMinutes(curr.endText, extendedEndDay),
          endText: curr.endText,
        };
        curr = extendedEnd;
        // when submit showing add, we add one showing to
        // the showings array for an extended showing with the
        // currectly calculated "start" & "end".
        // when creating the week, each extended showing will be devided into
        // twe showings.
      }
      // do not consider the last showing (it's the "temp helper"):
      if (j < weekDay.length - 1) {
        week.push(curr);
        prev = curr;
      }
      //
      // if we do not have extended showing at the end of the day (before
      // the last "temp helper"), we undefine the "prev" so that the "prev"
      // get defined correctly at the next day (if (!prev)...)
      // but when we have extended showing, we keep the current "extendedEnd" as
      // the prev so that the next day create the first gap depending on the "extendedEnd".
      // when leaving current day and going to the next day, if we do not
      // have "extendedShowing", undefine the "prev"
      if (j == weekDay.length - 1 && !extendedShowing) prev = undefined;
    });
  });

  return week;
};

// const fetcher = (url) => fetch(url).then((res) => res.json());
const createInitShowings = (initShowings) => {
  return initShowings.map((showing) => ({
    ...showing,
    day: dayIndex(showing.start),
    startText: timeString(showing.start),
    endText: timeString(showing.end),
  }));
};
const Main = (props) => {
  console.log("~> Render - Week");

  const week = createWeek(createInitShowings(props.showings), props);

  const renderWeek = (week, props) => {
    // WARNING - create data within the week itself not in here
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push({
        gameId: props.gameId,
        day: i,
        blocks: week.filter((block) => block.day == i),
      });
    }  
    return (
      <div className={styles.week}>
        <Day data={data[0]} load={props.load} editable={true} />
        <Day data={data[1]} load={props.load} editable={true} />
        <Day data={data[2]} load={props.load} editable={true} />
        <Day data={data[3]} load={props.load} editable={true} />
        <Day data={data[4]} load={props.load} editable={true} />
        <Day data={data[5]} load={props.load} editable={true} />
        <Day data={data[6]} load={props.load} editable={true} />
      </div>
    );
  };

  return <div className={styles.main}>{renderWeek(week, props)}</div>;
};

export default Main;
