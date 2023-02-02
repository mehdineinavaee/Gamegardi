import style from "../styles/Card.module.css";
const Main = ({ icon, title, children, isMobile }) => {
  console.log('ch: ',children)
  console.log("render - Preview Card");
  return (
    <div className={style.main}>
      <div className={style.header}>
        {icon}
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.preview}>{children}</div>
    </div>
  );
};
export default Main;
