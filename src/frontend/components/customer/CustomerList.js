import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
              <td className="d-flex justify-content-between">
                {customer.debt}
                <FontAwesomeIcon
                  className="me-0"
                  icon={faTrash}
                  onClick={() => customerCtx.deleteCustomer(customer.id)} // Call handleDeleteOrder when the delete icon is clicked
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default CustomerList;
