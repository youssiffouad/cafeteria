import React from "react";
import { ConstituentProvider } from "../../contextStore/constituentContext";
import { ConstituentLotProvider } from "../../contextStore/constituentLotContext";
import { LotProvider } from "../../contextStore/lotsContext";
import AddLotConstituent from "../constituents/addLotConstituent";
import LotList from "./LotsList";
const LotsWholeConstituent = (props) => {
  return (
    <ConstituentProvider>
      <LotProvider>
        <ConstituentLotProvider>
          {" "}
          <AddLotConstituent toggleDisplay={props.toggleDisplay} />
          <LotList />
        </ConstituentLotProvider>
      </LotProvider>
    </ConstituentProvider>
  );
};

export default LotsWholeConstituent;
