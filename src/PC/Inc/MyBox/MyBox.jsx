import { useEffect, useState } from "react";
import { get_Src_Img } from "../../../common/Base";
import "./MyBox.css";
import "../../../style/Tooltip.css";
import { getUserLevel } from "../../../RestApi";
import { useDispatch } from "react-redux";
import { changePage } from "../../../Store/PageSlice";

// 개인 경험치,레벨, 칭호 박스
export const MyBox = () => {
  const dispatch = useDispatch();
  const [myDetail, setMyDetail] = useState();
  useEffect(() => {
    const getInit = async () => {
      const userId = window.localStorage.getItem("userId");
      const res = await getUserLevel(userId);
      setMyDetail(res);
    };
    getInit();
  }, []);
  const clickCha = () => {
    dispatch(changePage(10));
  };
  return (
    <div
      className="MyBox_Container"
      onClick={() => {
        clickCha();
      }}
    >
      <div className="MyBox_T">
        <div className="MyBox_ImgBox">
          {myDetail && (
            <img className="img" src={get_Src_Img(myDetail.emoticon)} alt={"사진없음"} />
          )}
        </div>
        <div className="MyBox_MyInfo font15">
          <div className="MyBox_TierBox sort">
            {myDetail && (myDetail.titleName ? myDetail.titleName : "")}
          </div>
          <div className="MyBox_LevelBox sort font15">
            {myDetail && "Lv." + myDetail.userLevel + `(${myDetail.userEx}%)`}
          </div>
          <div className="MyBox_UserInfoBox  sort">
            <div>{myDetail && myDetail.userId}</div>
          </div>
        </div>
      </div>
      <div className="MyBox_B">
        <div className="MyBox_ExBar" style={{ width: myDetail && myDetail.userEx + "%" }}></div>
      </div>
    </div>
  );
};
