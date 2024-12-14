import { InfoBoard } from "./InfoBoard/InfoBoard";
import { InfoBox } from "./InfoBox/InfoBox";

import "./Stmax.css";

export const STMAX = () => {
  return (
    <div className="Base_container">
      <InfoBox />
      <InfoBoard />
    </div>
  );
};
