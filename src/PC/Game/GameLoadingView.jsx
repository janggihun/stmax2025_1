import { AnimatePresence, motion } from "framer-motion";

import "./GameLoadingView.css";
import { fnData, get_Src_Img, get_Src_MusicImg } from "../../common/Base";

export const GameLoadingView = (props) => {
  const progressCnt = props.progressCnt;
  const keyType = fnData("keyType");
  const musicMap = props.musicMap;
  const musicCnt = musicMap.musicCnt;
  const emoticon = props.emoticon;

  const changeProgressStr = () => {
    switch (progressCnt) {
      case 0:
        return "백그라운드 생성중";
      case 1:
        return "키 배열 확인중";
      case 2:
        return "로딩중";
      case 3:
        return "노트 생성중";
      case 4:
        return "오디오 생성중";
      case 5:
        return "백그라운드 정보 확인중";
      case 6:
        return "오디오 볼륨값 확인중";
      case 7:
        return "전체 이상 유무 확인중";
      case 8:
        return "게임 시작 준비중 / 로딩이 조금 길수도 있으니 기다려주세요!";

      default:
        break;
    }
  };
  return (
    <AnimatePresence>
      <motion.div
        className="Game_Progress_Container"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          transitionEnd: {
            display: "none",
          },
        }}
        transition={{ duration: 1 }}
      >
        <img className="img" src={get_Src_MusicImg(keyType, musicCnt)} />
        <div className="game_Bg_Blur"></div>
        <div className="Game_Progress_Bg">
          <img className="img" src={get_Src_Img(emoticon.current)} />
        </div>

        <div className="Game_Progress_StrBox">
          <div className="Game_Progress_StrBox_Top">
            <AnimatePresence>
              {progressCnt && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="Game_Progress_StrBox_Top_Str"
                >
                  {changeProgressStr()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="Game_Progress_StrBox_Bottom">
            <div className="Game_Progress_StrBox_Bar"></div>
            <div
              className="Game_Progress_StrBox_InsideBar"
              style={{ width: progressCnt * 10 + "%" }}
            ></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
