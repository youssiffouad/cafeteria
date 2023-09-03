import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { ProductContext } from "../../contextStore/productsContext";
const ProductList = () => {
  const prodCtx = useContext(ProductContext);

  return (
    <React.Fragment>
      <h2>view all products</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Product Name</th>
            <th className="col-md-2">Vendor Name</th>
            <th className="col-md-2">Category Name</th>
            <th className="col-md-2">Selling Price</th>
            <th className="col-md-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {prodCtx.prodlist.map((product) => (
            <tr key={product.id}>
              <td>{product.prodname}</td>
              <td>{product.vendorname}</td>
              <td>{product.catname}</td>

              <td>{product.selling_price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ProductList;
