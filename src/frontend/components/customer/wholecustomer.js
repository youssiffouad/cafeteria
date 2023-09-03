import React from "react";
import { CustomerProvider } from "../../contextStore/customersContext";
import NewCustomerForm from "./AddNewCustomer";
import CustomerList from "./CustomerList";
const CustomerWhole = () => {
  return (
    <CustomerProvider>
      <NewCustomerForm />
      <CustomerList />
    </CustomerProvider>
  );
};
export default CustomerWhole;
