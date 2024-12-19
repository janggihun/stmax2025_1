import { useEffect, useRef } from "react";
import "./CSS/play.css";
import Phaser from "phaser";
import { get_noteList } from "./JS/Note";
import { getAudio } from "./JS/Audio";
import { RenderingNoteBox } from "./JS/RenderNote";
import { RenderGameYoutube_play } from "./JS/Youtube";
import { useDispatch } from "react-redux";
import { changeYoutube } from "../../../../Store/YoutubePlay";
import { createLiveMap_play } from "./JS/JudgeMent";

export const Play = () => {
  const dispatch = useDispatch();
  ////
  const gameRef = useRef(null);
  const audio = useRef(null);
  const gameList = useRef(null);
  const speedList = useRef(null);
  const intervalList = useRef([]);
  const renderList_short = useRef([]);
  const renderList_long = useRef([]);
  const graphics_short = useRef();
  const graphics_long = useRef();
  const musicMap = useRef({ videoId: "CtXv2_NBBOU" });
  /////
  const liveMap = useRef(createLiveMap_play());
  //조건
  const speed = 1.5;
  const musicCnt = 6;
  const keyType = 4;
  const level = "stella";

  //키 누를때

  const findDownKey = (e) => {
    const diffTime = Date.now() - liveMap.current.startTime;
    console.log(liveMap.current.keyMemoryList);
    if (e.keyCode === liveMap.current.keyList_4[0]) {
      if (liveMap.current.key0 === 0) {
        // audioPlaySound();
        liveMap.current.key0 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 0]);
      }
    } else if (e.keyCode === liveMap.current.keyList_4[1]) {
      if (liveMap.current.key1 === 0) {
        // audioPlaySound();
        liveMap.current.key1 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 1]);
      }
    } else if (e.keyCode === liveMap.current.keyList_4[2]) {
      if (liveMap.current.key2 === 0) {
        // audioPlaySound();
        liveMap.current.key2 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 2]);
      }
    } else if (e.keyCode === liveMap.current.keyList_4[3]) {
      if (liveMap.current.key3 === 0) {
        // audioPlaySound();
        liveMap.current.key3 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 3]);
      }
    }
  };
  //키 떌떄
  const findUpKey = (e) => {
    //
    const diffTime = Date.now() - liveMap.current.startTime;
    if (e.keyCode === liveMap.current.keyList_4[0]) {
      liveMap.current.key0 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 0]);
    } else if (e.keyCode === liveMap.current.keyList_4[1]) {
      liveMap.current.key1 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 1]);
    } else if (e.keyCode === liveMap.current.keyList_4[2]) {
      liveMap.current.key2 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 2]);
    } else if (e.keyCode === liveMap.current.keyList_4[3]) {
      liveMap.current.key3 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 3]);
    }
  };

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      // backgroundColor: "transparents",
      transparent: true,
      key: "sceneGame",
      width: 1900,
      height: 900,
      parent: gameRef.current.parentElement, //Phaser 게임 객체를 gameRef.current.parentElement로 설정
      //   physics: {
      //     default: "arcade",
      //     arcade: {
      //       //   gravity: { y: 200 },
      //       debug: true,
      //     },
      //   },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };
    const game = new Phaser.Game(config);

    async function preload() {
      console.log("프리로드 시작");
      //이미지 로딩
      // this.load.image("frame", "/Gear7K/frame.png");
      //노트 로딩
      const noteMap = await get_noteList(musicCnt, level);

      gameList.current = noteMap.gameList;
      speedList.current = noteMap.speedList;
      liveMap.current.lastTime = noteMap.lastTime;
      //   speedList.current = noteMap.speedList ? noteMap.speedList : [0, 1, 4, 0];

      //오디오 로딩
      const source = await getAudio(keyType, musicCnt);
      audio.current = source;
      audio.current.start();
      liveMap.current.startTime = Date.now();
    }

    function create() {
      graphics_short.current = this.add.graphics({ fillStyle: { color: 0xebcc34 } });
      graphics_long.current = this.add.graphics({ fillStyle: { color: 0xffffff } });
      //   gameState.music = this.sound.add("theme");
      //   gameState.music.play();
      document.addEventListener("keydown", findDownKey);
      document.addEventListener("keyup", findUpKey);
      console.log("크리에이트 시작");
      //4키 인 경우
      //(좌우, 위아래 , 이름)
      // this.add.image(500, 450, "frame");

      //   gameState.square = this.add.rectangle(150, 150, 100, 100, 0xff0000);
      //   this.input.keyboard.on("keydown-W", function () {
      //     console.log(gameState);
      //     gameState.square.fillColor = 0xffff00;
      //   });
    }

    function update() {
      const now = Date.now();

      if (liveMap.current.startTime) {
        const audioTime = now - liveMap.current.startTime;

        liveMap.current.audioTime = audioTime;

        //화면과 오디오를 맞춘다.
        dispatch(changeYoutube({ value: true, startTime: liveMap.current.startTime }));

        //현재 화면을 지운다.
        graphics_short.current.clear();
        graphics_long.current.clear();
        renderList_short.current = [];
        renderList_long.current = [];
        //노트 화면 랜더링
        RenderingNoteBox(
          graphics_short.current,
          graphics_long.current,
          gameList.current,
          audioTime,
          speed,
          speedList.current,
          intervalList.current,
          renderList_short.current,
          renderList_long.current
        );
        //노트 로직 시작
      }
      liveMap.current.judgeMent();
      // console.log(liveMap.current.stmax100);

      //   console.log("시간변경중 : ", now - startTime.current);
    }

    return () => {
      game.destroy();
      audio.current.stop();
      // add
      document.removeEventListener("keydown", findDownKey);
      document.removeEventListener("keyup", findUpKey);
    };
  }, []);

  return (
    <div>
      {/* 유튜브 */}
      <div className="Scene_Youtube">
        <RenderGameYoutube_play musicMap={musicMap.current} startTime={liveMap.current.startTime} />
      </div>
      {/* 백그라운드 */}
      <div className="Scene_BackGround">
        <div
          className="Scene_BaseContainer"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.802)" }}
        ></div>
      </div>
      {/* 게임신 */}
      <div className="Scene_Game">
        <div ref={gameRef} />
      </div>
      {/* 프론트 */}
      <div className="Scene_Front">
        <img className="Scene_Img" src="/Gear7K/frame.png" alt="사진없음" />
        <div className="Scene_buttonBox">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "140%",
            }}
          >
            <img className="Scene_button" src="/Gear7K/KL_White_off.png" alt="사진없음" />
            <img className="Scene_button" src="/Gear7K/KL_White_off.png" alt="사진없음" />
            <img className="Scene_button" src="/Gear7K/KL_White_off.png" alt="사진없음" />
            <img className="Scene_button" src="/Gear7K/KL_White_off.png" alt="사진없음" />
          </div>
        </div>
        <div className="Scene_buttonBox">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "140%",
            }}
          >
            <img className="Scene_button" src="/Gear7K/KL_White_on.png" alt="사진없음" />
            <img className="Scene_button" src="/Gear7K/KL_White_on.png" alt="사진없음" />
            <img className="Scene_button" src="/Gear7K/KL_White_on.png" alt="사진없음" />
            <img className="Scene_button" src="/Gear7K/KL_White_on.png" alt="사진없음" />
          </div>
        </div>
        <div className="Scene_BaseContainer"></div>
      </div>
    </div>
  );
};
