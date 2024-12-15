import { useState } from "react";

import "./JoinPage.css";

import { Join } from "../../../RestApi";
import { useInfoModal } from "../../../UseHook/InfoModal/useInfoModal";
import { useDispatch } from "react-redux";
import { closeLoading, openLoading } from "../../../Store/LoadingSlice";

export const JoinPage = (props) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [userPw, setUserPw] = useState();

  //정보모달
  const { openInfoModalwithMessage, renderInfo } = useInfoModal();
  //id 입력 변경
  const changeId = (tmp) => {
    setUserId(tmp);
  }; //id 입력 변경
  const changePw = (tmp) => {
    setUserPw(tmp);
  };
  /**
   * 회원가입
   */
  const join = async () => {
    dispatch(openLoading());

    const userParams = { userId: userId, userPw: userPw };
    //서버통신
    const res = await Join(userParams);
    dispatch(closeLoading());
    openInfoModalwithMessage(res.msg);
    if (res.joinFlag === "1") {
      //회원가입 성공
      //로그인 페이지로 변경
      props.setFrontPage(0);
    }
  };

  return (
    <div className="join_Container">
      <div className="joinBox" id="LoginBox">
        <div className="Login_Sort_Main">회원가입</div>
        <div className="LoginInput">
          <div className="LoginBox1"></div>
          <div>원하는 아이디를 입력해주세요</div>
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
          <div>비밀번호를 입력해주세요</div>
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
              join();
            }}
          >
            회원가입
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

      {renderInfo()}
    </div>
  );
};
