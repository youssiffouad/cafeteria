import { useState } from "react";

import ProductWhole from "./wholeProduct";
import AddNewConstituent from "../constituents/addnewCostituent";
import { ConstituentProvider } from "../../contextStore/constituentContext";

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
      {toggle ? (
        <ConstituentProvider>
          <AddNewConstituent />
        </ConstituentProvider>
      ) : (
        <ProductWhole />
      )}
    </>
  );
};
export default ProdChoice;
