import { useState } from "react";
import { ConstituentProvider } from "../../contextStore/constituentContext";
import { ConstituentLotProvider } from "../../contextStore/constituentLotContext";
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
      {toggle ? (
        <ConstituentProvider>
          <ConstituentLotProvider>
            {" "}
            <AddLotConstituent />
          </ConstituentLotProvider>
        </ConstituentProvider>
      ) : (
        <LotsWhole />
      )}
    </>
  );
};
export default LotChoice;
