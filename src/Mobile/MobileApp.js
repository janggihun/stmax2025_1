import style from "./MobileApp.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { check_KEY4, check_KEY7, check_SelectList } from "../common/InitLocalStorage";
import { Connect } from "../UseHook/Connect/Connect";
import { useEffect } from "react";
import { useInfoModal } from "../UseHook/InfoModal/useInfoModal";
import { useSelector } from "react-redux";
import { Front } from "./Front/Front";
import { Header } from "./Inc/Header";
import { Footer } from "./Inc/Footer";
import { Stage } from "./Stage/Stage";
import { usePopUp } from "../PC/Front/PopUpPage/PopUp";
import useWindowSizeCustom from "../UseHook/useResize/useResize";

function MobileApp() {
  const modal = useSelector((state) => state.modal.value);
  //selectMap체크
  check_SelectList();
  //4키 체크
  check_KEY4();
  //7키체크
  check_KEY7();
  // //공지 체크
  const { checkVersion, renderPopup, openPopUp } = usePopUp();

  //정보모달
  const { openInfoModalwithMessage, renderInfo } = useInfoModal();

  //모달의 내용이 변경되고 값이 있으면 정보 모달창을 화면에 출력
  useEffect(() => {
    if (modal) {
      openInfoModalwithMessage(modal);
    }
  }, [modal]);

  useEffect(() => {
    //버전 확인
    checkVersion();
    //누적 접속추가
    Connect();
    //아이디확인
  }, []);
  const windowSize = useWindowSizeCustom();
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <div
        className={style.MobileApp}
        style={{ width: windowSize.width, height: windowSize.height }}
      >
        <AnimatePresence>
          <Header />
          <Footer />
          <Routes>
            <Route path="/" element={<Front />} />
            <Route path="/stage" element={<Stage />} />
          </Routes>
        </AnimatePresence>
        {renderInfo()}
      </div>
    </BrowserRouter>
  );
}

export default MobileApp;
