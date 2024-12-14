import { useEffect, useState } from "react";
import "./Notice.css";
import { AnimatePresence, motion } from "framer-motion";
import { getUpdateDetailInfo, getUpdateInfo } from "../../../RestApi";
import { useLoading } from "../../../UseHook/Loading/Loading";
import { openModal } from "../../../Store/ModalSlice";
import { useDispatch } from "react-redux";
import { timestamp } from "../../../common/Base";
export const Notice = () => {
  const [updateList, setUpdateList] = useState();
  const [pageMap, setPageMap] = useState();
  const [detailMap, setDetailMap] = useState();
  const dispatch = useDispatch();
  //로딩모달

  const { openLoading, closeLoading, renderLoading } = useLoading();
  const getInit = async (cnt, dir) => {
    if (cnt === -1) {
      dispatch(openModal("가장 최신 업데이트 정보 입니다."));
      return false;
    } else if (pageMap) {
      const check1 = Math.ceil(cnt / 10) * 10;
      const check2 = Math.ceil(pageMap.allRow / 10) * 10;

      if (check1 === check2) {
        dispatch(openModal("가장 마지막 업데이트 정보 입니다."));
        return false;
      }
    }
    openLoading();
    if (dir === "right") {
      const res = await getUpdateInfo(Math.ceil(cnt / 10) * 10);

      setPageMap(res.page);
      setUpdateList(res.NoticeList);

      closeLoading();
    } else if (dir === "left") {
      const res = await getUpdateInfo(Math.floor(cnt / 10) * 10);

      setPageMap(res.page);
      setUpdateList(res.NoticeList);
      closeLoading();
    } else {
      const res = await getUpdateInfo(cnt);

      setPageMap(res.page);
      setUpdateList(res.NoticeList);
      closeLoading();
    }
  };
  useEffect(() => {
    getInit(0);
  }, []);

  const clickUpdate = async (el) => {
    await getUpdateDetailInfo(el.updateCnt);
    setDetailMap(el);
  };

  const convertMapToString = (detailMap) => {
    const tempList = detailMap.notice.split("/");

    return tempList.map((el) => {
      return (
        <div className="Notice_UpdateBox_Contents_Row1">
          <div>★ {el}</div>
        </div>
      );
    });
  };
  return (
    <AnimatePresence>
      <div className="Base_container">
        <div className="Notice_Top"></div>
        <div className="Notice_Container">
          <motion.div
            initial={{ x: -500 }}
            animate={{ x: 0 }}
            exit={{ x: -500 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            className="Notice_Left "
          >
            <div className="Notice_UpdateBox">
              <div className="Notice_UpdateBox_Top sort font20">날짜별 업데이트</div>
              <div>
                {updateList &&
                  updateList.map((el, i) => {
                    return (
                      <div className="Notice_UpdateBox_Row">
                        <div
                          className="Notice_UpdateBox_Row_date"
                          style={
                            el.noticeDate === timestamp()
                              ? { backgroundColor: "purple", color: "white" }
                              : {}
                          }
                        >
                          {el.noticeDate === timestamp() ? "Today" : el.noticeDate}
                        </div>
                        <motion.div
                          style={
                            detailMap && el.noticeDate === detailMap.noticeDate
                              ? { backgroundColor: "rgba(79, 30, 113, 0.8)", color: "white" }
                              : {}
                          }
                          className="Notice_UpdateBox_Row_title"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            clickUpdate(el);
                          }}
                        >
                          업데이트 및 점검 {"<클릭> 조회수: " + el.views}
                        </motion.div>
                      </div>
                    );
                  })}
              </div>
              <div className="Notice_UpdateBox_Bottom sort font20">
                <div
                  style={{ width: "10%", height: "60%" }}
                  onClick={() => {
                    getInit(pageMap.prePage, "left");
                  }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="img"
                    src="/arrow/left.png"
                    alt="없음"
                  />
                </div>
                <div
                  style={{ width: "10%", height: "60%" }}
                  onClick={() => {
                    getInit(pageMap.nextPage, "right");
                  }}
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="img"
                    src="/arrow/right.png"
                    alt="없음"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            className="Notice_Right sort"
          >
            <div className="Notice_UpdateBox_Contents">
              <div className="Notice_UpdateBox_Contents_Top sort font20">
                {detailMap && detailMap.noticeDate}
              </div>
              {detailMap && (
                <div className="Notice_UpdateBox_Contents_Body">
                  {convertMapToString(detailMap)}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {renderLoading()}
    </AnimatePresence>
  );
};
