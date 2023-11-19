import React, { useContext, useState } from "react";

import { CustomerContext } from "../../contextStore/customersContext";
import { createPortal } from "react-dom";

const NewCustomerForm = () => {
  const customerCtx = useContext(CustomerContext);

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="add-heading">اضافة مستهلك جديد</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              customerCtx.updatecustlist();
            }}
          >
            <label className="label">
              <input
                type="text"
                value={customerCtx.name}
                className="form-control input"
                onChange={(event) => {
                  customerCtx.updatename(event.target.value);
                }}
              />
            </label>
            <br />
            <label className="label">
              الرتبة / الدرجة:
              <select
                value={customerCtx.rankId}
                className="form-control input"
                onChange={(event) =>
                  customerCtx.updaterankId(event.target.value)
                }
              >
                <option value="">اختر الرتبة/ الدرجة</option>
                {customerCtx.ranks.map((rank) => (
                  <option key={rank.id} value={rank.id}>
                    {rank.name}
                  </option>
                ))}
              </select>
            </label>

            <br />

            <button type="submit" className="btn btn-primary mt-2 add-btn">
              اضافة مستهلك
            </button>
            {createPortal(
              <customerCtx.Msgcomponent />,
              document.getElementById("popup-portal")
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCustomerForm;
