import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { motion } from "framer-motion";
import { useInfoModal } from "../../UseHook/InfoModal/useInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../Store/PageSlice";

export const Footer = () => {
  const page = useSelector((state) => state.page.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goLogout = () => {
    window.localStorage.removeItem("userId");
    navigate("/", { replace: true });
  };
  //정보모달
  const { openInfoModalwithMessage, renderInfo } = useInfoModal();

  return (
    <>
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="Footer_Container">
        <motion.div
          className="Footer_Row sort "
          style={page === 6 ? { color: "orange" } : { color: "white" }}
          whileHover={{ fontSize: "20px", color: "orange" }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            dispatch(changePage(6));
          }}
        >
          날짜별 업데이트 정보
        </motion.div>
        <motion.div
          style={page === 7 ? { color: "orange" } : { color: "white" }}
          whileHover={{ fontSize: "20px", color: "orange" }}
          className="Footer_Row sort "
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            dispatch(changePage(7));
          }}
        >
          튜토리얼
        </motion.div>{" "}
        <motion.div
          whileHover={{ fontSize: "20px", color: "orange" }}
          className="Footer_Row sort "
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            window.location.href = "https://discord.gg/dVxMjdxy";
          }}
        >
          문의, 요청 디스코드
        </motion.div>
        <div className="Footer_Row sort "></div>
        <div className="Footer_Row sort ">
          <div className="Footer_ArrowBox">
            <div className="Footer_ArrowUp">
              <img className="img " src="/arrow/keyboardArrow_top.png" alt="사진없음" />
            </div>
            <div className="Footer_ArrowDown">
              <img className="img " src="/arrow/keyboardArrow_bottom.png" alt="사진없음" />
            </div>
          </div>
          <div className="Footer_ArrowBoxString sort">뮤직 변경</div>
        </div>
        <div className="Footer_Row sort ">
          <div className="Footer_ArrowBox1">
            <div className="Footer_ArrowLeft">
              <img className="img " src="/arrow/keyboardArrow_left.png" alt="사진없음" />
            </div>
            <div className="Footer_ArrowRight">
              <img className="img " src="/arrow/keyboardArrow_right.png" alt="사진없음" />
            </div>
          </div>
          <div className="Footer_ArrowBoxString sort">난이도 변경</div>
        </div>
        <div className="Footer_Row sort "></div>
        <div className="Footer_Row sort "></div>
        <div className="Footer_Row sort "></div>
        <motion.div
          className="Footer_Row sort "
          whileHover={{ fontSize: "20px", color: "orange" }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            goLogout();
          }}
        >
          로그아웃
        </motion.div>
      </motion.div>
      {renderInfo()}
    </>
  );
};
