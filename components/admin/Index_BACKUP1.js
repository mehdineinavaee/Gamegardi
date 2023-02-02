import Link from "next/link";
import style from '../../styles/admin/Games.module.css'
const Main = (props) => {
  return (
    <div className={style.main}>
      <Link href="/admin/">
        <a>
          <div className={style.module}>
            <div className={style.icon}></div>
            <div className={style.title}>تنظیمات</div>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a>
          <div className={style.module}>
            <div className={style.icon}></div>
            <div className={style.title}>بازی‌ها</div>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default Main;
