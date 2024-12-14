import { useDispatch, useSelector } from "react-redux";
import { StelliveList } from "../../../../../common/Array";
import "./Category.css";
import { get_Src_Img } from "../../../../../common/Base";
import { motion } from "framer-motion";
import { changeCategory } from "../../../../../Store/CategorySlice";
export const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.value);

  return (
    <div className="Category_Container">
      <div className="Category_Singer_Name sort font20" style={{ color: category.color }}>
        {category.singer}
      </div>

      {StelliveList.map((el, i) => {
        return (
          <div className="Category_SingerBox" key={i}>
            <div className="Category_Singer_Img ">
              <motion.img
                className="img "
                src={get_Src_Img(el.eng)}
                alt="사진없음"
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  dispatch(changeCategory(el));
                }}
                style={
                  el.StelliveCnt === category.StelliveCnt
                    ? { filter: "grayscale(0%)" }
                    : { filter: "grayscale(100%)" }
                }
              />
            </div>
            <div
              className={
                category.StelliveCnt === el.StelliveCnt && el.StelliveCnt !== 0
                  ? "Category_Row_Bottom "
                  : ""
              }
            ></div>{" "}
            <div
              className={
                category.StelliveCnt === el.StelliveCnt && el.StelliveCnt !== 0
                  ? "Category_Row_Top"
                  : ""
              }
            ></div>
          </div>
        );
      })}
    </div>
  );
};
