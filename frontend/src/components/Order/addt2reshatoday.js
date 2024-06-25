import React, { useContext, useEffect } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { createPortal } from "react-dom";
import FilterCustomerBYRank from "../customer/filterByrank";
const T2reshaOfToday = () => {
  const t2reshaCtx = useContext(OrderContext);

  useEffect(() => {
    console.log(t2reshaCtx.errors);
  }, [t2reshaCtx.errors]);
  const submissionHandler = (formdata) => {
    const { orderDate, t2reshaperPerson, customerId, rankid } = formdata;
    const v1 = t2reshaCtx.validateField("orderDate", "date", orderDate);
    const v2 = t2reshaCtx.validateField(
      "t2reshaperPerson",
      "date",
      t2reshaperPerson
    );
    const v3 = t2reshaCtx.validateField("rankid", "dropdown", rankid);
    const v4 = t2reshaCtx.validateField("customerId", "dropdown", customerId);

    if (v1 && v2 && v3 && v4) t2reshaCtx.updateT2resha();
  };

  return (
    <>
      <div className=" add-container " dir="rtl">
        {createPortal(
          <t2reshaCtx.Msgcomponent />,
          document.getElementById("popup-portal")
        )}
        <h5 className="add-heading">اضافة تقريشة اليوم</h5>
        <form
          onSubmit={(event) => {
            const formdata = {
              orderDate: t2reshaCtx.formState.orderDate.value,
              t2reshaperPerson: t2reshaCtx.formState.t2reshaperPerson.value,
              customerId: t2reshaCtx.formState.customerId.value,
              rankid: t2reshaCtx.formState.rankid.value,
            };
            event.preventDefault();
            submissionHandler(formdata);
          }}
        >
          <div className="row">
            <FilterCustomerBYRank />
            <div className="col">
              <label className="label">
                قيمة التقريشة:
                <input
                  name="t2reshaperPerson"
                  className={`form-control input inputValue ${
                    !t2reshaCtx.formState.t2reshaperPerson.valid && "is-invalid"
                  }`}
                  type="number"
                  value={t2reshaCtx.formState.t2reshaperPerson.value}
                  onChange={(event) => {
                    t2reshaCtx.handleInputChange(event);
                    t2reshaCtx.validateField(
                      event.target.name,
                      "number",
                      event.target.value
                    );
                  }}
                />
              </label>
              {!t2reshaCtx.formState.t2reshaperPerson.valid && (
                <p className="text-danger">
                  {t2reshaCtx.getErrorMsg("t2reshaperPerson")}
                </p>
              )}
            </div>
            <div className="col">
              <label className="label">
                التاريخ
                <input
                  name="orderDate"
                  className={`form-control input inputValue ${
                    !t2reshaCtx.formState.orderDate.valid && "is-invalid"
                  }`}
                  type="date"
                  value={t2reshaCtx.formState.orderDate.value}
                  onChange={(event) => {
                    t2reshaCtx.handleInputChange(event);
                    t2reshaCtx.validateField(
                      event.target.name,
                      "date",
                      event.target.value
                    );
                  }}
                />
              </label>
              {!t2reshaCtx.formState.orderDate.valid && (
                <p className="text-danger">
                  {t2reshaCtx.getErrorMsg("orderDate")}
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

export default T2reshaOfToday;
