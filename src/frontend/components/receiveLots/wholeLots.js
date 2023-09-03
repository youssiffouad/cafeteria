import React from "react";
import { LotProvider } from "../../contextStore/lotsContext";
import AddNewLot from "./addnewlot";
import LotList from "./LotsList";
import FilterLots from "./filterLots";
const LotsWhole = () => {
  return (
    <LotProvider>
      <AddNewLot />
      <LotList />
      <FilterLots />
    </LotProvider>
  );
};

export default LotsWhole;
