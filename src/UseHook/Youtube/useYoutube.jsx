import YouTube from "react-youtube";
import "./useYoutube.css";
import { fnData } from "../../common/Base";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { changePlayer } from "../../Store/PlayerSlice";

export const UseYoutube = () => {
  const [video, seVideo] = useState();
  const dispatch = useDispatch();
  const preMusicCnt = useRef();
  const musicMap = useSelector((state) => state.musicMap.value);
  const delayInputYoutubeVideo = () => {
    preMusicCnt.current = musicMap.musicCnt;
    setTimeout(() => {
      if (musicMap.musicCnt === preMusicCnt.current) {
        //변경
        seVideo(musicMap.videoId);
      }
    }, 2000);
  };
  useEffect(() => {
    if (musicMap) delayInputYoutubeVideo();
  }, [musicMap]);

  return (
    <>
      {musicMap && (
        <div className="Base_container">
          <YouTube
            //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
            videoId={video}
            //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
            //밑에서 더 설명하겠습니다.
            style={{ width: "100%", height: "100%" }}
            opts={{
              width: "100%",
              height: "100%",

              playerVars: {
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                controls: 0, //플레이어 컨트롤러 표시여부(0:표시안함)
                autoplay: 1, //자동재생 여부(1:자동재생 함, mute와 함께 설정)
                mute: 0, //음소거여부(1:음소거 함)
                loop: 1, //반복재생여부(1:반복재생 함)
                modestbranding: 1,
                // wmode: "opaque",
                // origin: window.location.origin,
              },
            }}
            //이벤트 리스너
            onEnd={(e) => {
              e.target.playVideo();
            }}
            onReady={(e) => {
              //player저장

              dispatch(changePlayer(e.target));

              const sound = fnData("soundOnOff");
              if (!sound) {
                e.target.setVolume(fnData("audioVolume") * 100);
              } else {
                e.target.setVolume(0);
              }
              e.target.playVideo();
            }}
          />
          <div className="YT_Bg_Blur"></div>
        </div>
      )}
    </>
  );
};
//   background-color: ;
//   backdrop-filter: ;
//   position: absolute;
//   left: 0px;
//   top: 0px;

//   width: 100%;
//   height: 100%;
