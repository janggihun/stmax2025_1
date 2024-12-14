import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { levelList } from "../../common/Array";
import { changeLevel } from "../../Store/LevelSlice";
import { fnData, fnMember, saveData } from "../../common/Base";
import { changeMusicMap } from "../../Store/MusicMapSlice";
import { changePage } from "../../Store/PageSlice";
import { openModal } from "../../Store/ModalSlice";
import { useNavigate } from "react-router-dom";

export const useKeyBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data.value);
  const detailList = data ? data.detailList : [];
  const level = useSelector((state) => state.level.value);
  const musicMap = useSelector((state) => state.musicMap.value);
  const page = useSelector((state) => state.page.value);
  const player = useSelector((state) => state.player.value);

  const moveMouseWheel = (e) => {
    let wheel = e.wheelDeltaY;
    if (page === 2 || page === 9 || page === 7 || page === 8) {
      return false;
    }
    if (wheel > 0) {
      if (data) {
        const keyType = fnData("keyType");
        const musicList = data.detailList;

        if (keyType === 4) {
          const lastMusicCnt_4 = fnData("lastMusicCnt_4");

          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_4) {
              return true;
            }
          });
          if (returnIndex - 1 < 0) {
            dispatch(changeMusicMap(musicList[musicList.length - 1]));
          } else {
            dispatch(changeMusicMap(musicList[returnIndex - 1]));
          }
        } else {
          const lastMusicCnt_7 = fnData("lastMusicCnt_7");
          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_7) {
              return true;
            }
          });
          if (returnIndex - 1 < 0) {
            dispatch(changeMusicMap(musicList[musicList.length - 1]));
          } else {
            dispatch(changeMusicMap(musicList[returnIndex - 1]));
          }
        }
      }
    } else {
      // (wheel < 0)
      if (data) {
        const keyType = fnData("keyType");
        const musicList = data.detailList;

        if (keyType === 4) {
          const lastMusicCnt_4 = fnData("lastMusicCnt_4");

          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_4) {
              return true;
            }
          });
          if (returnIndex + 1 < musicList.length) {
            dispatch(changeMusicMap(musicList[returnIndex + 1]));
          } else {
            dispatch(changeMusicMap(musicList[0]));
          }
        } else {
          const lastMusicCnt_7 = fnData("lastMusicCnt_7");
          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_7) {
              return true;
            }
          });
          if (returnIndex + 1 < musicList.length) {
            dispatch(changeMusicMap(musicList[returnIndex + 1]));
          } else {
            dispatch(changeMusicMap(musicList[0]));
          }
        }
      }
    }
  };

  const pushKeyBoard = (e) => {
    if (e.code === "ArrowLeft") {
      //level변경
      const returnIndex = levelList.findIndex((el) => {
        if (el.level === level) {
          return true;
        } else {
        }
      });

      if (returnIndex - 1 < 0) {
        dispatch(changeLevel(levelList[levelList.length - 1].level));
      } else {
        dispatch(changeLevel(levelList[returnIndex - 1].level));
      }
    } else if (e.code === "ArrowRight") {
      //level변경
      const returnIndex = levelList.findIndex((el) => {
        if (el.level === level) {
          return true;
        } else {
        }
      });

      if (returnIndex + 1 < levelList.length) {
        dispatch(changeLevel(levelList[returnIndex + 1].level));
      } else {
        dispatch(changeLevel(levelList[0].level));
      }
    } else if (e.code === "ArrowDown") {
      //뮤직번호 변경

      if (data) {
        const keyType = fnData("keyType");
        const musicList = data.detailList;

        if (keyType === 4) {
          ///

          const lastMusicCnt_4 = fnData("lastMusicCnt_4");

          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_4) {
              return true;
            }
          });
          if (returnIndex + 1 < musicList.length) {
            dispatch(changeMusicMap(musicList[returnIndex + 1]));
          } else {
            dispatch(changeMusicMap(musicList[0]));
          }
        } else {
          const lastMusicCnt_7 = fnData("lastMusicCnt_7");
          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_7) {
              return true;
            }
          });
          if (returnIndex + 1 < musicList.length) {
            dispatch(changeMusicMap(musicList[returnIndex + 1]));
          } else {
            dispatch(changeMusicMap(musicList[0]));
          }
        }
      }
    } else if (e.code === "ArrowUp") {
      //뮤직번호 변경
      if (data) {
        const keyType = fnData("keyType");
        const musicList = data.detailList;

        if (keyType === 4) {
          const lastMusicCnt_4 = fnData("lastMusicCnt_4");

          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_4) {
              return true;
            }
          });
          if (returnIndex - 1 < 0) {
            dispatch(changeMusicMap(musicList[musicList.length - 1]));
          } else {
            dispatch(changeMusicMap(musicList[returnIndex - 1]));
          }
        } else {
          const lastMusicCnt_7 = fnData("lastMusicCnt_7");
          const returnIndex = musicList.findIndex((el) => {
            if (el.musicCnt === lastMusicCnt_7) {
              return true;
            }
          });
          if (returnIndex - 1 < 0) {
            dispatch(changeMusicMap(musicList[musicList.length - 1]));
          } else {
            dispatch(changeMusicMap(musicList[returnIndex - 1]));
          }
        }
      }
    } else if (e.code === "NumpadEnter" || e.code === "Enter") {
      //게임시작
    } else if (e.code === "Digit1") {
      dispatch(changePage(1));
    } else if (e.code === "Digit2") {
      dispatch(changePage(2));
    } else if (e.code === "Digit3") {
      dispatch(openModal("상점은 준비중입니다."));
      // dispatch(changePage(3));
    } else if (e.code === "Digit4") {
      dispatch(openModal("랭크는 준비중입니다."));
      // dispatch(changePage(4));
    } else if (e.code === "Digit5") {
      dispatch(changePage(5));
    } else if (e.code === "Digit6") {
      dispatch(changePage(6));
    } else if (e.code === "Digit7") {
      dispatch(changePage(7));
    } else if (e.code === "Digit9") {
      dispatch(changePage(9));
    }
    if (e.code === "Enter") {
      gameStart();
    } else if (e.code === "NumpadEnter") {
      gameStart();
    }

    if (e.code === "KeyM") {
      //음소거
      clickSoundOnOff();
      console.log(1);
    }
  };
  const gameStart = () => {
    const noteMap = data.noteList.find((n_el) => {
      if (n_el.musicCnt === musicMap.musicCnt && n_el.level === level) {
        return true;
      }
    });

    if (noteMap.classify === 0) {
      dispatch(openModal("현재 준비중입니다."));
      return false;
    }
    const keyType = fnData("keyType");
    const singerList = data.singerList;
    const Group = fnMember(singerList, musicMap.musicCnt);
    if (keyType === 4) {
      navigate("/Game/4key", { state: { musicMap: musicMap, Group: Group } });
    } else if (keyType === 7) {
      navigate("/Game/7key", { state: { musicMap: musicMap, Group: Group } });
    }
  };
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
  useEffect(() => {
    document.addEventListener("wheel", moveMouseWheel);
    document.addEventListener("keydown", pushKeyBoard);
    return () => {
      document.removeEventListener("keydown", pushKeyBoard);
      document.removeEventListener("wheel", moveMouseWheel);
    };
  });
};
