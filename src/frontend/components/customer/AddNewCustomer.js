import React, { useContext, useState } from "react";

import { CustomerContext } from "../../contextStore/customersContext";

const NewCustomerForm = () => {
  const customerCtx = useContext(CustomerContext);
  const [isFormValid, setIsFormValid] = useState(true);
  const [iscustValid, setiscustValid] = useState(true);

  const handleAddCustomer = () => {
    if (customerCtx.name.trim().length < 4 || !customerCtx.rankId) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      customerCtx.updatecustlist();
    }
  };
  const handleCustomerLenght = () => {
    if (customerCtx.name.trim().length < 4) {
      setiscustValid(false);
    } else {
      setiscustValid(true);
    }
  };

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="add-heading">اضافة مستهلك جديد</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleAddCustomer();
            }}
          >
            <label className="label">
              اسم المستهلك:{" "}
              {!iscustValid && (
                <p className="text-danger">
                  customer name must be at least 4 characters
                </p>
              )}
              <input
                type="text"
                value={customerCtx.name}
                className="form-control input"
                onChange={(event) => {
                  handleCustomerLenght();
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
            {!isFormValid && (
              <p className="text-danger">
                Please fill in all the required fields.
              </p>
            )}
            <button type="submit" className="btn btn-primary mt-2 add-btn">
              اضافة مستهلك
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCustomerForm;
