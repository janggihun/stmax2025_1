import { Display } from "./Display/Display";
import "./InfoBox.css";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo/Logo";
import { NoteInfo } from "./NoteInfo/NoteInfo";

export const InfoBox = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        exit={{ x: -500 }}
        transition={{ duration: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        className="InfoBox_Container"
      >
        <Display />
        <NoteInfo />
        <Logo />
      </motion.div>
    </AnimatePresence>
  );
};
