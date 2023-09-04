import React, { useContext, useState } from "react";
import { OrderItemContext } from "../../../contextStore/Order/OrderItemContext";
import FilterProdBYCat from "../../product/filterbyCategory";

const NewOrderItemForm = () => {
  const orderItemsCtx = useContext(OrderItemContext);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleAddOrderItem = () => {
    if (
      orderItemsCtx.quantity.trim() === "" ||
      !orderItemsCtx.cat.id ||
      !orderItemsCtx.prod.id
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      orderItemsCtx.updateorderitems();
    }
  };

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
          {!isFormValid && (
            <p className="text-danger">
              Please fill in all the required fields.
            </p>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddOrderItem}
          >
            Add Order Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrderItemForm;
