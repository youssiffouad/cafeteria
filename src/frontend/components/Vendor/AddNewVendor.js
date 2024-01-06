import React, { useContext } from "react";

import { vendorContext } from "../../contextStore/vendorsContext";
import { createPortal } from "react-dom";

const NewVendorForm = () => {
  const vendorCtx = useContext(vendorContext);
  const submissionHandler = (formdata) => {
    const { name, phone } = formdata;
    const v1 = vendorCtx.validateField("name", "name", name);
    const v2 = vendorCtx.validateField("phone", "number", phone);
    if (v1 && v2) vendorCtx.updatevendorlist();
  };

  return (
    <div className=" add-container" dir="rtl">
      {createPortal(
        <vendorCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}

      <h2 className="add-heading">اضافة مورد جديد</h2>
      <form
        onSubmit={(event) => {
          const formdata = {
            name: vendorCtx.formState.name.value,
            phone: vendorCtx.formState.phone.value,
          };
          event.preventDefault();
          submissionHandler(formdata);
        }}
      >
        <div className="row">
          <div className="col">
            <label className="label">
              اسم المورد
              <input
                name="name"
                type="text"
                value={vendorCtx.name}
                onChange={(event) => {
                  vendorCtx.handleInputChange(event);
                  vendorCtx.validateField(
                    event.target.name,
                    "name",
                    event.target.value
                  );
                }}
                className={`form-control input ${
                  !vendorCtx.formState.name.valid && "is-invalid"
                }`}
              />
            </label>
            {!vendorCtx.formState.name.valid && (
              <p className="text-danger">{vendorCtx.getErrorMsg("name")}</p>
            )}
          </div>
          <div className="col">
            <label className="label">
              رقم التليفون
              <input
                name="phone"
                type="text"
                value={vendorCtx.phone}
                onChange={(event) => {
                  vendorCtx.handleInputChange(event);
                  vendorCtx.validateField(
                    event.target.name,
                    "number",
                    event.target.value
                  );
                }}
                className={`form-control input ${
                  !vendorCtx.formState.phone.valid && "is-invalid"
                }`}
              />
            </label>
            {!vendorCtx.formState.phone.valid && (
              <p className="text-danger">{vendorCtx.getErrorMsg("phone")}</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2 add-btn ">
          اضافة
        </button>
      </form>
    </div>
  );
};

export default NewVendorForm;
