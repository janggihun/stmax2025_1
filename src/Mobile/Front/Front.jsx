//모바일 프론트 페이지

import { useNavigate } from "react-router-dom";
import style from "./Front.module.css";
import { useEffect, useState } from "react";
import { valUserId } from "../../common/Base";
import { motion } from "framer-motion";
import { LoginPage } from "../../PC/Front/LoginPage/LoginPage";
import { JoinPage } from "../../PC/Front/LoginPage/JoinPage";
import { PwChange } from "../../PC/Front/LoginPage/PwChange";
export const Front = () => {
  const navigate = useNavigate();
  //현재 페이지
  //nowPage : 0 로그인 , 1 회원가입, 2 비밀번호 변경
  const [frontPage, setFrontPage] = useState(0);
  //로그인 확인후 페이지설정
  useEffect(() => {
    valUserId(navigate);
  }, []);

  return (
    <div className={style.frontContainer}>
      <div className={style.frontBox}>
        <motion.div
          className={style.Front_container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <img className="front_img" src="/front/stellive_bg.jpg" alt="사진없음" />
          <div className="front_Box">
            {frontPage === 0 && <LoginPage setFrontPage={setFrontPage} frontPage={frontPage} />}
            {frontPage === 1 && <JoinPage setFrontPage={setFrontPage} frontPage={frontPage} />}
            {frontPage === 2 && <PwChange setFrontPage={setFrontPage} frontPage={frontPage} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
