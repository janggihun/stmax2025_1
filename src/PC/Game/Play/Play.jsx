import { useEffect, useRef } from "react";
import "./CSS/play.css";
import Phaser from "phaser";
import { get_noteList } from "./JS/Note";
import { getAudio } from "./JS/Audio";
import { RenderingNoteBox } from "./JS/RenderNote";
import { RenderGameYoutube_play } from "./JS/Youtube";
import { useDispatch } from "react-redux";
import { changeYoutube } from "../../../Store/YoutubePlay";

export const Play = () => {
  const dispatch = useDispatch();
  const gameRef = useRef(null);
  const startTime = useRef(null);
  const audio = useRef(null);
  const gameList = useRef(null);
  const speedList = useRef(null);
  const intervalList = useRef([]);
  const renderList_short = useRef([]);
  const renderList_long = useRef([]);
  const graphics_short = useRef();
  const graphics_long = useRef();
  const musicMap = useRef({ videoId: "Jt6UCd7JhAA" });

  //조건
  const speed = 1.5;
  const musicCnt = 1;
  const keyType = 4;
  const level = "stella";

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
      this.load.image("frame", "/Gear7K/frame.png");
      //노트 로딩
      const noteMap = await get_noteList(musicCnt, level);
      gameList.current = noteMap.gameList;
      speedList.current = noteMap.speedList;
      //   speedList.current = noteMap.speedList ? noteMap.speedList : [0, 1, 4, 0];

      console.log(speedList.current);

      //오디오 로딩
      const source = await getAudio(keyType, musicCnt);
      audio.current = source;
      audio.current.start();
      startTime.current = Date.now();

      console.log(source);
      console.log(noteMap);
    }

    function create() {
      graphics_short.current = this.add.graphics({ fillStyle: { color: 0xebcc34 } });
      graphics_long.current = this.add.graphics({ fillStyle: { color: 0xffffff } });
      //   gameState.music = this.sound.add("theme");
      //   gameState.music.play();
      console.log("크리에이트 시작");
      //4키 인 경우
      //(좌우, 위아래 , 이름)
      this.add.image(500, 450, "frame");

      //   gameState.square = this.add.rectangle(150, 150, 100, 100, 0xff0000);
      //   this.input.keyboard.on("keydown-W", function () {
      //     console.log(gameState);
      //     gameState.square.fillColor = 0xffff00;
      //   });
    }

    function update() {
      const now = Date.now();

      if (startTime.current) {
        const audioTime = now - startTime.current;
        //화면과 오디오를 맞춘다.
        dispatch(changeYoutube({ value: true, startTime: startTime.current }));

        //현재 화면을 지운다.
        graphics_short.current.clear();
        graphics_long.current.clear();
        renderList_short.current = [];
        renderList_long.current = [];

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
      }

      //   console.log("시간변경중 : ", now - startTime.current);
    }

    return () => {
      game.destroy();
      audio.current.stop();
    };
  }, []);

  return (
    <div>
      <div className="Scene_Youtube">
        <RenderGameYoutube_play musicMap={musicMap.current} startTime={startTime.current} />
      </div>
      <div className="Scene_Game">
        <div ref={gameRef} />
      </div>
    </div>
  );
};
