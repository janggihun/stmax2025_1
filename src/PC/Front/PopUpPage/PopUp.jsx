import { useState } from "react";
import "./PopUp.css";
import { updateText } from "../../../common/UpdateText";

export const usePopUp = () => {
  const version = "12/20";
  const [openPopUp, setPopUp] = useState(false);

  const rm_Popup = () => {
    window.localStorage.setItem("version", version);
    setPopUp(false);
  };

  const checkVersion = () => {
    const local_version = window.localStorage.getItem("version");

    if (!version || local_version !== version) {
      setPopUp(true);
    }
  };

  const renderPopup = () => {
    return (
      <div className="popUp_Container">
        <div
          className="popUp_Bg"
          onClick={() => {
            rm_Popup();
          }}
        ></div>
        <div className="popUp_Contents">
          <div className="popUp_UpdateTop" style={{ color: "black" }}>
            {" "}
            [STMAX]업데이트 내용{" "}
          </div>
          <div style={{ color: "black" }}>업데이트 날짜 : {version}</div>
          <p></p>
          <div className="popUp_updateContents">{updateText()}</div>
          <p></p>
          <div className="popUp_alert"> 이 메세지는 한번만 출력됩니다. </div>
        </div>
      </div>
    );
  };

  return { checkVersion, renderPopup, openPopUp };
};
