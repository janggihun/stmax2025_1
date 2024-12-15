import { useEffect, useState } from "react";
import "./PwChange.css";

import { Login, updateUserPw } from "../../../RestApi";
import { useInfoModal } from "../../../UseHook/InfoModal/useInfoModal";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "../../../Store/LoadingSlice";

export const PwChange = (props) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();
  const [newuserPw, setNewUserPw] = useState();
  const [newuserPw1, setNewUserPw1] = useState();

  //정보모달
  const { openInfoModalwithMessage, renderInfo } = useInfoModal();
  /**
   *  userEffect 한번 실행
   */

  useEffect(() => {
    //기존 로그인 정보 확인

    //키 바인딩
    document.addEventListener("keydown", pressEnter);
    return () => {
      document.removeEventListener("keydown", pressEnter);
    };
  }, []);
  //id 입력 변경
  const changeId = (tmp) => {
    setUserId(tmp);
  }; //id 입력 변경
  const changePw = (tmp) => {
    setUserPw(tmp);
  };

  /**
   * 엔터키를 누르면 로그인실행
   *
   */
  const pressEnter = (event) => {
    if (event.key === "Enter") {
      alert("비밀번호 변경 버튼을 눌러주세요");
    }
  };
  const startChangePw = async () => {
    //로딩 띄우기
    dispatch(openLoading());

    //비밀번호 변경 시작
    // console.log("비밀번호 변경시작");
    const userParams = { userId: userId, userPw: userPw };

    const userParams1 = { userId: userId, userPw: newuserPw };
    //유효성검사

    if (newuserPw !== newuserPw1) {
      openInfoModalwithMessage("새비밀번호가 일치하지 않습니다.");
      dispatch(closeLoading());
      return false;
    }
    if (userPw === newuserPw1) {
      openInfoModalwithMessage("현재 비밀번호와 일치합니다. 다른 번호로 변경해주세요");
      dispatch(closeLoading());
      return false;
    }
    //현재 비밀번호가 맞는지 확인
    //서버통신
    const res = await Login(userParams);

    // 맞으면 새로운 비밀번호로 업데이트 시작
    if (res.loginFlag === "1") {
      const res1 = await updateUserPw(userParams1);
      if (res1 === 1) {
        dispatch(closeLoading());
        openInfoModalwithMessage("비밀번호 변경완료, 변경된 비밀번호로 접속해주세요");
        props.setFrontPage(0);
      } else {
        openInfoModalwithMessage("에러, 관리자에게 문의하세요");
        dispatch(closeLoading());
      }
    } else {
      dispatch(closeLoading());
      openInfoModalwithMessage("현재 비밀번호가 맞지 않습니다.");
    }
  };
  return (
    <>
      <div className="Login_Container">
        <div className="LoginBox" id="LoginBox">
          <div className="Login_Sort_Main">비밀번호 변경</div>
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
            <div>현재비밀번호</div>
            <div className="LoginPwBox">
              <input
                className="LoginInputBox"
                type="password"
                onChange={(e) => {
                  changePw(e.target.value);
                }}
              />
            </div>
            <div>새비밀번호</div>
            <div className="LoginPwBox">
              <input
                className="LoginInputBox"
                type="password"
                onChange={(e) => {
                  setNewUserPw(e.target.value);
                }}
              />
            </div>
            <div>새비밀번호 확인</div>
            <div className="LoginPwBox">
              <input
                className="LoginInputBox"
                type="password"
                onChange={(e) => {
                  setNewUserPw1(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="LoginBtnBox">
            <button
              className="LoginBtn"
              onClick={() => {
                startChangePw();
              }}
            >
              비밀번호 변경
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
        </div>
      </div>
      {renderInfo()}
    </>
  );
};
