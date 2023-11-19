import React, { useContext, useState } from "react";

import { ProductContext } from "../../contextStore/productsContext";
import { createPortal } from "react-dom";

const NewProductForm = () => {
  const productsCtx = useContext(ProductContext);

  const handleAddProduct = () => {
    productsCtx.updateprodlist();
  };

  return (
    <div className="container mb-5 add-container" dir="rtl">
      {createPortal(
        <productsCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>اضافة منتج جديد</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleAddProduct();
            }}
          >
            <label className="label">
              :اسم المنتج
              <input
                type="text"
                value={productsCtx.name}
                className="form-control input"
                onChange={(event) => productsCtx.updatename(event.target.value)}
              />
            </label>
            <br />
            <label className="label">
              المورد:
              <select
                value={productsCtx.vendid}
                className="form-control input"
                onChange={(event) =>
                  productsCtx.updateVendorid(event.target.value)
                }
              >
                <option value="">Select Vendor</option>
                {productsCtx.vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="label">
              التصنيف
              <select
                value={productsCtx.catid}
                className="form-control input"
                onChange={(event) =>
                  productsCtx.updatecatid(event.target.value)
                }
              >
                <option value="">Select Category</option>
                {productsCtx.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <br />
            <label className="label">
              سعر البيع:
              <input
                type="text"
                value={productsCtx.sellingPrice}
                className="form-control input"
                onChange={(event) =>
                  productsCtx.updatesellingPrice(event.target.value)
                }
              />
            </label>
            <label className="label">
              سعر الشراء:
              <input
                type="text"
                value={productsCtx.buying_price}
                className="form-control input"
                onChange={(event) =>
                  productsCtx.updatebuying_price(event.target.value)
                }
              />
            </label>
            <br />

            <br />

            <button type="submit" className="btn btn-primary mt-2 add-btn">
              اضافة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;
