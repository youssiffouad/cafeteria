import React, { useContext, useEffect } from "react";

import { CustomerContext } from "../../contextStore/customersContext";
import { createPortal } from "react-dom";

const NewCustomerForm = () => {
  const customerCtx = useContext(CustomerContext);
  useEffect(() => {
    console.log(customerCtx.errors);
    console.log(customerCtx.getErrorMsg("customerName"));
    console.log(customerCtx.getErrorMsg("customerRank"));
  }, [customerCtx.errors]);

  const submissionHandler = (formdata) => {
    const { customerName, customerRank } = formdata;
    console.log(` here is the customer name :${customerName}`);
    console.log(
      customerCtx.validateField("customerName", "name", customerName)
    );
    console.log(` here is the rank name :${customerRank}`);
    console.log(
      customerCtx.validateField("customerRank", "dropdown", customerRank)
    );

    const v2 = customerCtx.validateField(
      "customerRank",
      "dropdown",
      customerRank
    );
    const v1 = customerCtx.validateField("customerName", "name", customerName);

    if (v1 && v2) console.log("success");

    console.log(customerCtx.errors);

    // customerCtx.updatecustlist();
  };

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading">اضافة مستهلك جديد</h5>
      <form
        onSubmit={(event) => {
          const formdata = {
            customerName: customerCtx.formState.customerName.value,
            customerRank: customerCtx.formState.customerRank.value,
          };
          event.preventDefault();
          submissionHandler(formdata);
        }}
      >
        <div className="row">
          <div className="col">
            <label className="label">
              الاسم
              <input
                name="customerName"
                type="text"
                value={customerCtx.formState.customerName.value}
                className={`form-control input ${
                  !customerCtx.formState.customerName.valid && "is-invalid"
                }`}
                onChange={(event) => {
                  customerCtx.handleInputChange(event);
                  customerCtx.validateField(
                    event.target.name,
                    "name",
                    event.target.value
                  );
                }}
              />
            </label>
            {!customerCtx.formState.customerName.valid && (
              <p className="text-danger">
                {customerCtx.getErrorMsg("customerName")}
              </p>
            )}
          </div>
          <div className="col">
            <label className="label">
              الرتبة / الدرجة:
              <select
                name="customerRank"
                value={customerCtx.formState.customerRank.value}
                className={`form-control input ${
                  !customerCtx.formState.customerRank.valid && "is-invalid"
                }`}
                onChange={(event) => {
                  customerCtx.handleInputChange(event);
                  customerCtx.validateField(
                    event.target.name,
                    "dropdown",
                    event.target.value
                  );
                }}
              >
                <option value="">اختر الرتبة/ الدرجة</option>
                {customerCtx.ranks.map((rank) => (
                  <option key={rank.id} value={rank.id}>
                    {rank.name}
                  </option>
                ))}
              </select>
            </label>
            {!customerCtx.formState.customerRank.valid && (
              <p className="text-danger">
                {customerCtx.getErrorMsg("customerRank")}
              </p>
            )}
          </div>
        </div>

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
