import React from "react";
import NewVendorForm from "./AddNewVendor";

import VendorList from "./vendor_list";
import { VendorProvider } from "../../contextStore/vendorsContext";
const VendorWhole = () => {
  return (
    <VendorProvider>
      <NewVendorForm />
      <VendorList />
    </VendorProvider>
  );
};
export default VendorWhole;
