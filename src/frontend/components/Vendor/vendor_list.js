import React, { useContext } from "react";

import { vendorContext } from "../../contextStore/vendorsContext";

const VendorList = () => {
  const vendorCtx = useContext(vendorContext);

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <h2>list of all Vendors</h2>
        <tr>
          <th className="col-md-2">ID</th>
          <th className="col-md-2">Name</th>
          <th className="col-md-2">Phone</th>
        </tr>
      </thead>
      <tbody>
        {vendorCtx.vendorlist.map((vendor) => (
          <tr key={vendor.id}>
            <td>{vendor.id}</td>
            <td>{vendor.name}</td>
            <td>{vendor.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VendorList;
