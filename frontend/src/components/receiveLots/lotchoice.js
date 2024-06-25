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
      {toggle ? (
        <LotsWholeConstituent toggleDisplay={toggleDisplay} />
      ) : (
        <LotsWholeProducts toggleDisplay={toggleDisplay} />
      )}
    </>
  );
};
export default LotChoice;
