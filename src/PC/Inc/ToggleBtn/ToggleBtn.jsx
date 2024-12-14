import { changeKeyType } from "../../../Store/KeyTypeSlice";
import "./ToggleBtn.css";
import { useDispatch, useSelector } from "react-redux";

//4키 7키 선택 버튼
export const ToggleBtn = () => {
  const keyType = useSelector((state) => {
    return state.keyType.value;
  });
  const dispatch = useDispatch();

  return (
    <div
      className="ToggleBtn_Container"
      style={keyType === 4 ? { backgroundColor: "green" } : { backgroundColor: "blue" }}
      onClick={() => {
        // changeKeyType();
        dispatch(changeKeyType(keyType === 4 ? 7 : 4));
      }}
    >
      <div className="ToggleBtn_keyBox" style={keyType === 4 ? { left: "50%" } : { left: "25%" }}>
        {keyType}KEY
      </div>
      <div
        className="ToggleBtn_Circle"
        style={keyType === 4 ? { left: "5%" } : { left: "68%" }}
      ></div>
    </div>
  );
};
