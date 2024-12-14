import { headerAndFooter } from "../mobileCss";
import style from "./Header.module.css";
import { motion } from "framer-motion";
export function Header() {
  const userId = window.localStorage.getItem("userId");
  const clickMore = () => {
    // alert("준비중");
  };
  return (
    <div className={style.HeaderContainer} style={{ backgroundColor: headerAndFooter }}>
      <div className={`${style.Header_Left} sort font20`}>{userId ? "메인" : "홈"}</div>
      <div className={`${style.Header_Middle} sort font30`}>STMAX</div>
      <div className={`${style.Header_Right} sort`}>
        <motion.img
          whileTap={{ scale: 0.4 }}
          whileHover={{ scale: 0.55 }}
          onClick={() => {
            clickMore();
          }}
          className="img"
          style={{ width: "90px", height: "90px", scale: "0.5" }}
          src="/Mobile/more.png"
        />
      </div>
    </div>
  );
}
