import { useNavigate } from "react-router-dom";
import { headerAndFooter } from "../mobileCss";
import style from "./Footer.module.css";
import { motion } from "framer-motion";

export function Footer() {
  const navigator = useNavigate();
  const userId = window.localStorage.getItem("userId");
  const logout = () => {
    window.localStorage.removeItem("userId");
    navigator("/");
  };
  return (
    <div className={style.FooterContainer} style={{ backgroundColor: headerAndFooter }}>
      <div className="sort">
        <motion.img
          whileTap={{ scale: 0.4 }}
          whileHover={{ scale: 0.55 }}
          className="img"
          style={{ width: "70px", scale: "0.5" }}
          src="/Mobile/home.png"
        />
      </div>
      <div className="sort">
        <motion.img
          whileTap={{ scale: 0.4 }}
          whileHover={{ scale: 0.55 }}
          className="img"
          style={{ width: "70px", scale: "0.4" }}
          src="/Mobile/notice.png"
        />
      </div>
      <div className="sort">
        <motion.img
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="img"
          style={{ width: "40px", height: "40px" }}
          src="/Emoticon/STLcircle.png"
        />
      </div>
      {userId && (
        <div className="sort">
          <motion.div
            onClick={() => {
              logout();
            }}
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="img"
          >
            로그아웃
          </motion.div>
        </div>
      )}
    </div>
  );
}
