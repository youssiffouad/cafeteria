import React, { useContext } from "react";

import { OrderFilterContext } from "../../contextStore/Order/OrdersContext/filterDateContext";
const FilterDateOrders = () => {
  const filterdateCtx = useContext(OrderFilterContext);

  return (
    <div className="container" dir="rtl">
      <div className="row">
        <div className="col-md-8">
          <h1>اختيار الطلبات في فترة معينة</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              filterdateCtx.handleFilterDate();
            }}
          >
            <label htmlFor="start">بداية الفترة</label>
            <input
              type="date"
              id="start"
              value={filterdateCtx.startdate}
              onChange={(event) =>
                filterdateCtx.updatestartdate(event.target.value)
              }
              className="form-control"
            />
            <br />
            <label htmlFor="end">نهاية الفترة</label>
            <input
              type="date"
              id="end"
              value={filterdateCtx.enddate}
              onChange={(event) =>
                filterdateCtx.updateenddate(event.target.value)
              }
              className="form-control"
            />
            <br />
            <button type="submit" className="btn btn-primary">
              تطبيق
            </button>
          </form>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">الرقم المسلسل</th>
            <th className="col-md-2">الرتبة /الدرجة</th>
            <th className="col-md-2">اسم المستهلك</th>
            <th className="col-md-2">تاريخ الطلب</th>
            <th className="col-md-2">سعر الطلب</th>
          </tr>
        </thead>
        <tbody>
          {filterdateCtx.filteredOrders.map((Order) => (
            <tr key={Order.id}>
              <td>{Order.id}</td>
              <td>{Order.rankname}</td>
              <td>{Order.customer_name}</td>
              <td>{Order.order_date}</td>

              <td>{Order.order_price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>اجمالي سعر الطلبات المختارة {filterdateCtx.filterdateOrdersCost}</h1>
    </div>
  );
};
export default FilterDateOrders;
