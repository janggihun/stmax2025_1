import { useDispatch, useSelector } from "react-redux";
import "./NoteInfo.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fnData, fnSinger, saveData } from "../../../../../common/Base";
import { levelList } from "../../../../../common/Array";
import { openModal } from "../../../../../Store/ModalSlice";

export const NoteInfo = () => {
  const [speed, setSpeed] = useState();
  const [noteMap, setNoteMap] = useState();
  const data = useSelector((state) => state.data.value);
  const level = useSelector((state) => state.level.value);
  const musicMap = useSelector((state) => state.musicMap.value);
  const dispatch = useDispatch();
  useEffect(() => {
    setSpeed(fnData("speed"));
  }, []);
  const fnNoteMap = () => {
    if (data) {
      const noteMap = data.noteList.find((el_n) => {
        if (el_n.musicCnt === musicMap.musicCnt && el_n.level === level) {
          return true;
        }
      });
      setNoteMap(noteMap);
    }
  };
  useEffect(() => {
    fnNoteMap();
  }, [musicMap, level]);
  // classify, updateDate, level, apply, legend, LevelKor, musicCnt, videoId, coments, title, LevelEng, noteMaker, NoteCnt, time, testApply, bpm
  //스피드 변경
  const changeSpeed = (value) => {
    const checkValue = parseFloat((parseFloat(value.toFixed(1)) + speed).toFixed(1));
    if (0.5 <= checkValue && checkValue <= 2) {
      saveData("speed", checkValue);
      setSpeed(checkValue);
    } else {
      dispatch(openModal("이 이상은 불가능합니다."));
    }
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

  const levelBackgroundImage = () => {
    const returnValue = levelList.find((el) => {
      if (el.level === level) {
        return true;
      }
    });
    return returnValue.backgroundImage;
  };
  return (
    <>
      <div className="NoteInfo_Container">
        <div className="NoteInfo_Blank"></div>
        <div className="NoteInfo_Contents">
          <div className="NoteInfo_classify1"></div>
          <div className="NoteInfo_Title  font30">{musicMap && musicMap.title}</div>
          <div className="NoteInfo_singer font20">
            {data && fnSinger(data.singerList, musicMap.musicCnt)}
          </div>
          <div className="NoteInfo_time ">
            <div className="NoteInfo_time1">시간 : {noteMap && noteMap.time} </div>
            <div className="NoteInfo_updateTme">
              업데이트 : {musicMap ? musicMap.updateDate : "2024-03-30"}
            </div>
          </div>
          <div className="NoteInfo_time ">BPM : {noteMap && noteMap.bpm} </div>
          <div className="NoteInfo_time ">제작 : {noteMap && noteMap.noteMaker} </div>
          <div className="NoteInfo_time "> {noteMap && noteMap.coments} </div>
        </div>
        <div className="NoteInfo_Speed sort font20">
          <motion.div
            className="NoteInfo_Speed_L sort"
            whileTap={{ scale: 0.8 }}
            onClick={() => {
              changeSpeed(-0.1);
            }}
          >
            <img className="img" src="/arrow/keyboardArrow_left.png" alt="사진없음" />
          </motion.div>
          <div className="NoteInfo_Speed_M sort" key={speed}>
            x {speed}
          </div>
          <motion.div className="NoteInfo_Speed_R sort" whileTap={{ scale: 0.8 }}>
            <img
              className="img"
              src="/arrow/keyboardArrow_right.png"
              alt="사진없음"
              onClick={() => {
                changeSpeed(0.1);
              }}
            />
          </motion.div>
        </div>
        <div className="NoteInfo_classify">
          {[...Array(10)].map((el, i) => {
            if (i < 2) {
              if (Math.floor(fnClassify()) <= i) {
                return <div className="NoteInfo_Star"></div>;
              } else {
                return <div className="NoteInfo_Star" style={{ backgroundColor: "#ffe600" }}></div>;
              }
            } else if (i < 4) {
              if (Math.floor(fnClassify()) <= i) {
                return <div className="NoteInfo_Star"></div>;
              } else {
                return <div className="NoteInfo_Star" style={{ backgroundColor: "#00ff2a" }}></div>;
              }
            } else if (i < 6) {
              if (Math.floor(fnClassify()) <= i) {
                return <div className="NoteInfo_Star"></div>;
              } else {
                return <div className="NoteInfo_Star" style={{ backgroundColor: "#0062ff" }}></div>;
              }
            } else if (i < 8) {
              if (Math.floor(fnClassify()) <= i) {
                return <div className="NoteInfo_Star"></div>;
              } else {
                return <div className="NoteInfo_Star" style={{ backgroundColor: "#bf00ff" }}></div>;
              }
            } else {
              if (Math.floor(fnClassify()) <= i) {
                return <div className="NoteInfo_Star"></div>;
              } else {
                return <div className="NoteInfo_Star" style={{ backgroundColor: "#ff0000" }}></div>;
              }
            }
          })}
          <div
            className="NoteInfo_ClassifyBox sort font30"
            style={{ backgroundImage: levelBackgroundImage() }}
          >
            {fnClassify()}
          </div>
        </div>
      </div>
    </>
  );
};
