import React, { useContext } from "react";

import { vendorContext } from "../../contextStore/vendorsContext";
import { createPortal } from "react-dom";

const NewVendorForm = () => {
  const vendorCtx = useContext(vendorContext);

  return (
    <div className=" add-container" dir="rtl">
      {createPortal(
        <vendorCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}

      <h2 className="add-heading">اضافة مورد جديد</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          vendorCtx.updatevendorlist();
        }}
      >
        <label className="label">
          اسم المورد
          <input
            type="text"
            value={vendorCtx.name}
            onChange={(event) => vendorCtx.updatename(event.target.value)}
            className="form-control input"
          />
        </label>

        <label className="label">
          رقم التليفون
          <input
            type="text"
            value={vendorCtx.phone}
            onChange={(event) => vendorCtx.updatephone(event.target.value)}
            className="form-control input"
          />
        </label>
        <br />
        <button type="submit" className="btn btn-primary mt-2 add-btn ">
          اضافة
        </button>
      </form>
    </div>
  );
};

export default NewVendorForm;
