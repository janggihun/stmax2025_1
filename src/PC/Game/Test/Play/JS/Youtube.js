import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import { fnData } from "../../../../../common/Base";

export const RenderGameYoutube_play = (props) => {
  const youtubeFlag = useSelector((state) => state.youtubeFlag.value);
  const startTime = useSelector((state) => state.youtubeFlag.startTime);
  const musicMap = props.musicMap;
  const opacity = fnData("opacity");
  const startDelay = 3; //초
  useEffect(() => {
    if (youtubeFlag) {
      setTimeout(() => {
        //변수 초
        const diffTime = Date.now() - startTime;
        player.seekTo(diffTime / 1000 - 3);
        player.playVideo();
      }, (startDelay + 0.5) * 1000);
    }
  }, [youtubeFlag]);

  //유튜브 플레이어
  const [player, setPlayer] = useState();
  //화면 변화
  const [youtubeFrontOpacity, setYoutubeFrontOpacity] = useState();
  return (
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

      <div className="setting_opacity" style={{ opacity: opacity }}></div>
    </>
  );
};
