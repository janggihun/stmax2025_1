import "./LoginPage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../UseHook/Loading/Loading";
import { Login } from "../../../RestApi";
import { useInfoModal } from "../../../UseHook/InfoModal/useInfoModal";

export const LoginPage = (props) => {
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();
  const navigator = useNavigate();

  //로딩모달
  const { openLoading, closeLoading, renderLoading } = useLoading();
  //정보모달
  const { openInfoModalwithMessage, renderInfo } = useInfoModal();
  /**
   *  userEffect 한번 실행
   */

  useEffect(() => {
    //키 바인딩

    document.addEventListener("keydown", pressEnter);
    return () => {
      document.removeEventListener("keydown", pressEnter);
    };
  });
  //id 입력 변경
  const changeId = (tmp) => {
    setUserId(tmp);
  }; //id 입력 변경
  const changePw = (tmp) => {
    setUserPw(tmp);
  };
  /**
   * id, pw 로그인
   */
  const login = async () => {
    openLoading();
    const userParams = { userId: userId, userPw: userPw };

    //서버통신
    const res = await Login(userParams);
    closeLoading();

    if (res.loginFlag === "1") {
      //로그인성공
      window.localStorage.setItem("userId", userId);
      navigator("/STAGE");
    } else {
      openInfoModalwithMessage(res.msg);
    }
  };

  /**
   * 엔터키를 누르면 로그인실행
   *
   */
  const pressEnter = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
    <div className="Login_Container">
      <div className="LoginBox" id="LoginBox">
        <div className="Login_Sort_Main">STMAX</div>
        <div className="LoginInput">
          <div className="LoginBox1"></div>
          <div>아이디</div>
          <div className="LoginIdBox">
            <input
              className="LoginInputBox"
              type="text"
              onChange={(e) => {
                changeId(e.target.value);
              }}
              maxLength={8}
            />
          </div>
          <div>비밀번호</div>
          <div className="LoginPwBox">
            <input
              className="LoginInputBox"
              type="password"
              onChange={(e) => {
                changePw(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="LoginBtnBox">
          <button
            className="LoginBtn"
            onClick={() => {
              login();
            }}
          >
            로그인
          </button>
        </div>
        <div className="LoginBtnBox">
          <button
            className="LoginBtn"
            onClick={() => {
              props.setFrontPage(1);
            }}
          >
            계정만들기
          </button>

          <button
            className="LoginBtn"
            onClick={() => {
              props.setFrontPage(0);
            }}
          >
            로그인 하러 가기
          </button>

          <button
            className="LoginBtn"
            onClick={() => {
              props.setFrontPage(2);
            }}
          >
            비밀번호 변경하기
          </button>
        </div>
        <div className="ExtraService"></div>
      </div>{" "}
      {renderLoading()}
      {renderInfo()}
    </div>
  );
};
