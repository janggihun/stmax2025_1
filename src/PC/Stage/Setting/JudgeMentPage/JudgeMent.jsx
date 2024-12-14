import { useEffect, useRef, useState } from "react";
import "./JudgeMent.css";
import { useSelector } from "react-redux";
import { fnData, saveData, sound1, sound2 } from "../../../../common/Base";

export const JudgeMent = (props) => {
  const player = useSelector((state) => state.player.value);
  //모달창
  const [audio1, setAduio1] = useState();
  const [audio2, setAduio2] = useState();
  const tickerInterval = useRef();
  const [helpIntList, setHelpIntList] = useState();

  const [startFlag, setStartFlag] = useState();
  const [noteStartFlag, setNoteStartFlag] = useState();
  const note = useRef();
  const realHelpIntList = useRef([]);

  //초기화 필요
  //현재 인덱스
  const nowIndex = useRef(0);

  //현재 시간 인덱스
  const nowTimeIndex = useRef(0);
  //시작시간
  const startTime = useRef();
  //누른시간
  const pushTime = useRef();
  useEffect(() => {
    const stopPlayer = async () => {
      return new Promise((resolve) => {
        if (player) {
          player.pauseVideo();
        } else {
          setTimeout(() => {
            console.log("실행");
            resolve(stopPlayer());
          }, 100);
        }
      });
    };
    const startPlayer = async () => {
      return new Promise((resolve) => {
        if (player) {
          player.playVideo();
        } else {
          setTimeout(() => {
            resolve(startPlayer());
          }, 100);
        }
      });
    };
    stopPlayer();
    return () => {
      startPlayer();
    };
  }, []);
  useEffect(() => {
    if (noteStartFlag === 1) {
      //초기화
      startSound();
    }
  }, [noteStartFlag]);
  useEffect(() => {
    setAduio1(new Audio(sound1));
    setAduio2(new Audio(sound2));
    nowTimeIndex.current = 0;
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", pushKey);
    return () => {
      document.removeEventListener("keydown", pushKey);
      clearInterval(tickerInterval.current);
    };
  }, []);
  const calTime = () => {
    const pushTime = Date.now();
    const deltime = pushTime - startTime.current;

    const returnValue = 1000 - (nowTimeIndex.current * 1000 - deltime);
    //0.5초 보다 작은값만 리턴
    if (returnValue < 500) {
      return returnValue;
    } else {
      return returnValue - 1000;
    }
  };
  const cal_helpIntList = () => {
    if (helpIntList.length !== 0) {
      let sum = 0;
      helpIntList.forEach((el) => {
        sum += el;
      });

      const average = parseInt(sum / helpIntList.length);

      return average;
    }
  };
  const startSound = () => {
    //시작타임 설정

    startTime.current = Date.now();

    tickerInterval.current = setInterval(() => {
      const userAudioOffset = fnData("userAudioOffset");
      const diffTime = Date.now() - startTime.current;

      const distance = (nowIndex.current * 1000 - diffTime + userAudioOffset) / 10;

      note.current.style.bottom = distance + "%";

      //
      if (diffTime > 1000 * nowTimeIndex.current) {
        nowTimeIndex.current++;
        pushTime.current = diffTime;
        audio1.play();
      }
      //노트 맞추기
      if (distance < 0) {
        nowIndex.current++;
      }
    }, 1);
  };
  const pushKey = (e) => {
    //스페이스를 눌렀을때
    if (e.keyCode === 32) {
      const returnValue = calTime();
      if (realHelpIntList.current.length > 10) {
        clearInterval(tickerInterval.current);
      } else if (returnValue) {
        realHelpIntList.current.push(returnValue);
        setHelpIntList([...realHelpIntList.current]);
      }
    }
  };

  const noteOffsetChange = (value) => {
    if (value !== "" && !isNaN(value)) {
      saveData("userAudioOffset", parseInt(value));
    }
  };
  const saveHelpInt = () => {
    const average = cal_helpIntList();
    if (average) {
      saveData("helpInt", parseInt(average));
      alert("적용완료, 화면을 나가면 적용이 확인됩니다.");
    }
  };
  return (
    <div className="JudgeMent_Container">
      <div
        className="judgeMent_bg"
        onClick={() => {
          props.setJudgeModalFlag(false);
        }}
      ></div>
      <div className="judgeMent_contents">
        <div className="judgeMent_contents_header">시작버튼을 눌러 싱크를 조절해주세요</div>
        <div className="judgeMent_contents_btn">
          <button
            style={{ width: "200px", height: "50px" }}
            onClick={() => {
              setNoteStartFlag(1);
            }}
          >
            시작하기
          </button>
        </div>
        <div className="judgeMent_contents_render">
          <div className="judgeMent_contents_render_L">
            {noteStartFlag && (
              <>
                <div className="judgeMent_contents_render_info">
                  소리에 맞춰서 <font color={"red"}>스페이스</font>를 눌러주세요<br></br>
                </div>
                <div className="judgeMent_contents_push1">
                  <div className="judgeMent_contents_List ">
                    {helpIntList &&
                      helpIntList.map((el) => {
                        return <div>{el}</div>;
                      })}
                  </div>
                  {helpIntList && (
                    <>
                      <div style={{ fontSize: "25px" }}>
                        판정 세밀 평균 값 :
                        {helpIntList.length !== 0 && (
                          <font color={"skyblue"}>{cal_helpIntList() + "ms"}</font>
                        )}
                      </div>
                      <button
                        className="judgeMent_btn"
                        onClick={() => {
                          saveHelpInt();
                        }}
                      >
                        적용하기
                      </button>
                    </>
                  )}
                </div>
                <div className="judgeMent_contents_btnBox">
                  <div>노트 타이밍 수치 입력</div>
                  <input
                    className="judgeMent_contents_inputBox"
                    placeholder={`노트 출력 타이밍 값을 넣어주세요(자동저장) 현재 값: ${
                      fnData("userAudioOffset") + "ms"
                    }`}
                    onChange={(e) => {
                      noteOffsetChange(e.target.value);
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <div className="judgeMent_contents_render_R">
            <div className="judgeMent_contents_render_judgeMentLine"></div>

            <div className="judgeMent_contents_render_line">
              <div className="judgeMent_contents_render_line_note" ref={note}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
