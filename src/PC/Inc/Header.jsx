import "./Header.css";
import { motion } from "framer-motion";
import { MyBox } from "./MyBox/MyBox";
import { get_Src_HeaderImg } from "../../common/Base";
import { ToggleBtn } from "./ToggleBtn/ToggleBtn";
import { useView } from "../../UseHook/View/useView";

import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../Store/PageSlice";
import { openModal } from "../../Store/ModalSlice";
import { ServerCheck } from "./ServerCheck/ServerCheck";

export const Header = () => {
  const page = useSelector((state) => state.page.value);
  const { view, increaseView } = useView();

  const dispatch = useDispatch();

  return (
    <>
      <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="Header_Container">
        <div className="Header_Row_PageInfo_1"></div>
        <div className="Header_Row_PageInfo sort font20 ">[STMAX]</div>
        <div className="Header_Toggle_KeyTypeBox">
          <ToggleBtn />
        </div>

        <motion.div
          className="Header_Row_PageInfo sort "
          style={page === 8 ? { color: "orange" } : { color: "white" }}
          whileHover={{ fontSize: "20px", color: "orange" }}
          whileTap={{ scale: 1 }}
          onClick={() => {
            dispatch(changePage(8));
          }}
        >
          칭호
        </motion.div>
        <motion.div
          className="Header_Row_PageInfo sort"
          style={page === 9 ? { color: "orange" } : { color: "white" }}
          whileHover={{ fontSize: "20px", color: "orange" }}
          whileTap={{ scale: 1 }}
          onClick={() => {
            dispatch(changePage(9));
          }}
        >
          기록실
        </motion.div>
        <div className="Header_Row_PageInfo_2"></div>
        <div className="Header_Row_PageInfo sort"></div>
        <div className="Header_Row_PageInfo sort"></div>
        <motion.div className="Header_Row sort font20">
          <ServerCheck />
        </motion.div>
        <div className="Header_Row sort">총 접속 횟수 : {view}</div>
        <div className="Header_Row_PageInfoIng sort">
          {page === 1 && <div className="Header_Row_PageInfoIng_triangle"></div>}
          {page === 1 && <div className="Header_Row_PageInfoIng_bg"></div>}
          <motion.img
            className="img"
            src={get_Src_HeaderImg("STLcircle")}
            alt={"사진없음"}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              dispatch(changePage(1));
            }}
          />
        </div>
        <div className="Header_Row_PageInfoIng sort">
          {page === 2 && <div className="Header_Row_PageInfoIng_triangle"></div>}
          {page === 2 && <div className="Header_Row_PageInfoIng_bg"></div>}
          <motion.img
            className="img"
            src={get_Src_HeaderImg("RE")}
            alt={"사진없음"}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              dispatch(changePage(2));
            }}
          />
        </div>
        <div className="Header_Row_PageInfoIng sort">
          <motion.img
            className="img"
            src={get_Src_HeaderImg("cart")}
            alt={"사진없음"}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              dispatch(openModal("상점은 준비중입니다."));
            }}
          />
        </div>
        <div className="Header_Row_PageInfoIng sort">
          <motion.img
            className="img"
            src={get_Src_HeaderImg("rank")}
            alt={"사진없음"}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              dispatch(openModal("티어전은 준비중입니다."));
            }}
          />
        </div>
        <div className="Header_Row_PageInfoIng sort">
          {page === 5 && <div className="Header_Row_PageInfoIng_triangle"></div>}
          {page === 5 && <div className="Header_Row_PageInfoIng_bg"></div>}
          <motion.img
            className="img"
            src={get_Src_HeaderImg("settingImg")}
            alt={"사진없음"}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 1 }}
            onClick={() => {
              dispatch(changePage(5));
            }}
          />
        </div>
        <div className="Header_MyBox">
          <MyBox />
        </div>
      </motion.div>
    </>
  );
};
