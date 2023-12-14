import { useState } from "react";
import AddLotConstituent from "../constituents/addLotConstituent";
import LotsWhole from "./wholeLots";
const LotChoice = () => {
  const [toggle, setoggle] = useState(true);
  const toggleDisplay = () => {
    setoggle((prev) => !prev);
  };
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          toggleDisplay();
          console.log(toggle);
        }}
      >
        {toggle ? "  اضافة منتج" : " اضافة مكون"}
      </button>
      {toggle ? <AddLotConstituent /> : <LotsWhole />}
    </>
  );
};
export default LotChoice;
