import { useEffect, useState } from "react";
import { addConnectUs, getConnectUs } from "../../RestApi";

export const useView = () => {
  const [view, setView] = useState(0);

  useEffect(() => {
    get_view();
  }, []);
  const get_view = async () => {
    const res = await getConnectUs();
    setView(res.allView);
  };
  const increaseView = async () => {
    await addConnectUs();
    await get_view();
  };
  return { view, increaseView };
};
