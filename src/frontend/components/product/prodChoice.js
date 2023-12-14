import { useState } from "react";

import ProductWhole from "./wholeProduct";
import AddNewConstituent from "../constituents/addnewCostituent";

const ProdChoice = () => {
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
        {toggle ? "  اظهار المنتجات" : " اظهار المكونات"}
      </button>
      {toggle ? <AddNewConstituent /> : <ProductWhole />}
    </>
  );
};
export default ProdChoice;
