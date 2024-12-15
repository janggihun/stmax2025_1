import "./MyTitle.css";
import "../../../style/Scroll.css";
import { useEffect, useState } from "react";
import { useLoading } from "../../../UseHook/Loading/Loading";
import { getMyTitle, getTitle, logicTitle, setMyTitle, testlogicTitle } from "../../../RestApi";
import { StelliveList } from "../../../common/Array";
import { get_Src_Img } from "../../../common/Base";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "../../../Store/LoadingSlice";
export const MyTitle = () => {
  //초기 임포트
  const dispatch = useDispatch();

  //초기 변수값
  const [data, setData] = useState();
  const [titleList, setTitleList] = useState();
  const [nowMember, setNowMember] = useState();
  const [titleMap, setTitleMap] = useState();
  const [mouseOver, setMouseOver] = useState(false);
  const [myTitleMap, setMyTitleMap] = useState();
  const [applyMap, setApplyMap] = useState();
  const [titleResultList, setTitleResult] = useState();

  //타이틀 리턴값을 저장

  // const [mouseOut, setMouseOut] = useState(true);

  const userId = window.localStorage.getItem("userId");
  const applyStart = async () => {
    if (!applyMap) {
      alert("원하는 타이틀을 눌른후에 적용버튼을 눌러주세요");
      return false;
    }
    if (applyMap && applyMap.result) {
      const res = await setMyTitle(applyMap);
      if (res === 1) {
        alert("변경완료");
      } else {
        alert("변경실패");
      }
    } else {
      alert("조건달성을 하지 못했습니다.");
    }
  };

  //로직 체크
  const checkLogic = async () => {
    //테스트코드
    // testlogicTitle(10);
  };

  const fnResult = () => {
    if (titleMap && titleResultList && titleResultList.length !== 0) {
      const res = titleResultList.find((el, i) => {
        if (titleResultList[i].titleCnt === titleMap.titleCnt) {
          return true;
        }
      });

      if (res) {
        return res.result;
      } else {
        return "준비중입니다.";
      }
    }
  };

  useEffect(() => {
    dispatch(openLoading());
    const getInit = async () => {
      const userId = window.localStorage.getItem("userId");
      //타이틀 로직체크

      // const data = await testlogicTitle(110);

      const checkList = [1, 12, 24, 50, 7, 6, 67, 10, 91, 100, 110, 122];
      const templist = [];

      for (let el of checkList) {
        const res = await logicTitle(el);

        if (!res.res) {
          res.res = "준비중";
        }

        templist.push({ titleCnt: el, result: res.res });
      }

      const resTitle = await getTitle();
      const resMyTitle = await getMyTitle(userId);

      setTitleResult([...templist]);
      setData(resTitle);
      setNowMember(resTitle[0]);
      setMyTitleMap(resMyTitle);
      //전체 타이틀 획득 로직타기

      dispatch(closeLoading());
    };
    getInit();
  }, []);

  useEffect(() => {
    changeTitleList();
    setApplyMap();
  }, [nowMember]);
  //멤버별 타이틀 리스트 찾기
  const changeTitleList = () => {
    if (data) {
      //list찾기
      const tempList = data.filter((el) => {
        if (el.StelliveCnt === nowMember.StelliveCnt && el.apply === 1) {
          return el;
        }
      });
      setTitleList(tempList);
      setTitleMap(tempList[0]);
    }
  };
  //왼쪽 멤버 렌더
  const RenderMember = () => {
    if (!nowMember) {
      return false;
    }
    const clickMember = (el) => {
      setNowMember(el);
    };
    return StelliveList.map((el) => {
      // if (el.singer === "전체") {
      //   return false;
      // }
      return (
        <div className="Title_stelliveMemberBox_Row">
          <div
            className={
              nowMember.StelliveCnt === el.StelliveCnt
                ? "Title_stelliveMemberBox_click"
                : "Title_stelliveMemberBox"
            }
            onClick={() => {
              clickMember(el);
            }}
          >
            <div className="Title_stelliveMemberBox_Img">
              <img src={get_Src_Img(el.eng)} className="img" />
            </div>
            <div className="Title_stelliveMemberBox_Singer"> {el.singer}</div>
          </div>
        </div>
      );
    });
  };
  const renderTitle = () => {
    //타이틀 클릭시 내용 저장
    const clickTitle = async (map, bool) => {
      setTitleMap(map);
      setApplyMap({ titleCnt: map.titleCnt, result: bool, userId: userId });
    };
    const divide = 5;
    const marginCnt = 3;
    //divide변경시 marginLeft도 변경해야 함

    const fnTitleResult = (req) => {
      let returnValue = false;

      for (const [key, value] of Object.entries(myTitleMap)) {
        if (key === "t" + req.titleCnt) {
          if (value === "Y") {
            returnValue = true;
          }
        }
      }

      return returnValue;
    };

    //로직시작
    // Y : "Title_TitleBox_Row_detail_apply" , N : "Title_TitleBox_Row_detail_notApply"

    let columnIndex = 0;
    if (titleList) {
      return titleList.map((el, i) => {
        const makeDiv = () => {
          return titleList.map((el_t, i) => {
            if (divide * (columnIndex - 1) <= i && i < divide * columnIndex) {
              return (
                <div
                  style={
                    el_t.titleCnt === titleMap.titleCnt && applyMap
                      ? { border: "3px solid yellow" }
                      : {}
                  }
                  className={
                    !fnTitleResult(el_t)
                      ? "Title_TitleBox_Row_detail_notApply"
                      : "Title_TitleBox_Row_detail_apply"
                  }
                  onClick={() => {
                    clickTitle(el_t, fnTitleResult(el_t));
                  }}
                >
                  <div style={el_t.color ? { color: el_t.color } : {}}>
                    {el_t.condition ? el_t.titleName : "???"}
                  </div>
                </div>
              );
            }
          });
        };

        if (i % divide === 0) {
          columnIndex++;
          return <div className="Title_TitleBox_Row">{makeDiv()}</div>;
        }
      });
    }
  };

  return (
    <div className="Base_container">
      <div className="Title_Container">
        <div className="Tittle_Header"></div>
        <div className="Title_Box">
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            className="Title_Box_L scrollBar"
          >
            {RenderMember()}
          </motion.div>
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            className="Title_Box_R"
          >
            <div className="Title_Box_R_T_H ">
              <div className="Title_Box_R_T_Header">
                최신 업데이트 날짜 : {myTitleMap && myTitleMap.updateDate}
              </div>
            </div>
            <div className="Title_Box_R_T scrollBar"> {myTitleMap && renderTitle()}</div>
            <div className="Title_Box_R_B ">
              <div className="Title_Box_R_B_L">
                <div className="Title_Box_R_B_L_condition1">
                  {titleMap && titleMap.condition && applyMap
                    ? titleMap.condition
                    : "타이틀을 골라주세요"}
                  <div className="Title_Box_R_B_L_condition3">{"tip : " + fnResult()}</div>
                </div>
                {/* <div className="Title_Box_R_B_L_condition2"></div> */}
              </div>
              <div className="Title_Box_R_B_R">
                {applyMap && applyMap.result ? (
                  <button
                    style={{ width: "300px", height: "100px" }}
                    className="btn"
                    onClick={() => {
                      applyStart();
                    }}
                  >
                    타이틀 적용하기
                  </button>
                ) : (
                  <button
                    className="btnDisabled"
                    disabled="disabled"
                    style={{ width: "300px", height: "100px" }}
                  >
                    타이틀 적용 불가(달성조건 확인)
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
