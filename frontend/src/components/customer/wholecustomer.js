import React, { useEffect } from "react";
import { CustomerProvider } from "../../contextStore/customersContext";
import NewCustomerForm from "./AddNewCustomer";
import CustomerList from "./CustomerList";
import usePopUp from "../../Hooks/use_popup";
const CustomerWhole = () => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة مستهلك جديد");
  const payloadForm = <NewCustomerForm />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <CustomerProvider>
      <div className="d-flex flex-column align-content-center align-items-center mt-3">
        <ControllerBtn />
        <FormContent />
      </div>
      <CustomerList />
    </CustomerProvider>
  );
};
export default CustomerWhole;
