import { useState } from "react";

import ProductWhole from "./wholeProduct";

import WholeConstituent from "../constituents/wholeConstituent";

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
      {toggle ? <WholeConstituent /> : <ProductWhole />}
    </>
  );
};
export default ProdChoice;
