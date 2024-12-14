export const AudioManager = async (musicCnt, audioVolume) => {
  //변수
  let audioCheck = 0;
  //
  let audioInfo = {};
  const check = async () => {
    return new Promise((resolve) => {
      if (audioCheck === 0) {
        setTimeout(() => {
          resolve(check());
        }, 500);
      } else {
        resolve(1);
      }
    });
  };
  let audio = "";
  let uris = ["/Note/0/3sec.mp3", `/Note/${musicCnt}/${musicCnt}.mp3`],
    proms = uris.map((uri) => fetch(uri).then((r) => r.blob()));
  Promise.all(proms).then((blobs) => {
    let blob = new Blob([blobs[0], blobs[1]]),
      blobUrl = URL.createObjectURL(blob),
      audio = new Audio(blobUrl);
    // console.log(audio);
    audio.onloadedmetadata = () => {
      //오디오 재생시간 정수로 변환// 단위 : s, ex) 260
      const duration = parseInt(audio.duration);
      // console.log(duration);
      //템포를 찾아준다. (단위 : 밀리초)

      // 총 거리
      audio.volume = audioVolume;
      audioInfo.audio = audio;
      audioInfo.duration = duration;

      audioCheck = 1;
    };
  });
  // console.log(audio);

  await check();

  return audioInfo;
};
