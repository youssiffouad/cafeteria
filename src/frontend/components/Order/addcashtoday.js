import React, { useContext } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
const CashOfToday = () => {
  const cashCtx = useContext(OrderContext);
  return (
    <>
      <div className="container mb-5 add-container position-absolute" dir="rtl">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2>CashOfToday</h2>
            <h2>اضافة كاش اليوم</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                cashCtx.updateCashofToday();
              }}
            >
              <br />

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
              <br />
              <label className="label">
                التاريخ
                <input
                  className="form-control input"
                  type="date"
                  value={cashCtx.orderDate}
                  onChange={(event) =>
                    cashCtx.updateOrderDate(event.target.value)
                  }
                />
              </label>
              <br />

              <button className="btn btn-primary mt-2 add-btn " type="submit">
                اضافة
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashOfToday;
