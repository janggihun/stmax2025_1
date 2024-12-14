import "./Setting_7.css";
import "../../../style/Tooltip.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { JudgeMent } from "./JudgeMentPage/JudgeMent";

import { useSelector } from "react-redux";
import { fnData, setting_MessageList } from "../../../common/Base";
import { keyCordMapping } from "../../../common/Array";

// check_KEY();
// check_SelectMap();
export const Setting_7key = (props) => {
  const keyType = fnData("keyType");
  const player = useSelector((state) => state.player.value);
  const [judgeModalFlag, setJudgeModalFlag] = useState(false);
  const [nowKeyIndex, setNowKeyIndex] = useState();
  const [keyChangeMessageIndex, setKeyChangeMessageIndex] = useState();
  const [selectList, setSelectList] = useState(
    JSON.parse(window.localStorage.getItem("selectList"))
  );
  //화면이 열릴때 단축키 등록이 시작되고 화면이 종료되면 사라짐
  useEffect(() => {
    // const pressKeyBoard = (e) => {
    //   const result = e.code;
    //   if (result === "KeyM") {
    //     //음소거 메소드 시작
    //     clickSoundOnOff();
    //   }
    // };
    // document.addEventListener("keydown", pressKeyBoard);
    // return () => {
    //   document.removeEventListener("keydown", pressKeyBoard);
    // };
  });

  //키 변경시 나오는 문구 리스트
  const keyChangeMessageList = setting_MessageList();

  /*
   *리스트에서 해상 설정 찾아서 값 넣어주기
   *매개변수 : 설정이름, 설정데이터
   *localstorage에 저장하기
   *리렌더링 강제로 시켜주기
   *리턴 불린
  
  *[fps, speed, isYoutube,helpInt , userAudioOffset, audioVolume,eventVolume , effectVolume, soundOnOff, level, gamePosition,opacity , headerImg]
   */
  const saveData = (settingName, data) => {
    const returnIndex = selectList.findIndex((el) => {
      if (el[0] === settingName) {
        return true;
      }
    });
    if (returnIndex === -1) {
      alert("설정 데이터 혹은 설정데이터 이름이 잘못되어 있습니다. 관리자에게 문의해주세요");
      return false;
    } else {
      selectList[returnIndex] = [settingName, data];

      window.localStorage.setItem("selectList", JSON.stringify(selectList));

      setSelectList([...selectList]);

      return true;
    }
  };
  const changeHelpInt = (e) => {
    saveData("helpInt", parseFloat(e.target.value));
  };
  const clickHelpIntDetail = (cnt) => {
    saveData("helpInt", fnData("helpInt") + cnt);
  };
  const changeuserAudioOffset = (e) => {
    const value = parseFloat(e.target.value);
    saveData("userAudioOffset", value);
  };
  const clickNoteOffsetDetail = (cnt) => {
    saveData("userAudioOffset", fnData("userAudioOffset") + cnt);
  };
  const changeSpeed = (e) => {
    const value = parseFloat(e.target.value);
    saveData("speed", value);
  };
  const changeOpacity = (e) => {
    const value = parseFloat(e.target.value);
    saveData("opacity", value);
  };
  const changePannelPos = (e) => {
    const value = e.target.value;
    saveData("gamePosition", value);
  };
  const changeAudioVolume = (e) => {
    const value = parseFloat(e.target.value);
    saveData("audioVolume", value);

    if (player) {
      if (!fnData("soundOnOff")) {
        player.setVolume(fnData("audioVolume") * 100);
      } else {
        player.setVolume(fnData("audioVolume") * 0);
      }
    }
  };
  // const changeAudioVolume = (e) => {
  //   const value = parseFloat(e.target.value);
  //   saveData("audioVolume", value);

  //   //로딩중 음소거인경우 소리 0세팅
  //   if (!fnData("soundOnOff")) {
  //     audio.current.volume = fnData("audioVolume");
  //     // e.target.setVolume(fnData("audioVolume") * 100);
  //   } else {
  //     audio.current.volume = 0;
  //     // e.target.setVolume(fnData("audioVolume") * 0);
  //   }
  // };

  const clickSoundOnOff = () => {
    const value = fnData("soundOnOff");
    saveData("soundOnOff", !value);
    //로딩중 음소거인경우 소리 0세팅
    if (!fnData("soundOnOff")) {
      // audio.current.volume = fnData("audioVolume");
      player.setVolume(fnData("audioVolume") * 100);
    } else {
      // audio.current.volume = 0;
      player.setVolume(fnData("audioVolume") * 0);
    }
  };
  const changeIsYoutube = () => {
    const isYoutube = fnData("isYoutube");
    saveData("isYoutube", !isYoutube);
  };

  /**
   *키가 내부에 저장되어진 키인지 확인
   */
  const findAscCode = (keyCord) => {
    const returnValue = keyCordMapping.find((el) => {
      if (el[0] === keyCord) {
        return true;
      }
    });
    return returnValue;
  };
  //키 변경 로직
  useEffect(() => {
    if (keyChangeMessageIndex === 0) {
      //초기시작단계
      setNowKeyIndex("");
    } else if (keyChangeMessageIndex === 1) {
      //키 누름
      document.addEventListener("keydown", fnNumberKey);
    }
  });

  const keyChange7 = (number) => {
    if (number !== nowKeyIndex) {
      document.removeEventListener("keydown", fnNumberKey);
    }
    setKeyChangeMessageIndex(1);
    setNowKeyIndex(number);
  };
  const fnNumberKey = (e) => {
    const result = e.code;
    //esc누른경우

    if (result === "Escape") {
      setNowKeyIndex("");
      setKeyChangeMessageIndex(0);
      document.removeEventListener("keydown", fnNumberKey);
      return false;
    }

    const tempKeyCord = findAscCode(result);

    if (!tempKeyCord) {
      //내부 게임에서 사용하는 키와 맵핑되는 키가 없음
      //종료시작
      setKeyChangeMessageIndex(2);
      //초기 모드로 변경
      setTimeout(() => {
        setKeyChangeMessageIndex(0);
        setNowKeyIndex("");
      }, 500);
      document.removeEventListener("keydown", fnNumberKey);
      return false;
    }

    //중복 검사 시작
    const keyList_7 = JSON.parse(window.localStorage.getItem("7keyList"));
    const key0 = keyList_7[0];
    const key1 = keyList_7[1];
    const key2 = keyList_7[2];
    const key3 = keyList_7[3];
    const key4 = keyList_7[4];
    const key5 = keyList_7[5];
    const key6 = keyList_7[6];

    if (
      key1 !== tempKeyCord[1] &&
      key2 !== tempKeyCord[1] &&
      key3 !== tempKeyCord[1] &&
      key0 !== tempKeyCord[1] &&
      key4 !== tempKeyCord[1] &&
      key5 !== tempKeyCord[1] &&
      key6 !== tempKeyCord[1]
    ) {
      //변경시작
      keyList_7[nowKeyIndex] = tempKeyCord[1];
      window.localStorage.setItem(`7keyList`, JSON.stringify(keyList_7));
      //종료시작
      setNowKeyIndex("");
      setKeyChangeMessageIndex(4);
      //초기 모드로 변경
      setTimeout(() => {
        setKeyChangeMessageIndex(0);
      }, 500);
      document.removeEventListener("keydown", fnNumberKey);
      return false;
    } else {
      //중복인경우
      //종료시작
      setKeyChangeMessageIndex(3);
      //초기 모드로 변경
      setTimeout(() => {
        setKeyChangeMessageIndex(0);
        setNowKeyIndex("");
      }, 500);
      document.removeEventListener("keydown", fnNumberKey);
      return false;
    }
  };
  const changeKorKeyLiset = (i) => {
    const tempList = JSON.parse(window.localStorage.getItem("7keyList"));
    const nowTarget = tempList[i];

    const returnValue = keyCordMapping.find((e_el) => {
      if (e_el[1] === nowTarget) {
        return true;
      }
    });
    //화면에 보이기 위해 필요없는 글자 변환
    let keyName = returnValue[0].replace("Key", "").replace("Numpad", "");
    if (keyName === "Decimal") {
      keyName = ".";
    } else if (keyName === "Add") {
      keyName = "+";
    } else if (keyName === "Subtract") {
      keyName = "-";
    } else if (keyName === "Multiply") {
      keyName = "*";
    } else if (keyName === "Divide") {
      keyName = "/";
    }

    return keyName;
  };

  //클릭시 메인으로 이동
  const clickBackMain = () => {
    props.setPage(0);
  };

  //판정 자동 맞추기 시작시 모달 열리면 뮤직 정지, 모달꺼지면 뮤직 시작

  // 모달창 켜기
  const clickJudge = () => {
    setJudgeModalFlag(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ShowSetting_Container"
    >
      <>
        <div className="ShowSetting_Top_blank"></div>
        <div className="ShowSetting_Box">
          <div className="ShowSetting_Box_Left">
            <div className="ShowSetting_Box_Top"> 게임설정</div>
            <div className="ShowSetting_Box_Bottom">
              <div className="ShowSetting_Box_Detail">
                <div className="ShowSetting_Box_Detail_Row">
                  <div className="ShowSetting_Box_Str"> 판정 세밀 조절 : </div>
                  <div className="ShowSetting_Box_Place">
                    <div
                      className="ShowSetting_Arrow"
                      tooltip="초록바가 왼쪽에 꽂히는 경우(빠름)"
                      onClick={() => {
                        clickHelpIntDetail(-1);
                      }}
                    >
                      &lt;&lt;
                    </div>
                    <div>{fnData("helpInt")}ms</div>
                    <div
                      className="ShowSetting_Arrow"
                      tooltip="초록바가 오른쪽에 꽂히는 경우(느림)"
                      onClick={() => {
                        clickHelpIntDetail(1);
                      }}
                    >
                      &gt; &gt;
                    </div>
                  </div>
                  <div className="ShowSetting_Bar">
                    <input
                      type="range"
                      className="Setting_Range"
                      draggableTrack
                      step={1}
                      min={-1000}
                      max={1000}
                      value={fnData("helpInt")}
                      onChange={changeHelpInt}
                    />
                  </div>
                  <div className="Setting_Btn">
                    {player && player.videoTitle !== "" && (
                      <button
                        style={{
                          fontSize: "15px",
                          width: "200px",
                          height: "40px",
                          backgroundColor: "white",
                        }}
                        onClick={() => {
                          clickJudge();
                        }}
                      >
                        자동 맞추기
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="ShowSetting_Box_Detail">
                <div className="ShowSetting_Box_Detail_Row">
                  <div className="ShowSetting_Box_Str">오디오 출력 타이밍 조절 : </div>
                  <div className="ShowSetting_Box_Place">
                    <div
                      className="ShowSetting_Arrow"
                      tooltip=" 노트를 아래로 내립니다. (판정 상관 없음)"
                      onClick={() => {
                        clickNoteOffsetDetail(-1);
                      }}
                    >
                      &lt;&lt;
                    </div>
                    <div>{fnData("userAudioOffset")}ms</div>
                    <div
                      className="ShowSetting_Arrow"
                      tooltip="  노트를 위로 올립니다.(판정 상관 없음)"
                      onClick={() => {
                        clickNoteOffsetDetail(1);
                      }}
                    >
                      &gt; &gt;
                    </div>
                  </div>
                  <div className="ShowSetting_Bar">
                    <input
                      type="range"
                      className="Setting_Range"
                      draggableTrack
                      step={1}
                      min={-1000}
                      max={1000}
                      value={fnData("userAudioOffset")}
                      onChange={changeuserAudioOffset}
                    />
                  </div>
                  <div className="Setting_Btn">
                    {player && player.videoTitle !== "" && (
                      <button
                        style={{
                          fontSize: "15px",
                          width: "200px",
                          height: "40px",
                          backgroundColor: "white",
                        }}
                        onClick={() => {
                          clickJudge();
                        }}
                      >
                        자동 맞추기
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="ShowSetting_Box_Detail">
                <div className="ShowSetting_Box_Detail_Row">
                  <div className="ShowSetting_Box_Str">속도 조절 : </div>
                  <div className="ShowSetting_Box_Place">
                    <div>x{fnData("speed")}</div>
                  </div>
                  <div className="ShowSetting_Bar">
                    <input
                      type="range"
                      className="Setting_Range"
                      draggableTrack
                      step={0.1}
                      min={0.5}
                      max={2}
                      value={fnData("speed")}
                      onChange={changeSpeed}
                    />
                  </div>
                </div>
              </div>

              <div className="ShowSetting_Box_Detail">
                <div className="ShowSetting_Box_Detail_Row">
                  <div className="ShowSetting_Box_Str">인게임 밝기 조절 : </div>
                  <div className="ShowSetting_Box_Place">
                    <div>{Math.round(100 - fnData("opacity") * 100)}% </div>
                  </div>
                  <div className="ShowSetting_Bar">
                    <input
                      type="range"
                      className="Setting_Range"
                      draggableTrack
                      step={0.1}
                      min={0}
                      max={1}
                      value={fnData("opacity")}
                      onChange={changeOpacity}
                    />
                  </div>
                </div>
              </div>

              <div className="ShowSetting_Box_Detail">
                <div className="ShowSetting_Box_Detail_Row">
                  <div className="ShowSetting_Box_Str">게임기 패널 위치 : </div>
                  <div className="ShowSetting_Box_Place">
                    <div>{fnData("gamePosition")} </div>
                  </div>
                  <div className="ShowSetting_Bar">
                    <select
                      className="Setting_SelectBox"
                      name="langage"
                      onChange={changePannelPos} //값이 바뀌면 setState되게
                      value={fnData("gamePosition")}
                    >
                      <option value="Left">왼쪽</option>
                      <option value="Middle">가운데</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="ShowSetting_Box_Detail">
                <div className="ShowSetting_Box_Detail_Row">
                  <div className="ShowSetting_Box_Str">백그라운드 재생 : </div>
                  <div className="ShowSetting_Box_Place">
                    <div>{fnData("isYoutube") ? "On" : "Off"} </div>
                  </div>
                  <div className="ShowSetting_Bar">
                    <select
                      className="Setting_SelectBox"
                      name="langage"
                      onChange={changeIsYoutube} //값이 바뀌면 setState되게
                      value={fnData("isYoutube")}
                    >
                      <option value={true}>On</option>
                      <option value={false}>Off</option>
                    </select>
                  </div>
                </div>
              </div>
              {}
            </div>
          </div>

          <div className="ShowSetting_Box_Right">
            <div className="ShowSetting_Box_Right_Top">
              <div className="ShowSetting_Box_Top">오디오설정</div>
              <div className="ShowSetting_Box_Bottom">
                <div className="ShowSetting_Box_Detail">
                  <div className="ShowSetting_Box_Detail_Row">
                    <div className="ShowSetting_Box_Str">사운드 : </div>
                    <div className="ShowSetting_Box_Place">
                      <div>{fnData("audioVolume")} volume</div>
                    </div>
                    <div>음소거[M]</div>
                    <div></div>
                    <div className="ShowSetting_Bar">
                      <input
                        type="range"
                        className="Setting_Range"
                        draggableTrack
                        step={0.001}
                        min={0}
                        max={1}
                        value={fnData("audioVolume")}
                        onChange={changeAudioVolume}
                      />
                    </div>
                  </div>
                </div>
                {}
              </div>
            </div>
            <div className="ShowSetting_Box_Right_Bottom">
              <div className="ShowSetting_Box_Top">7키 설정</div>
              <div className="ShowSetting_Box_Bottom_for_key">
                {[...Array(7)].map((el, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        keyChange7(i);
                      }}
                      className="ShowSetting_Box_Detail_keySetting"
                      style={
                        nowKeyIndex === i && keyChangeMessageIndex === 1
                          ? { backgroundColor: "pink" }
                          : { "": "" }
                      }
                    >
                      {changeKorKeyLiset(i)}
                    </div>
                  );
                })}
              </div>
              <div className="ShowSetting_Box_Bottom_return_comment">
                {keyChangeMessageList[keyChangeMessageIndex]}
              </div>
            </div>
          </div>
        </div>
        {judgeModalFlag && player && <JudgeMent setJudgeModalFlag={setJudgeModalFlag} />}
      </>
    </motion.div>
  );
};
