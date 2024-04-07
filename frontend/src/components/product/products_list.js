import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { ProductContext } from "../../contextStore/productsContext";
const ProductList = () => {
  const prodCtx = useContext(ProductContext);

  return (
    <React.Fragment>
      <h2 dir="rtl" className="text-center tableTitlefont">
        بيانات المنتجات
      </h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2 tableHeadfont">اسم المنتج</th>
            <th className="col-md-2 tableHeadfont">اسم المورد</th>
            <th className="col-md-2 tableHeadfont">التصنيف</th>
            <th className="col-md-2 tableHeadfont">سعر البيع</th>
            <th className="col-md-2 tableHeadfont">سعر الشراء</th>
            <th className="col-md-2 tableHeadfont">الكمية</th>
            <th className="col-md-2 tableHeadfont">قيمة المخزون</th>
          </tr>
        </thead>
        <tbody>
          {prodCtx.prodlist.map((product) => (
            <tr key={product.id}>
              <td>{product.prodname}</td>
              <td>{product.vendorname}</td>
              <td>{product.catname}</td>

              <td>{product.selling_price}</td>
              <td>{product.buying_price}</td>
              <td>{product.quantity}</td>
              <td>{product.quantity * product.selling_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ProductList;
