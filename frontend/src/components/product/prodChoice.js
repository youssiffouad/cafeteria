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
      {toggle ? (
        <WholeConstituent toggleDisplay={toggleDisplay} />
      ) : (
        <ProductWhole toggleDisplay={toggleDisplay} />
      )}
    </>
  );
};
export default ProdChoice;
