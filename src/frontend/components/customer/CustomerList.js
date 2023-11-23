import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { CustomerContext } from "../../contextStore/customersContext";
const CustomerList = () => {
  const customerCtx = useContext(CustomerContext);

  return (
    <React.Fragment>
      <h2 className="text-center">بيانات المستهلكين</h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2">الرتبة /الدرجة</th>
            <th className="col-md-2">اسم المستهلك</th>
            <th className="col-md-2">التقريشة المستحقة </th>
          </tr>
        </thead>
        <tbody>
          {customerCtx.custlist.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.rankname}</td>
              <td>{customer.custname}</td>
              <td>{customer.debt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default CustomerList;
