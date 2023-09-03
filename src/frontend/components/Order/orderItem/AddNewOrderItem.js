import React, { useContext } from "react";

import { OrderItemContext } from "../../../contextStore/Order/OrderItemContext";
import FilterProdBYCat from "../../product/filterbyCategory";

const NewOrderItemForm = () => {
  const orderItemsCtx = useContext(OrderItemContext);

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>add new OrderItem</h2>
          <FilterProdBYCat />
          <label>
            Quantity
            <input
              type="text"
              value={orderItemsCtx.quantity}
              onChange={(event) =>
                orderItemsCtx.updatequantity(event.target.value)
              }
              className="form-control"
            />
          </label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={orderItemsCtx.updateorderitems}
          >
            Add Order Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderItemForm;
