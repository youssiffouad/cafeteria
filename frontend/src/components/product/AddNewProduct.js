import React, { useContext, useEffect } from "react";

import { ProductContext } from "../../contextStore/productsContext";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const NewProductForm = (props) => {
  const productsCtx = useContext(ProductContext);

  useEffect(() => {
    console.log(productsCtx.errors);
  }, [productsCtx.errors]);

  const submissionHandler = (formdata) => {
    const { prodName, vendorId, catid, sellingPrice, buying_price } = formdata;

    const v1 = productsCtx.validateField("prodName", "name", prodName);
    const v2 = productsCtx.validateField("vendorId", "name", vendorId);
    const v3 = productsCtx.validateField("catid", "name", catid);
    const v4 = productsCtx.validateField("sellingPrice", "name", sellingPrice);
    const v5 = productsCtx.validateField("buying_price", "name", buying_price);

    console.log(productsCtx.errors);

    if (v1 && v2 && v3 && v4 && v5) productsCtx.updateprodlist();
  };

  return (
    <div className="add-container position-relative" dir="rtl">
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
        <div className="row">
          <div className="col">
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
            {!productsCtx.formState.prodName.valid && (
              <p className="text-danger">
                {productsCtx.getErrorMsg("prodName")}
              </p>
            )}
          </div>
          <div className="col">
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
                    "name",
                    event.target.value
                  );
                }}
              >
                <option value="">Select Vendor</option>
                {productsCtx.vendors.map((vendor) => (
                  <option
                    key={vendor.id}
                    value={vendor.id}
                    className="inputValue"
                  >
                    {vendor.name}
                  </option>
                ))}
              </select>
              {!productsCtx.formState.vendorId.valid && (
                <p className="text-danger">
                  {productsCtx.getErrorMsg("vendorId")}
                </p>
              )}
            </label>
          </div>
          <div className="col">
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
                {productsCtx.categories.map((category) => {
                  if (category.id !== 1)
                    return (
                      <option
                        key={category.id}
                        value={category.id}
                        className="inputValue"
                      >
                        {category.name}
                      </option>
                    );
                })}
              </select>
              {!productsCtx.formState.catid.valid && (
                <p className="text-danger">
                  {productsCtx.getErrorMsg("catid")}
                </p>
              )}
            </label>
          </div>
          <div className="col">
            <label className="label">
              سعر البيع:
              <input
                type="number"
                name="sellingPrice"
                value={productsCtx.formState.sellingPrice.value}
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
              {!productsCtx.formState.sellingPrice.valid && (
                <p className="text-danger">
                  {productsCtx.getErrorMsg("sellingPrice")}
                </p>
              )}
            </label>
          </div>
          <div className="col">
            <label className="label">
              سعر الشراء:
              <input
                type="number"
                name="buying_price"
                value={productsCtx.formState.buying_price.value}
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
            {!productsCtx.formState.buying_price.valid && (
              <p className="text-danger">
                {productsCtx.getErrorMsg("buying_price")}
              </p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2 add-btn">
          اضافة
        </button>
      </form>
      {/* <button
        className="position-absolute btn btn-outline-info"
        style={{ bottom: "-23%", right: "0" }}
        onClick={() => props.toggleDisplay()}
      >
        اظهار المكونات <FontAwesomeIcon icon={faArrowsRotate} />
      </button> */}
    </div>
  );
};

export default NewProductForm;
