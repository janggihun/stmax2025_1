import style from "./Loading.module.css";
import { useSelector } from "react-redux";

export const Loading = () => {
  const isLoading = useSelector((state) => state.loadingFlag.value);

  if (isLoading) {
    return (
      <div className={style.Loading_Container}>
        <div className={style.Loading_App}>
          <img className={style.Loading_App} src="/Loading/loading2.gif" alt="없음" />
        </div>
      </div>
    );
  }
};
