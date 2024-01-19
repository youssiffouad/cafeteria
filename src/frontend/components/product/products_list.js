import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { ProductContext } from "../../contextStore/productsContext";
import { formatNo } from "../../Hooks/formatno";
const ProductList = () => {
  const prodCtx = useContext(ProductContext);

  return (
    <React.Fragment>
      <h2 dir="rtl" className="text-center">
        بيانات المنتجات
      </h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2">اسم المنتج</th>
            <th className="col-md-2">اسم المورد</th>
            <th className="col-md-2">التصنيف</th>
            <th className="col-md-2">سعر البيع</th>
            <th className="col-md-2">سعر الشراء</th>
            <th className="col-md-2">الكمية</th>
            <th className="col-md-2">قيمة المخزون</th>
          </tr>
        </thead>
        <tbody>
          {prodCtx.prodlist.map((product) => (
            <tr key={product.id}>
              <td>{product.prodname}</td>
              <td>{product.vendorname}</td>
              <td>{product.catname}</td>

              <td>{product.selling_price}</td>
              <td>{formatNo(product.buying_price)}</td>
              <td>{product.quantity}</td>
              <td>
                {product.quantity * product.selling_price}

                <FontAwesomeIcon
                  className="me-4"
                  icon={faTrash}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    prodCtx.deleteProduct(product.id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ProductList;
