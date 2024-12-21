import { fnData } from "../../../common/Base";

export const AddrManager = () => {
  const keyType = fnData("keyType");

  const tmpMap = {};

  //공통
  tmpMap.$Game_YoutubeThumnai2 = document.getElementById("Game_YoutubeThumnai2");
  tmpMap.$ComboInt = document.getElementById("ComboInt");
  tmpMap.$ComboAcc = document.getElementById("ComboAcc");
  tmpMap.$ActiveBar = document.getElementById("ActiveBar");
  tmpMap.$AccPercent = document.getElementById("AccPercent");
  tmpMap.$Game_ComboInt_Box = document.getElementById("Game_ComboInt_Box");
  tmpMap.$dataStatus = document.getElementById("dataStatus");
  tmpMap.$ComboStr = document.getElementById("ComboStr");
  tmpMap.$FeverEffect = document.getElementById("FeverEffect");
  tmpMap.$scrollBox = document.getElementById("scrollBox");
  tmpMap.$noteBox = document.getElementById("noteBox");
  tmpMap.$judgeBar = document.getElementById("judgeBar");
  tmpMap.$judgeSlowFast = document.getElementById("JudgeSlowFast");
  tmpMap.$JudgeSlowFastBar = document.getElementById("JudgeSlowFastBar");
  tmpMap.$LineContainer = document.getElementById("LineContainer");
  tmpMap.$thumnailBefore = document.getElementById("thumnailBefore");
  tmpMap.$youtubeStartBg = document.getElementById("youtubeStartBg");
  tmpMap.LineLightList2 = [...document.getElementsByClassName("LineOne2")];
  tmpMap.LineLightList = [...document.getElementsByClassName("LineOne1")];
  tmpMap.lifeBoxList = [...document.getElementsByClassName("lifeBox")];

  //

  //같은 Map(key, value) key이름의 다른 타입인경우
  if (keyType === 4) {
    tmpMap.EffectList = [...document.getElementsByClassName("Effect_4")];
  } else if (keyType === 7) {
    tmpMap.EffectList = [...document.getElementsByClassName("Effect")];
  }

  return tmpMap;
};
