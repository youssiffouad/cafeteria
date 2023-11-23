import React, { useContext } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { createPortal } from "react-dom";
import FilterCustomerBYRank from "../customer/filterByrank";
const T2reshaOfToday = () => {
  const t2reshaCtx = useContext(OrderContext);

  return (
    <>
      <div className=" add-container " dir="rtl">
        {createPortal(
          <t2reshaCtx.Msgcomponent />,
          document.getElementById("popup-portal")
        )}
        <h5>اضافة تقريشة اليوم</h5>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            t2reshaCtx.updateT2resha();
          }}
        >
          <FilterCustomerBYRank />
          <label className="label">
            قيمة التقريشة:
            <input
              className="form-control input"
              type="text"
              value={t2reshaCtx.tsreshaperPerson}
              onChange={(event) =>
                t2reshaCtx.updatetsreshaperPerson(event.target.value)
              }
            />
          </label>

          <label className="label">
            التاريخ
            <input
              className="form-control input"
              type="date"
              value={t2reshaCtx.orderDate}
              onChange={(event) =>
                t2reshaCtx.updateOrderDate(event.target.value)
              }
            />
          </label>
          <br />

          <button className="btn btn-primary mt-2 add-btn " type="submit">
            اضافة
          </button>
        </form>
      </div>
    </>
  );
};

export default T2reshaOfToday;
