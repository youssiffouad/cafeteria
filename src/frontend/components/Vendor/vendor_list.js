import React, { useContext } from "react";
import "../../UI/responsivetable.css";

import { vendorContext } from "../../contextStore/vendorsContext";

const VendorList = () => {
  const vendorCtx = useContext(vendorContext);

  return (
    <React.Fragment>
      <h2 className="text-center ">بيانات الموردين</h2>
      <table
        className="table table-striped table-bordered table-hover  myResponsiveTable "
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2">رقم المسلسل</th>
            <th className="col-md-2">الاسم</th>
            <th className="col-md-2">التليفون</th>
            <th className="col-md-2">المبلغ المستحق</th>
          </tr>
        </thead>
        <tbody>
          {vendorCtx.vendorlist.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>{vendor.name}</td>
              <td>{vendor.phone}</td>
              <td>{vendor.owedmoney}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default VendorList;
