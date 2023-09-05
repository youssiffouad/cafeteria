import React, { useContext, useState } from "react";

import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import NewOrderItemForm from "./orderItem/AddNewOrderItem";
import OrderItemList from "./orderItem/orderItemList";

import FilterCustomerBYRank from "../customer/filterByrank";

const NewOrderForm = () => {
  const ordersCtx = useContext(OrderContext);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleAddOrder = () => {
    if (
      !ordersCtx.customerId ||
      !ordersCtx.rankid ||
      ordersCtx.orders.length === 0
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      ordersCtx.updateOrders();
    }
  };

  return (
    <div className="container mb-5 add-order-container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h2 className="add-heading">add new Order</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              handleAddOrder();
            }}
          >
            <FilterCustomerBYRank />

            <NewOrderItemForm />
            <OrderItemList />

            <label className="label">
              Date
              <input
                type="date"
                value={ordersCtx.orderDate}
                className="form-control input "
                onChange={(event) => {
                  ordersCtx.updateOrderDate(event.target.value);
                }}
              />
            </label>

            <br />
            {!isFormValid && (
              <p className="text-danger">
                Please fill in all the required fields.
              </p>
            )}
            <button type="submit" className="btn btn-primary mt-2 add-btn">
              Add Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOrderForm;
