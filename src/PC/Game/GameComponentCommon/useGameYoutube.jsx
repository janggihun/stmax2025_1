import { useEffect, useState } from "react";
import "./useGameYoutube.css";
import YouTube from "react-youtube";
import { fnData, get_Src_MusicImg } from "../../../common/Base";

export const useGameYoutube = (musicMap) => {
  //유튜브 플레이어
  const [player, setPlayer] = useState();
  //화면 변화
  const [youtubeFrontOpacity, setYoutubeFrontOpacity] = useState();
  //뮤직을 선택하고 들어오기 떄문에 값이 무조건 있음

  const musicCnt = musicMap.musicCnt;

  //백그라운드 재생유무
  const isYoutube = fnData("isYoutube");
  //불투명도
  const opacity = fnData("opacity");
  //키 타입
  const keyType = fnData("keyType");

  useEffect(() => {
    setYoutubeFrontOpacity(1);
  }, []);
  //유튜브 시작
  const youtubeStart = (diffTime) => {
    if (player) {
      player.seekTo(diffTime / 1000 - 3);
      player.playVideo();
    }
    setYoutubeFrontOpacity(0);
  };
  //렌더링 함수
  const renderGameYoutube = () => {
    return (
      <>
        {isYoutube ? (
          <>
            <YouTube
              videoId={musicMap.videoId}
              opts={{
                width: "1900px",
                height: "900px",
                playerVars: {
                  rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                  modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                  controls: 0, //플레이어 컨트롤러 표시여부(0:표시안함)
                  autoplay: 1, //자동재생 여부(1:자동재생 함, mute와 함께 설정)
                  mute: 1, //음소거여부(1:음소거 함)
                  loop: 0, //반복재생여부(1:반복재생 함)
                },
              }}
              //이벤트 리스너
              onEnd={(e) => {
                e.target.stopVideo();
              }}
              onReady={(e) => {
                // console.log("유튜브 로딩완료");
                setPlayer(e.target);
                // player.current = e.target;
                e.target.playVideo();
              }}
            />
            <div className="Game_YoutubeThumnai2" style={{ opacity: youtubeFrontOpacity }}>
              <img className="img" src={get_Src_MusicImg(keyType, musicCnt)} />
            </div>
          </>
        ) : (
          <div className="Game_YoutubeThumnail">
            <img className="img" src={get_Src_MusicImg(keyType, musicCnt)} />
          </div>
        )}
        <div className="setting_opacity" style={{ opacity: opacity }}></div>
      </>
    );
  };
  return { renderGameYoutube, player, youtubeStart };
};
