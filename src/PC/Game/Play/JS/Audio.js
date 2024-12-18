import { fnData } from "../../../../common/Base";

export const getAudio = async (keyType, musicCnt) => {
  const audioContextRef = new (window.AudioContext || window.webkitAudioContext)();
  let audioBufferRef = null;
  //3초 딜레이
  let silenceDuration = 3;
  let duration = 0;
  const loadAudio = async () => {
    try {
      const response = await fetch(`/${keyType}key/${musicCnt}/audio.mp3`); // public 폴더의 경로로 접근
      const arrayBuffer = await response.arrayBuffer();
      const decodedData = await audioContextRef.decodeAudioData(arrayBuffer);

      audioBufferRef = decodedData;

      const gainNode = audioContextRef.createGain();
      gainNode.gain.value = fnData("audioVolume"); // ** 볼륨 설정
      const extendedBuffer = audioContextRef.createBuffer(
        audioBufferRef.numberOfChannels,
        audioBufferRef.length + audioContextRef.sampleRate * silenceDuration,
        audioBufferRef.sampleRate
      );

      for (let channel = 0; channel < audioBufferRef.numberOfChannels; channel++) {
        let extendedChannelData = extendedBuffer.getChannelData(channel); // ** 긴거(비어있음)
        let originalChannelData = audioBufferRef.getChannelData(channel); // ** 짧은거(원본)
        // ** 무음 구간 (앞부분을 0으로 채움)
        for (let i = 0; i < audioContextRef.sampleRate * silenceDuration; i++) {
          extendedChannelData[i] = 0;
        }
        // ** 원본 오디오 데이터 복사. 인자값은 (채널 데이터, 오프셋). 묵음 시간 이후로 음원 데이터를 넣는 과정
        extendedChannelData.set(originalChannelData, audioContextRef.sampleRate * silenceDuration);
      }

      // ** 원본 버퍼를 갖고 있던 audioBuffer에 묵음 추가한 걸로 갈아낌
      audioBufferRef = extendedBuffer;
      // console.log(audioBufferRef.current.duration); // 오디오 재생 시간 (초 단위)

      // 오디오 재생 시간 정수로 변환
      duration = Math.floor(audioBufferRef.duration);
      // console.log("duration :", duration.current); // 예: 260
      const source = audioContextRef.createBufferSource();
      source.buffer = audioBufferRef;
      const gainNode1 = audioContextRef.createGain();
      gainNode1.gain.value = fnData("audioVolume"); // ** 볼륨 설정

      source.connect(gainNode1).connect(audioContextRef.destination);

      const check_source = async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (source) {
              return resolve(1);
            } else {
              return resolve(check_source());
            }
          }, 500);
        });
      };
      // bpm리스트와 스피드 리스트가 잘 들어갔는지 체크 후 실행하는 메서드
      await check_source();
      return source;
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const source = await loadAudio();
  return source;
};
