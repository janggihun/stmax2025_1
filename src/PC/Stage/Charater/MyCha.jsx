import { useEffect, useState } from "react";
import "./MyCha.css";

import { fnData, get_Src_Img, saveData } from "../../../common/Base";
import { logicTitle, saveHeaderImg } from "../../../RestApi";
import { StelliveList } from "../../../common/Array";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "../../../Store/LoadingSlice";
export const MyCha = () => {
  const dispatch = useDispatch();
  const [selectCha, setSelectCha] = useState();

  useEffect(() => {
    const cha = fnData("emoticon");
    setSelectCha(cha);
  }, []);
  //캐릭터 클릭시
  const clickCha = (egName) => {
    setSelectCha(egName);
  };
  //한국이름 찾기
  const fnKor = () => {
    return StelliveList.find((el) => {
      if (el.eng === selectCha) {
        return true;
      }
    }).singer;
  };

  //캐릭터 적용
  const applyChar = async () => {
    dispatch(openLoading());
    const userId = window.localStorage.getItem("userId");
    // console.log(selectCha);
    if (selectCha === "kanna") {
      //프로필 칸나로 설정 경험자
      logicTitle(15);
    } else if (selectCha === "yuni") {
      logicTitle(21);
    } else if (selectCha === "lize") {
      logicTitle(33);
    } else if (selectCha === "hina") {
    } else if (selectCha === "mashiro") {
      logicTitle(75);
    } else if (selectCha === "tabi") {
      logicTitle(77);
    } else if (selectCha === "shibuki") {
    } else if (selectCha === "riko") {
    } else if (selectCha === "rin") {
    } else if (selectCha === "nana") {
    }
    const result = await saveHeaderImg({ userId: userId, emoticon: selectCha });
    if (result === 1) {
      //변경성공
      saveData("emoticon", selectCha);

      alert("변경완료, 랭킹에는 5 ~ 10초 반영시간이 걸립니다.");
      window.location.reload();
      dispatch(closeLoading());
    } else {
      //변경실패
      dispatch(closeLoading());
    }
  };

  return (
    <>
      {selectCha && (
        <div className="Base_container">
          <div className="MyPage2_Header"></div>
          <div className="MyPage2_Container">
            <div className="MyPage2_blank"></div>
            <motion.div
              className="MyPage2_L"
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
              <div>
                <img className="img" src={get_Src_Img(selectCha)} />
                <div className="sort MyPage2_charName">
                  <div className="sort">{fnKor()}</div>
                </div>
                <div className="MyPage2_btn_box sort">
                  <button
                    style={{ color: "white" }}
                    className="MyPage2_btn"
                    onClick={() => {
                      applyChar();
                    }}
                  >
                    랭킹 캐릭터 적용
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="MyPage2_R"
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: 500 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="MyPage2_R_row">
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("gangzi");
                  }}
                >
                  <img
                    className={selectCha === "gangzi" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("gangzi")}
                  />
                </div>
                <div className="MyPage2_R_row_Box1"></div>
                <div className="MyPage2_R_row_Box1"></div>
                <div className="MyPage2_R_row_Box1"></div>
              </div>
              <div className="MyPage2_R_row">
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("kanna");
                  }}
                >
                  <img
                    className={selectCha === "kanna" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("kanna")}
                  />
                </div>
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("yuni");
                  }}
                >
                  <img
                    className={selectCha === "yuni" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("yuni")}
                  />
                </div>
                <div className="MyPage2_R_row_Box1"></div>
                <div className="MyPage2_R_row_Box1"></div>
              </div>
              <div className="MyPage2_R_row">
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("lize");
                  }}
                >
                  <img
                    className={selectCha === "lize" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("lize")}
                  />
                </div>
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("hina");
                  }}
                >
                  <img
                    className={selectCha === "hina" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("hina")}
                  />
                </div>
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("mashiro");
                  }}
                >
                  <img
                    className={selectCha === "mashiro" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("mashiro")}
                  />
                </div>
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("tabi");
                  }}
                >
                  <img
                    className={selectCha === "tabi" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("tabi")}
                  />
                </div>
              </div>
              <div className="MyPage2_R_row">
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("shibuki");
                  }}
                >
                  <img
                    className={selectCha === "shibuki" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("shibuki")}
                  />
                </div>
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("riko");
                  }}
                >
                  <img
                    className={selectCha === "riko" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("riko")}
                  />
                </div>
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("rin");
                  }}
                >
                  <img
                    className={selectCha === "rin" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("rin")}
                  />
                </div>
                <div
                  className="MyPage2_R_row_Box"
                  onClick={() => {
                    clickCha("nana");
                  }}
                >
                  <img
                    className={selectCha === "nana" ? "img " : "img MyPage2_gray"}
                    src={get_Src_Img("nana")}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};
