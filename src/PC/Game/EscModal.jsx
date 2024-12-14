import { useNavigate } from "react-router-dom";
import { fnData, saveData } from "../../common/Base";

export const EscModal = (props) => {
  const navigate = useNavigate();
  const gamePos = fnData("gamePosition");
  const changePanel = (gamePos) => {
    saveData("gamePosition", gamePos);
  };

  console.log("재랜더링");
  const clickGoMain = () => {
    navigate("/STAGE", { replace: true });
  };

  return (
    <div className="EscContainer">
      <div
        className="EscModal"
        onClick={() => {
          props.setIsEscModal(false);
        }}
      ></div>
      <div className="EscModalBox">
        <div className="GameBoxController">
          <div className="GameBoxLeftPanel">
            <div>
              <button
                class="GameBoxChangePanelBtn"
                onClick={() => {
                  changePanel("Left");
                }}
              >
                왼쪽으로 패널 변경
              </button>
            </div>
          </div>
          <div className="GameBoxRightPanel">
            <div>
              <button
                class="GameBoxChangePanelBtn"
                onClick={() => {
                  changePanel("Middle");
                }}
              >
                가운데로 패널 변경
              </button>
            </div>
          </div>
        </div>
        <div className="BtnBoxController">
          {/* <div className="ReStartBtn" onClick={clickRestart}>
                재시작
              </div> */}
          <div className="GoMainBtn" onClick={clickGoMain}>
            메인으로
          </div>
        </div>
      </div>
    </div>
  );
};
