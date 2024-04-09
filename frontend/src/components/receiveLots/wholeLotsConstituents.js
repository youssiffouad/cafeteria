import React, { useEffect } from "react";
import { ConstituentProvider } from "../../contextStore/constituentContext";
import { ConstituentLotProvider } from "../../contextStore/constituentLotContext";
import { LotProvider } from "../../contextStore/lotsContext";
import AddLotConstituent from "../constituents/addLotConstituent";
import LotList from "./LotsList";
import usePopUp from "../../Hooks/use_popup";
const LotsWholeConstituent = (props) => {
  const { ControllerBtn, controlFormJSX, FormContent } = usePopUp("شراء مكون");
  const payloadForm = <AddLotConstituent toggleDisplay={props.toggleDisplay} />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <ConstituentProvider>
      <LotProvider>
        <ConstituentLotProvider>
          {" "}
          <div className="d-flex flex-column align-content-center align-items-center mt-3">
            <ControllerBtn />
            <FormContent />
          </div>
          <LotList />
        </ConstituentLotProvider>
      </LotProvider>
    </ConstituentProvider>
  );
};

export default LotsWholeConstituent;
