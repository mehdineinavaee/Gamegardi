import Day from "./ReservationDay";
const createData = (initData) => {
  console.log('res',initData)
  const finalData = [];
  let prevDate = -1;
  initData.forEach((currentItem) => {
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
  return finalData;
};
const Main = ({ data }) => {
  return createData(data.scheduleRes).map((day, i) => (
    <Day key={i} data={day.items} />
  ));
};
export default Main;
