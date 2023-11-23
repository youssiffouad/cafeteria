import React, { useContext } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { createPortal } from "react-dom";
const CashOfToday = () => {
  const cashCtx = useContext(OrderContext);
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
            event.preventDefault();
            cashCtx.updateCashofToday();
          }}
        >
          <label className="label">
            قيمة الكاش
            <input
              className="form-control input"
              type="text"
              value={cashCtx.cashtoday}
              onChange={(event) =>
                cashCtx.cashChangeHandler(event.target.value)
              }
            />
          </label>

          <label className="label">
            التاريخ
            <input
              className="form-control input"
              type="date"
              value={cashCtx.orderDate}
              onChange={(event) => cashCtx.updateOrderDate(event.target.value)}
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

export default CashOfToday;
