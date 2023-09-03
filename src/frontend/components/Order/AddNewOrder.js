import React, { useContext } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import NewOrderItemForm from "./orderItem/AddNewOrderItem";
import OrderItemList from "./orderItem/orderItemList";

import FilterCustomerBYRank from "../customer/filterByrank";

const NewOrderForm = () => {
  const ordersCtx = useContext(OrderContext);

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>add new Order</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              ordersCtx.updateOrders();
            }}
          >
            <FilterCustomerBYRank />

            <NewOrderItemForm />
            <OrderItemList />

            <label>
              Date
              <input
                type="date"
                value={ordersCtx.orderDate}
                className="form-control"
                onChange={(event) => {
                  ordersCtx.updateOrderDate(event.target.value);
                }}
              />
            </label>

            <br />
            <button type="submit" className="btn btn-primary mt-2 ">
              Add Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOrderForm;
