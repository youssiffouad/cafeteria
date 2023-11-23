import React, { useContext } from "react";

import { CustomerContext } from "../../contextStore/customersContext";
import { createPortal } from "react-dom";

const NewCustomerForm = () => {
  const customerCtx = useContext(CustomerContext);

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading">اضافة مستهلك جديد</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          customerCtx.updatecustlist();
        }}
      >
        <label className="label">
          الاسم
          <input
            type="text"
            value={customerCtx.name}
            className="form-control input"
            onChange={(event) => {
              customerCtx.updatename(event.target.value);
            }}
          />
        </label>

        <label className="label">
          الرتبة / الدرجة:
          <select
            value={customerCtx.rankId}
            className="form-control input"
            onChange={(event) => customerCtx.updaterankId(event.target.value)}
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
  );
};

export default NewCustomerForm;
