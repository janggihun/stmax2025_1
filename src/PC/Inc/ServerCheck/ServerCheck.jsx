import { useEffect, useState } from "react";
import "../../../style/Tooltip.css";
import { dbCheck } from "../../../RestApi";

export const ServerCheck = () => {
  const [dbMap, setDbMap] = useState();
  useEffect(() => {
    const getDb = async () => {
      //off시작
      setDbMap({ msg: "OFF", color: "red" });
      const res = await dbCheck();
      //db연결 정상시 on으로 변경됨
      setDbMap(res);
    };
    getDb();
  }, []);
  const toolMap = {
    on: "전체 게임 이용 가능",
    off: "칭호 갱신 불가, 랭킹불가 , 리플레이불가 , 게임내용 저장 불가",
  };
  return (
    <>
      {dbMap && (
        <>
          <div className="Tooltip" tooltip={dbMap.msg === "ON" ? toolMap.on : toolMap.off}>
            <div>
              서버 상태 : <font style={{ color: dbMap.color && dbMap.color }}>{dbMap.msg}</font>
            </div>
          </div>
        </>
      )}
    </>
  );
};
