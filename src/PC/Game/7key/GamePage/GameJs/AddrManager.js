export const AddrManager = () => {
  const tmpMap = {};

  tmpMap.$Game_YoutubeThumnai2 = document.getElementById("Game_YoutubeThumnai2");
  tmpMap.$ComboInt = document.getElementById("ComboInt");
  tmpMap.$ComboAcc = document.getElementById("ComboAcc");
  tmpMap.$ActiveBar = document.getElementById("ActiveBar");
  tmpMap.$AccPercent = document.getElementById("AccPercent");

  tmpMap.$Game_ComboInt = document.getElementById("Game_ComboInt");
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
  tmpMap.$GameFever = document.getElementById("GameFever");

  tmpMap.LineLightList2 = [...document.getElementsByClassName("LineOne2")];
  tmpMap.LineLightList = [...document.getElementsByClassName("LineOne1")];
  tmpMap.EffectList = [...document.getElementsByClassName("Effect")];
  tmpMap.lifeBoxList = [...document.getElementsByClassName("lifeBox")];

  return tmpMap;
};
