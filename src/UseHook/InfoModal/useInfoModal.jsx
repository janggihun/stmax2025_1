import { useState } from "react";
import "./useInfoModal.css";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { closeModal } from "../../Store/ModalSlice";
export const useInfoModal = () => {
  const [infoFlag, setInfoFlag] = useState();
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const openInfoModalwithMessage = (value) => {
    setMessage(value);
    setInfoFlag(true);
  };
  const closeInfoModal = () => {
    dispatch(closeModal());
    setInfoFlag(false);
  };

  const renderInfo = () => {
    return (
      <>
        <AnimatePresence mode="wait">
          {infoFlag && (
            <motion.div
              className="useInfoModal_Container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="useInfoModal_Bg"
                onClick={() => {
                  closeInfoModal();
                }}
              ></div>
              <div className="useInfoModal_Contents">
                <div className="useInfoModal_Contents_Top sort"> {message}</div>
                <div className="useInfoModal_Contents_Bottom sort">
                  <button
                    className="btn-two"
                    onClick={() => {
                      closeInfoModal();
                    }}
                  >
                    닫기
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  };

  return { openInfoModalwithMessage, closeInfoModal, renderInfo };
};
