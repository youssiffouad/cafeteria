import React, { useEffect } from "react";
import NewVendorForm from "./AddNewVendor";

import VendorList from "./vendor_list";
import { VendorProvider } from "../../contextStore/vendorsContext";
import usePopUp from "../../Hooks/use_popup";
const VendorWhole = () => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة مورد جديد");
  const payloadForm = <NewVendorForm />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <VendorProvider>
      <div className="d-flex flex-column align-content-center align-items-center mt-3">
        <ControllerBtn />
        <FormContent />
      </div>
      <VendorList />
    </VendorProvider>
  );
};
export default VendorWhole;
