import { useSelector } from "react-redux";
import "./Display.css";
import { AnimatePresence, motion } from "framer-motion";
import { levelList } from "../../../../../common/Array";
import { fnData, get_Src_MusicImg } from "../../../../../common/Base";

export const Display = () => {
  const keyType = useSelector((state) => state.keyType.value);
  const musicMap = useSelector((state) => state.musicMap.value);
  const level = useSelector((state) => state.level.value);
  const data = useSelector((state) => state.data.value);
  const levelBackgroundImage = () => {
    const returnValue = levelList.find((el) => {
      if (el.level === level) {
        return true;
      }
    });
    return returnValue.backgroundImage;
  };
  const fnClassify = () => {
    if (data && level) {
      const noteMap = data.noteList.find((el_n) => {
        if (el_n.musicCnt === musicMap.musicCnt && el_n.level === level) {
          return true;
        }
      });
      return noteMap.classify;
    }
  };

  const levelMap = levelList.find((el) => {
    if (level === el.level) {
      return true;
    }
  });

  const lastMusicCnt = () => {
    if (keyType === 4) {
      return fnData("lastMusicCnt_4");
    } else {
      return fnData("lastMusicCnt_7");
    }
  };

  const musicCnt = musicMap ? musicMap.musicCnt : 0;
  return (
    <div className="Display_Container">
      <AnimatePresence>
        {data && (
          <>
            <motion.img
              key={musicCnt}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.5 }}
              transition={{ duration: 0.4 }}
              className="img Display_Img"
              src={get_Src_MusicImg(keyType, lastMusicCnt())}
              alt="없음"
            />
            <div
              className="Display_arrow sort"
              style={{ backgroundImage: levelMap && levelMap.backgroundImage }}
            >
              <div style={{ marginLeft: "-30px" }}>{levelMap && levelMap.kor}</div>
            </div>
            {/* <div className="Display_LevelIntBox sort"> */}
            {/* {[...Array(10)].map((el, i) => {
                if (i < 3) {
                  if (Math.floor(fnClassify()) <= i) {
                    return <div className="Display_Star"></div>;
                  } else {
                    return (
                      <div className="Display_Star" style={{ backgroundColor: "#ffe600" }}></div>
                    );
                  }
                } else if (i < 6) {
                  if (Math.floor(fnClassify()) <= i) {
                    return <div className="Display_Star"></div>;
                  } else {
                    return (
                      <div className="Display_Star" style={{ backgroundColor: "#00ff2a" }}></div>
                    );
                  }
                } else if (i < 8) {
                  if (Math.floor(fnClassify()) <= i) {
                    return <div className="Display_Star"></div>;
                  } else {
                    return (
                      <div className="Display_Star" style={{ backgroundColor: "#0062ff" }}></div>
                    );
                  }
                } else {
                  if (Math.floor(fnClassify()) <= i) {
                    return <div className="Display_Star"></div>;
                  } else {
                    return (
                      <div className="Display_Star" style={{ backgroundColor: "#ff0000" }}></div>
                    );
                  }
                }
              })} */}
            {/* 
              <div
                className="Display_ClassifyBox sort font30"
                style={{ backgroundImage: levelBackgroundImage() }}
              >
                {fnClassify()}
              </div> */}
            {/* {fnClassify()}+ 난이도 모션 추가될 예정 */}
            {/* </div> */}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
