import "./InfoBoard.css";
import { AnimatePresence, motion } from "framer-motion";
import { Category } from "./Category/Category";
import { MusicBoard } from "./MusicBoard/MusicBoard";
export const InfoBoard = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: 500 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        className="InfoBoard_Container"
      >
        <Category />
        <MusicBoard />
      </motion.div>
    </AnimatePresence>
  );
};
