import React, { useContext } from "react";

import { OrderFilterContext } from "../../contextStore/Order/OrdersContext/filterDateContext";
const FilterDateOrders = () => {
  const filterdateCtx = useContext(OrderFilterContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1>Filter Orders Between Certain Dates</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              filterdateCtx.handleFilterDate();
            }}
          >
            <label htmlFor="start">Enter Start Date Filter</label>
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
            <label htmlFor="end">Enter End Date Filter</label>
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
              Apply Filter
            </button>
          </form>
        </div>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Order ID</th>
            <th className="col-md-2">Customer rank</th>
            <th className="col-md-2">Customer name</th>
            <th className="col-md-2">Order Date</th>
            <th className="col-md-2">Order Price</th>
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

      <h1>
        Total Cost of Selected Orders is {filterdateCtx.filterdateOrdersCost}
      </h1>
    </div>
  );
};
export default FilterDateOrders;
