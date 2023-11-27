import React, { useContext, useEffect } from "react";

import { ProductContext } from "../../contextStore/productsContext";
import { createPortal } from "react-dom";

const NewProductForm = () => {
  const productsCtx = useContext(ProductContext);

  useEffect(() => {
    console.log(productsCtx.errors);
    console.log(productsCtx.getErrorMsg("prodName"));
    console.log(productsCtx.getErrorMsg("vendorId"));
    console.log(productsCtx.getErrorMsg("catid"));
    console.log(productsCtx.getErrorMsg("sellingPrice"));
    console.log(productsCtx.getErrorMsg("buying_price"));
  }, [productsCtx.errors]);

  const submissionHandler = (formdata) => {
    const { prodName, vendorId, catid, sellingPrice, buying_price } = formdata;
    console.log(` here is the product name :${prodName}`);
    console.log(` here is the vendorId :${vendorId}`);
    console.log(` here is the catid :${catid}`);
    console.log(` here is the sellingPrice :${sellingPrice}`);
    console.log(` here is the buying_price :${buying_price}`);

    console.log(productsCtx.errors);

    // productsCtx.updatecustlist();
  };

  return (
    <div className="add-container" dir="rtl">
      {createPortal(
        <productsCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}

      <h5>اضافة منتج جديد</h5>
      <form
        onSubmit={(event) => {
          const formdata = {
            prodName: productsCtx.formState.prodName.value,
            catid: productsCtx.formState.catid.value,
            vendorId: productsCtx.formState.vendorId.value,
            sellingPrice: productsCtx.formState.sellingPrice.value,
            buying_price: productsCtx.formState.buying_price.value,
          };
          event.preventDefault();
          submissionHandler(formdata);
        }}
      >
        <label className="label">
          :اسم المنتج
          <input
            name="prodName"
            type="text"
            value={productsCtx.formState.prodName.value}
            className={`form-control input ${
              !productsCtx.formState.prodName.valid && "is-invalid"
            }`}
            onChange={(event) => {
              productsCtx.handleInputChange(event);
              productsCtx.validateField(
                event.target.name,
                "name",
                event.target.value
              );
            }}
          />
        </label>

        <label className="label">
          المورد:
          <select
            name="vendorId"
            value={productsCtx.formState.vendorId.value}
            className={`form-control input ${
              !productsCtx.formState.vendorId.valid && "is-invalid"
            }`}
            onChange={(event) => {
              productsCtx.handleInputChange(event);
              productsCtx.validateField(
                event.target.name,
                "number",
                event.target.value
              );
            }}
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
            name="catid"
            value={productsCtx.formState.catid.value}
            className={`form-control input ${
              !productsCtx.formState.catid.valid && "is-invalid"
            }`}
            onChange={(event) => {
              productsCtx.handleInputChange(event);
              productsCtx.validateField(
                event.target.name,
                "name",
                event.target.value
              );
            }}
          >
            <option value="">Select Category</option>
            {productsCtx.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          سعر البيع:
          <input
            type="text"
            name="sellingPrice"
            value={productsCtx.sellingPrice}
            className={`form-control input ${
              !productsCtx.formState.sellingPrice.valid && "is-invalid"
            }`}
            onChange={(event) => {
              productsCtx.handleInputChange(event);
              productsCtx.validateField(
                event.target.name,
                "number",
                event.target.value
              );
            }}
          />
        </label>
        <label className="label">
          سعر الشراء:
          <input
            type="text"
            name="buying_price"
            value={productsCtx.buying_price}
            className={`form-control input ${
              !productsCtx.formState.buying_price.valid && "is-invalid"
            }`}
            onChange={(event) => {
              productsCtx.handleInputChange(event);
              productsCtx.validateField(
                event.target.name,
                "number",
                event.target.value
              );
            }}
          />
        </label>

        <br />

        <button type="submit" className="btn btn-primary mt-2 add-btn">
          اضافة
        </button>
      </form>
    </div>
  );
};

export default NewProductForm;
