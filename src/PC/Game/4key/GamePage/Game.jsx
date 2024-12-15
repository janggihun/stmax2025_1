import React, { useEffect, useRef, useState } from "react";
import "./Game4key.css";
import "./../../GameCssCommon/Note.css";
import { NoteReadManager } from "../../GameJsCommon/NoteReadManager.js";
import { createLiveMap } from "../../GameJsCommon/LiveMapInit.js";
import { useLocation, useNavigate } from "react-router-dom";
import { endGameSuccess, fnData, makeDailyData, sound3 } from "../../../../common/Base.js";
import { EscModal } from "../../EscModal/EscModal.jsx";
import { useGameYoutube } from "../../GameComponentCommon/useGameYoutube.jsx";
import { GameLoadingView } from "../../GameComponentCommon/GameLoadingView.jsx";
import { GameEndNotice } from "../../GameComponentCommon/GameEndNotice.jsx";
import { AnimatePresence } from "framer-motion";
import { GameStation4 } from "./GameStation4.jsx";
import { useDispatch, useSelector } from "react-redux";
import { changeGameSet } from "../../../../Store/GameSetSlice.jsx";

//

export const Game_4key = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //youtubue 커스텀 훅

  const { renderGameYoutube, player, youtubeStart } = useGameYoutube(location.state.musicMap);

  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  //esc모달 트리거
  const [isEscModal, setIsEscModal] = useState(false);

  const audio1 = useRef();
  const effectVolume = useRef(fnData("effectVol"));
  //키확인

  const duration = useRef(0);
  const Game_EndCommenBox = useRef();
  const silenceDuration = 3; // 무음

  const startTime = useRef(0);
  const tickerInterval = useRef(false);

  const saveFlag = useRef(true);
  const setTime = useRef(false);

  // 진행도 표시
  const [progressCnt, setProgressCnt] = useState(0);

  // 0 : 준비중 , 1 : 게임중 , 2: 게임종료(완주) 3 : 게임 완주실패
  const gameSet = useSelector((state) => state.gameSet.value);
  const liveMap = useRef(createLiveMap());
  const emoticon = useRef(findEmoticon());
  if (gameSet !== 0 && progressCnt === 0) dispatch(changeGameSet(0));
  useEffect(() => {}, []);

  //이번 프레임 회차에서 필요한 모든 것

  //눌렀을때 소리 나는것

  const audioPlaySound = () => {
    if (!effectVolume.current) {
      return false;
    }

    if (liveMap.current.audioIndex > 19) {
      liveMap.current.audioIndex = 0;
    }
    if (audio1.current) {
      audio1.current[liveMap.current.audioIndex].currentTime = 0.05;
      audio1.current[liveMap.current.audioIndex].play();
      liveMap.current.audioIndex++;
    }
  };

  //

  function findEmoticon() {
    const emoticonList = location.state.Group;

    const e_Lenght = emoticonList.length;

    const randomNum = Math.floor(Math.random() * e_Lenght + 1) - 1;

    return emoticonList[randomNum];
  }

  useEffect(() => {
    // esc 모달창

    nextStep(1);
    return () => {
      clearInterval(tickerInterval.current);
      clearTimeout(setTime.current);
      if (audioContextRef.current) audioContextRef.current.close();

      // player.current = false;
    };
  }, []);

  /*


  ************************   게임시작   ***************************


  */

  //다음단계 이동시 대기시간을 강제로 줌
  function nextStep(cnt) {
    setTimeout(() => {
      setProgressCnt(cnt);
    }, 500);
  }

  useEffect(() => {
    if (progressCnt === 1) {
      //백그라운드 확인
      //데이터 주입
      liveMap.current.Group = location.state.Group;
      liveMap.current.musicMap = location.state.musicMap;
      liveMap.current.musicCnt = location.state.musicMap.musicCnt;
      liveMap.current.userAudioOffset = fnData("userAudioOffset");
      liveMap.current.helpInt = fnData("helpInt");
      liveMap.current.level = fnData("level");
      liveMap.current.speed = fnData("speed");
      liveMap.current.keyType = fnData("keyType");
      liveMap.current.dispatch = dispatch;
      // console.log("Group : ", liveMap.current.Group);
      // console.log("replayMap : ", liveMap.current.replayMap);

      nextStep(2);
    } else if (progressCnt === 2) {
      //키 눌렀을때 소리 모음 리스트
      const tempAudioSoundList = [];
      for (let i = 0; i < 20; i++) {
        tempAudioSoundList.push(new Audio(sound3));
        tempAudioSoundList[i].volume = fnData("audioVolume");
      }
      liveMap.current.audioIndex = 0;

      // 키배열 확인하기 , 주소값 가지고오기, 판정선 풀 취득

      //
      audio1.current = tempAudioSoundList;

      nextStep(3);
    } else if (progressCnt === 3) {
      //노트 읽고 생성

      get_noteList();

      async function get_noteList() {
        const res1 = await NoteReadManager(liveMap.current.musicCnt, liveMap.current.level);

        liveMap.current.timingPointList = res1[0];
        liveMap.current.hitList = res1[1];
        liveMap.current.lastTime = res1[2];
        liveMap.current.version = res1[3];
        liveMap.current.speedList = [];
        liveMap.current.gameList = res1[1].map((el) => {
          return el;
        });
        // console.log(res1[0]);
        res1[0].forEach((el) => {
          if (parseInt(el[1]) > 0) {
            liveMap.current.bpmList.push(el);
          } else {
            const tempList = [];
            //3초 딜레이
            tempList.push(parseFloat(el[0]) + 3000);
            tempList.push(parseFloat(Math.abs(100 / el[1]).toFixed(2)));
            tempList.push(parseFloat(el[2]));
            tempList.push(parseFloat(el[3]));
            liveMap.current.speedList.push(tempList);
          }
        });

        const check_bpmListAndSpeedList = async () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              if (
                res1[0].length ===
                liveMap.current.bpmList.length + liveMap.current.speedList.length
              ) {
                return resolve(1);
              } else {
                return resolve(check_bpmListAndSpeedList());
              }
            }, 500);
          });
        };
        // bpm리스트와 스피드 리스트가 잘 들어갔는지 체크 후 실행하는 메서드
        await check_bpmListAndSpeedList();

        // const checkHeight = (time) => {
        //   let index = 0;
        //   let returnValue = 0;
        //   const speedList = liveMap.current.speedList;
        //   for (let i = 0; i < time; i++) {
        //     if (speedList[index][0] < i && speedList.length > index + 1) {
        //       index++;
        //     }

        //     returnValue += speedList[index - 1] ? speedList[index - 1][1] : speedList[0][1];
        //   }

        //   return returnValue;
        // };

        // liveMap.current.speedGameList = liveMap.current.gameList.map((el) => {
        //   return [el[0], el[1], checkHeight(el[2]), checkHeight(el[3]), el[4], el[5]];
        // });
        // console.log("liveMap.current.speedGameList : ", liveMap.current.speedGameList);

        nextStep(4);
      }
    } else if (progressCnt === 4) {
      // 오디오 생성
      const getAudio = () => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

        const loadAudio = async () => {
          try {
            const response = await fetch(`/4key/${liveMap.current.musicCnt}/audio.mp3`); // public 폴더의 경로로 접근
            const arrayBuffer = await response.arrayBuffer();
            const decodedData = await audioContextRef.current.decodeAudioData(arrayBuffer);

            audioBufferRef.current = decodedData;

            const gainNode = audioContextRef.current.createGain();
            gainNode.gain.value = fnData("audioVolume"); // ** 볼륨 설정
            const extendedBuffer = audioContextRef.current.createBuffer(
              audioBufferRef.current.numberOfChannels,
              audioBufferRef.current.length + audioContextRef.current.sampleRate * silenceDuration,
              audioBufferRef.current.sampleRate
            );

            for (let channel = 0; channel < audioBufferRef.current.numberOfChannels; channel++) {
              let extendedChannelData = extendedBuffer.getChannelData(channel); // ** 긴거(비어있음)
              let originalChannelData = audioBufferRef.current.getChannelData(channel); // ** 짧은거(원본)
              // ** 무음 구간 (앞부분을 0으로 채움)
              for (let i = 0; i < audioContextRef.current.sampleRate * silenceDuration; i++) {
                extendedChannelData[i] = 0;
              }
              // ** 원본 오디오 데이터 복사. 인자값은 (채널 데이터, 오프셋). 묵음 시간 이후로 음원 데이터를 넣는 과정
              extendedChannelData.set(
                originalChannelData,
                audioContextRef.current.sampleRate * silenceDuration
              );
            }

            // ** 원본 버퍼를 갖고 있던 audioBuffer에 묵음 추가한 걸로 갈아낌
            audioBufferRef.current = extendedBuffer;
            // console.log(audioBufferRef.current.duration); // 오디오 재생 시간 (초 단위)

            // 오디오 재생 시간 정수로 변환
            duration.current = Math.floor(audioBufferRef.current.duration);

            // console.log("duration :", duration.current); // 예: 260
            nextStep(5);
          } catch (error) {
            console.error("Error loading audio:", error);
          }
        };

        loadAudio();
      };
      getAudio();
    } else if (progressCnt === 5) {
      // 유튜브 백그라운드 체크

      findPlayer();

      function findPlayer() {
        return new Promise((resolve) => {
          if (fnData("isYoutube")) {
            if (player) {
              nextStep(6);
            } else {
              return setTimeout(() => {
                resolve(findPlayer());
              }, 500);
            }
          } else {
            nextStep(6);
          }
        });
      }
    } else if (progressCnt === 6) {
      function playSound() {
        if (audioBufferRef.current && audioContextRef.current) {
          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBufferRef.current;
          const gainNode = audioContextRef.current.createGain();
          gainNode.gain.value = fnData("audioVolume"); // ** 볼륨 설정

          source.connect(gainNode).connect(audioContextRef.current.destination);
          liveMap.current.audio = source;
          nextStep(7);
        } else {
          setTimeout(() => {
            playSound();
          }, 500);
        }
      }

      playSound();
    } else if (progressCnt === 7) {
      //게임 시작 준비중
      // 이상확인 메서드만들기, 다 준비되어있는지 체크
      nextStep(8);
    } else if (progressCnt === 8) {
    }
  }, [progressCnt]);
  const endgo = () => {
    setTimeout(() => {
      const tmpMap = {
        score: liveMap.current.score,
        stella: liveMap.current.stella,
        perfect: liveMap.current.perfect,
        good: liveMap.current.good,
        bad: liveMap.current.bad,
        miss: liveMap.current.miss,
        combo: liveMap.current.combo,
        maxCombo: liveMap.current.maxCombo,
        musicCnt: liveMap.current.musicCnt,
        level: liveMap.current.level,
        userId: window.localStorage.getItem("userId"),
        speed: liveMap.current.speed,
      };
      navigate("/End", { state: { resultMap: tmpMap, musicMap: liveMap.current.musicMap } });
    }, 2000);
  };

  useEffect(() => {
    if (gameSet === 2) {
      setTime.current = setTimeout(() => {
        makeDailyData(liveMap.current, 1);

        //저장중입니다.
        if (saveFlag.current) {
          Game_EndCommenBox.current.innerHTML = `<div>데이터 저장을 시작합니다.</div><div> 2초후 엔딩페이지로 넘어갑니다.</div>`;
          endGameSuccess(liveMap);
          endgo();
        }
      }, 3500);
    } else if (gameSet === 3) {
      // 완주 실패
      clearInterval(liveMap.current.tickerInterval);
      //실패했을때 타는 타이틀 로직
      checkFailLogic();
      makeDailyData(liveMap.current, 0);
      setTimeout(() => {
        navigate("/stage", { replace: true });
      }, 2000);
    }
  }, [gameSet]);
  const checkFailLogic = () => {};
  //esc모달 관련 시작//
  useEffect(() => {
    const escKeyModalClose = (e) => {
      if (e.keyCode === 27) {
        setIsEscModal(!isEscModal);
      }
    };
    document.addEventListener("keydown", escKeyModalClose);

    return () => {
      document.removeEventListener("keydown", escKeyModalClose);
    };
  }, [isEscModal]);

  //esc모달 관련 끝//

  // 태그
  return (
    <AnimatePresence>
      <div className="Game_Container">
        {renderGameYoutube()}
        {progressCnt === 8 && (
          <GameStation4 emoticon={emoticon} youtubeStart={youtubeStart} liveMap={liveMap} />
        )}
        {progressCnt !== 8 && (
          <GameLoadingView
            emoticon={emoticon}
            progressCnt={progressCnt}
            musicMap={location.state.musicMap}
          />
        )}
        <GameEndNotice gameSet={gameSet} Game_EndCommenBox={Game_EndCommenBox} />
        {isEscModal && <EscModal setIsEscModal={setIsEscModal} />}
      </div>
    </AnimatePresence>
  );
};
