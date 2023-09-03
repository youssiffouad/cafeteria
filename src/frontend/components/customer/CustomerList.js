import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { CustomerContext } from "../../contextStore/customersContext";
const CustomerList = () => {
  const customerCtx = useContext(CustomerContext);

  return (
    <React.Fragment>
      <h2>view all customers</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Rank</th>
            <th className="col-md-2">Customer Name</th>
          </tr>
        </thead>
        <tbody>
          {customerCtx.custlist.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.rankname}</td>
              <td>{customer.custname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default CustomerList;
