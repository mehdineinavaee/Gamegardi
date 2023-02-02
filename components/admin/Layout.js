import Link from "next/link";
import style from "../../styles/admin/Games.module.css";
const Main = ({ children }) => {
  return (
    <div>
      <div>Menu</div>
      <div>{children}</div>
      <div>Footer</div>
    </div>
  );
};
export default Main;
