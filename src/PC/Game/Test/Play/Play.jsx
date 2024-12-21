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
  //버튼리스트
  const btn_Up_List = useRef([]);
  const btn_Down_List = useRef([]);

  //노트이미지 리스트 20개를 기준으로 해봄
  const note_blue_List = useRef([]);
  const note_white_List = useRef([]);
  const note_yellow_List = useRef([]);
  /////
  const liveMap = useRef(createLiveMap_play());
  //조건
  const objectPoolingCnt = 10;
  const speed = 1.5;

  //staraligns
  const musicCnt = 1;
  //괴수의
  // const musicCnt = 6;
  const keyType = 4;
  const level = "stella";

  //렌더링 인덱스
  const renderIndex = useRef(0);
  //키 누를때

  const findDownKey = (e) => {
    const diffTime = Date.now() - liveMap.current.startTime;
    if (e.keyCode === liveMap.current.keyList_4[0]) {
      if (liveMap.current.key0 === 0) {
        // audioPlaySound();
        liveMap.current.key0 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 0]);
        btn_Up_List.current[0].visible = true;
        btn_Down_List.current[0].visible = false;
      }
    } else if (e.keyCode === liveMap.current.keyList_4[1]) {
      if (liveMap.current.key1 === 0) {
        // audioPlaySound();
        liveMap.current.key1 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 1]);
        btn_Up_List.current[1].visible = true;
        btn_Down_List.current[1].visible = false;
      }
    } else if (e.keyCode === liveMap.current.keyList_4[2]) {
      if (liveMap.current.key2 === 0) {
        // audioPlaySound();
        liveMap.current.key2 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 2]);
        btn_Up_List.current[2].visible = true;
        btn_Down_List.current[2].visible = false;
      }
    } else if (e.keyCode === liveMap.current.keyList_4[3]) {
      if (liveMap.current.key3 === 0) {
        // audioPlaySound();
        liveMap.current.key3 = 1;
        liveMap.current.keyMemoryList.push([1, diffTime, 3]);
        btn_Up_List.current[3].visible = true;
        btn_Down_List.current[3].visible = false;
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
      btn_Down_List.current[0].visible = true;
      btn_Up_List.current[0].visible = false;
    } else if (e.keyCode === liveMap.current.keyList_4[1]) {
      liveMap.current.key1 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 1]);
      btn_Down_List.current[1].visible = true;
      btn_Up_List.current[1].visible = false;
    } else if (e.keyCode === liveMap.current.keyList_4[2]) {
      liveMap.current.key2 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 2]);
      btn_Down_List.current[2].visible = true;
      btn_Up_List.current[2].visible = false;
    } else if (e.keyCode === liveMap.current.keyList_4[3]) {
      liveMap.current.key3 = 0;
      liveMap.current.keyMemoryList.push([0, diffTime, 3]);
      btn_Down_List.current[3].visible = true;
      btn_Up_List.current[3].visible = false;
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
      console.log("로딩 시작");
      //이미지 로딩
      this.load.image("frame", "/Gear7K/frame.png");
      this.load.image("btn_off", "/Gear7K/KL_White_off.png");
      this.load.image("btn_on", "/Gear7K/KL_White_on.png");
      //노트 이미지 로딩
      this.load.image("note_blue", "/Note/note_blue.png");
      this.load.image("note_white", "/Note/note_white.png");
      //노트 데이터 로딩
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
      // graphics_short.current = this.add.graphics({ fillStyle: { color: 0xebcc34 } });
      // graphics_long.current = this.add.graphics({ fillStyle: { color: 0xffffff } });
      //   gameState.music = this.sound.add("theme");
      //   gameState.music.play();
      console.log("크리에이트 시작");
      //4키 인 경우
      //(좌우, 위아래 , 이름)

      //프레임 초기화
      this.add.image(500, 450, "frame");
      // 키 버튼 이미지 생성 초기화
      [...Array(4)].forEach((el, i) => {
        const base = 340;
        //on버튼 리스트
        btn_Up_List.current.push(this.add.image(base + 108 * i, 840, "btn_on"));
        //off 버튼 리스트
        btn_Down_List.current.push(this.add.image(base + 108 * i, 840, "btn_off"));
      });
      //오브젝트 풀링 리스트 초기화
      [...Array(objectPoolingCnt)].forEach((el, i) => {
        //피벗 맞추기
        const blue = this.add.image(900, 840, "note_blue").setOrigin(0);
        const white = this.add.image(900, 840, "note_white").setOrigin(0);
        blue.depth = -1;
        white.depth = -1;
        note_blue_List.current.push(blue);
        note_white_List.current.push(white);
      });
      //   gameState.square = this.add.rectangle(150, 150, 100, 100, 0xff0000);

      //키보드 다운
      this.input.keyboard.on("keydown", function (e) {
        findDownKey(e);
      });
      //키보드업
      this.input.keyboard.on("keyup", function (e) {
        findUpKey(e);
      });
    }

    function update() {
      const now = Date.now();

      if (liveMap.current.startTime) {
        const audioTime = now - liveMap.current.startTime;

        liveMap.current.audioTime = audioTime;

        //화면과 오디오를 맞춘다.
        dispatch(changeYoutube({ value: true, startTime: liveMap.current.startTime }));

        //현재 화면을 지운다.
        note_blue_List.current.forEach((el) => {
          el.x = 60;
          el.y = 800;
        });
        note_white_List.current.forEach((el) => {
          el.x = 60;
          el.y = 500;
        });
        //노트 화면 랜더링

        RenderingNoteBox(
          this,
          graphics_short.current,
          graphics_long.current,
          gameList.current,
          audioTime,
          speed,
          speedList.current,
          intervalList.current,
          renderList_short.current,
          renderList_long.current,
          note_blue_List.current,
          note_white_List.current
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
        <div className="Scene_BaseContainer"></div>
      </div>
    </div>
  );
};
