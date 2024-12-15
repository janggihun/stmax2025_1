import "./Loading.css";
import { useSelector } from "react-redux";

export const Loading = () => {
  const isLoading = useSelector((state) => state.loadingFlag.value);

  if (isLoading) {
    return (
      <div className="Loading_Container3">
        <div className="Loading_App">
          <img className="Loading_status1" src="/Loading/loading2.gif" alt="없음" />
        </div>
      </div>
    );
  }
};
