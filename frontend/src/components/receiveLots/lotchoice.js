import { useState } from "react";

import LotsWholeConstituent from "./wholeLotsConstituents";
import LotsWholeProducts from "./wholeLotsProducts";
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
      {toggle ? <LotsWholeConstituent /> : <LotsWholeProducts />}
    </>
  );
};
export default LotChoice;
