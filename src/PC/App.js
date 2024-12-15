import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Front } from "./Front/Front";
import { usePopUp } from "./Front/PopUpPage/PopUp";
import { check_KEY4, check_KEY7, check_SelectList } from "../common/InitLocalStorage";
import { Connect } from "../UseHook/Connect/Connect";
import { useEffect } from "react";
import { Stage } from "./Stage/Stage";
import { useInfoModal } from "../UseHook/InfoModal/useInfoModal";
import { useSelector } from "react-redux";
import { Game_4key } from "./Game/4key/GamePage/Game";
import { Game_7key } from "./Game/7key/GamePage/Game";
import { Replay_7key } from "./Game/7key/GamePage/Replay";
import { Replay_4key } from "./Game/4key/GamePage/Replay";
import { EndView } from "./Game/End/EndView";
import { Loading } from "../UseHook/Loading/Loading";

function App() {
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

    //test
  }, []);

  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <div className="App">
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Front />} />
            <Route path="/STAGE" element={<Stage />} />
            {/* <Route path="/Tier" element={<TierMain />} /> */}
            <Route path="/Game/4key" element={<Game_4key />} />
            <Route path="/Game/7key" element={<Game_7key />} />
            <Route path="/End" element={<EndView />} />
            <Route path="/Replay/4key" element={<Replay_4key />} />
            <Route path="/Replay/7key" element={<Replay_7key />} />
          </Routes>
        </AnimatePresence>
        {openPopUp && renderPopup()}
        <Loading />
        {renderInfo()}
      </div>
    </BrowserRouter>
  );
}

export default App;
