import { useEffect, useState } from "react";
import { tutorialDetailList, tutorialHeadList } from "../../../common/Tutorial";
import "./Tutorial.css";
import "../../../style/Scroll.css";
import { motion } from "framer-motion";
import { openModal } from "../../../Store/ModalSlice";
import { useDispatch } from "react-redux";

//튜토리얼 페이지
export const Tutorial = () => {
  const dispatch = useDispatch();
  const [nowIndex, setNowIndex] = useState();

  const [nowDtlCnt, setNowDtlCnt] = useState();
  const [detailList, setDetailList] = useState();

  const msg_firstPage = "튜토리얼의 첫번째 페이지 입니다.";
  const msg_lastPage = "튜토리얼의 마지막 페이지 입니다.";

  useEffect(() => {
    setNowIndex(0);
  }, []);

  useEffect(() => {
    fnDetailList();
    setNowDtlCnt(0);
    setNowDtlCnt(0);
  }, [nowIndex]);

  const clickHeader = (el) => {
    setNowIndex(el.index);
  };
  const renderHeader = () => {
    return tutorialHeadList.map((el, i) => {
      return (
        <div
          className="Tutorial_Header_Row"
          onClick={() => {
            clickHeader(el);
          }}
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="Tutorial_Header_Row_Title"
            style={i === nowIndex ? { color: "purple", backgroundColor: "white" } : {}}
          >
            <div className="Tutorial_Header_Blank"></div>
            <div className="Tutorial_Header_titleBox">
              {el.index + "장. "} {el.title}
            </div>
          </motion.div>
        </div>
      );
    });
  };
  const fnDetailList = () => {
    const newList = tutorialDetailList.filter((el) => {
      if (el.index === nowIndex) {
        return el;
      }
    });
    setDetailList(newList);
  };
  const renderDetail = () => {
    if (!detailList) {
      return false;
    }
    return detailList.find((el) => {
      if (el.detail === nowDtlCnt) {
        return el;
      }
    });
  };
  const changeSence = (value) => {
    if (value === 0) {
      if (nowDtlCnt - 1 >= 0) {
        setNowDtlCnt(nowDtlCnt - 1);
      } else {
        if (nowIndex - 1 >= 0) {
          setNowIndex(nowIndex - 1);
        } else {
          //첫 페이지인경우
          dispatch(openModal(msg_firstPage));
        }
      }
    } else {
      if (nowDtlCnt + 1 <= detailList.length - 1) {
        setNowDtlCnt(nowDtlCnt + 1);
      } else {
        if (nowIndex + 1 < tutorialHeadList.length) {
          setNowIndex(nowIndex + 1);
        } else {
          //마지막 페이지인경우
          dispatch(openModal(msg_lastPage));
        }
      }
    }
  };
  const detailMap = renderDetail();
  return (
    <div className="Base_container">
      <div className="Tutorial_Header"></div>
      <div className="Tutorial_Container ">
        <motion.div
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          exit={{ x: -500 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
          className="Tutorial_Left scrollBar"
        >
          {renderHeader()}
        </motion.div>
        <motion.div
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
          className="Tutorial_Right sort1"
        >
          <div className="Tutorial_Right_ImgBox">
            {detailList && (
              <img
                className="img"
                style={{ border: "1px solid white", boxSizing: "border-box" }}
                src={`/Tutorial/${nowIndex}/${nowDtlCnt}.png`}
                alt="없음"
              />
            )}
          </div>
          <div className="Tutorial_Right_BottomBox font25">
            <div className="Tutorial_Right_BottomBox_left"> {detailMap && detailMap.contents}</div>{" "}
            <div className="Tutorial_Right_BottomBox_right">
              <button
                style={{ color: "white", backgroundColor: "purple" }}
                onClick={() => {
                  changeSence(0);
                }}
              >
                이전
              </button>
              <button
                style={{ color: "white", backgroundColor: "purple" }}
                onClick={() => {
                  changeSence(1);
                }}
              >
                다음
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
