import React from "react";
import { LotProvider } from "../../contextStore/lotsContext";
import AddNewLot from "./addnewlot";
import LotList from "./LotsList";
import FilterLots from "./filterLots";
import { OrderItemProvider } from "../../contextStore/Order/OrderItemContext";
const LotsWholeProducts = (props) => {
  return (
    <OrderItemProvider>
      <LotProvider>
        <AddNewLot toggleDisplay={props.toggleDisplay} />
        <LotList />
        {/* <FilterLots /> */}
      </LotProvider>
    </OrderItemProvider>
  );
};

export default LotsWholeProducts;
