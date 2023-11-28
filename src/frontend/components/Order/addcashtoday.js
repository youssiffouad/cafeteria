import React, { useContext, useEffect } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { createPortal } from "react-dom";
const CashOfToday = () => {
  const cashCtx = useContext(OrderContext);

  useEffect(() => {
    console.log(cashCtx.errors);
    console.log(cashCtx.validateField());
    console.log(cashCtx.getErrorMsg("cashtoday"));
    console.log(cashCtx.getErrorMsg("orderDate"));
  }, [cashCtx.errors]);

  const submissionHandler = (formdata) => {
    const { cashtoday, orderDate } = formdata;
    console.log(` here is the customer name :${cashtoday}`);

    console.log(` here is the rank name :${orderDate}`);
    cashCtx.validateField("cashtoday", "name", cashtoday);
    cashCtx.validateField("orderDate", "name", orderDate);

    console.log(cashCtx.errors);

    //  cashCtx.updateCashofToday();
  };
  return (
    <>
      <div className=" add-container " dir="rtl">
        {createPortal(
          <cashCtx.Msgcomponent />,
          document.getElementById("popup-portal")
        )}
        <h5>اضافة كاش اليوم</h5>
        <form
          onSubmit={(event) => {
            const formdata = {
              cashtoday: cashCtx.formState.cashtoday.value,
              orderDate: cashCtx.formState.orderDate.value,
            };
            event.preventDefault();
            submissionHandler(formdata);
          }}
        >
          <div className="row">
            <div className="col">
              <label className="label">
                قيمة الكاش
                <input
                  name="cashtoday"
                  className={`form-control input ${
                    !cashCtx.formState.cashtoday.valid && "is-invalid"
                  }`}
                  type="text"
                  value={cashCtx.formState.cashtoday.value}
                  onChange={(event) => {
                    cashCtx.handleInputChange(event);
                    cashCtx.validateField(
                      event.target.name,
                      "name",
                      event.target.value
                    );
                  }}
                />
              </label>
              {!cashCtx.formState.cashtoday.valid && (
                <p className="text-danger">
                  {cashCtx.getErrorMsg("cashtoday")}
                </p>
              )}
            </div>
            <div className="col">
              <label className="label">
                التاريخ
                <input
                  name="orderDate"
                  className={`form-control input ${
                    !cashCtx.formState.orderDate.valid && "is-invalid"
                  }`}
                  type="date"
                  value={cashCtx.formState.orderDate.value}
                  onChange={(event) => {
                    console.log(cashCtx.formState.orderDate.valid);

                    cashCtx.handleInputChange(event);
                    console.log(event.target.value);
                    console.log(cashCtx.formState.orderDate.value);
                    cashCtx.validateField(
                      event.target.name,
                      "date",
                      event.target.value
                    );
                  }}
                />
              </label>
              {!cashCtx.formState.orderDate.valid && (
                <p className="text-danger">
                  {cashCtx.getErrorMsg("orderDate")}
                </p>
              )}
            </div>
          </div>

          <button className="btn btn-primary mt-2 add-btn " type="submit">
            اضافة
          </button>
        </form>
      </div>
    </>
  );
};

export default CashOfToday;
