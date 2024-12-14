import { useState } from "react";
import "./Loading.css";

const Loading3 = () => {
  return (
    <div className="Loading_Container3">
      <div className="Loading_App">
        <img className="Loading_status1" src="/Loading/loading2.gif" alt="없음" />
      </div>
    </div>
  );
};

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const openLoading = () => {
    setIsLoading(true);
  };
  const closeLoading = () => {
    setIsLoading(false);
  };
  const renderLoading = () => {
    if (isLoading) return <Loading3 />;
  };
  return { openLoading, closeLoading, renderLoading };
};
