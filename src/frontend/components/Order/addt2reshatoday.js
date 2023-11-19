import React, { useContext } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import FilterCustomerBYRank from "../customer/filterByrank";
const T2reshaOfToday = () => {
  const t2reshaCtx = useContext(OrderContext);

  return (
    <>
      <div className="container mb-5 add-container position-absolute" dir="rtl">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2>T2reshaOfToday</h2>
            <h2>اضافة تقريشة اليوم</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                t2reshaCtx.updateT2resha();
              }}
            >
              <br />
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
              <br />
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
        </div>
      </div>
    </>
  );
};

export default T2reshaOfToday;
