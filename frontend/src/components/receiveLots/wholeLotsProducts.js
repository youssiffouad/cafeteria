import React, { useEffect } from "react";
import { LotProvider } from "../../contextStore/lotsContext";
import AddNewLot from "./addnewlot";
import LotList from "./LotsList";
import FilterLots from "./filterLots";
import { OrderItemProvider } from "../../contextStore/Order/OrderItemContext";
import usePopUp from "../../Hooks/use_popup";
const LotsWholeProducts = (props) => {
  const { ControllerBtn, controlFormJSX, FormContent } = usePopUp("شراء منتج");
  const payloadForm = <AddNewLot toggleDisplay={props.toggleDisplay} />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <OrderItemProvider>
      <LotProvider>
        <div className="d-flex flex-column align-content-center align-items-center mt-3">
          <ControllerBtn />
          <FormContent />
        </div>
        <LotList />
        {/* <FilterLots /> */}
      </LotProvider>
    </OrderItemProvider>
  );
};

export default LotsWholeProducts;
