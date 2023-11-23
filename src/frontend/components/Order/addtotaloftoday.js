import React, { useContext } from "react";
import FilterProdBYCat from "../product/filterbyCategory";
import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";
import { createPortal } from "react-dom";

const TotalOfToday = () => {
  const quantityCtx = useContext(OrderItemContext);
  const soldprodCtx = useContext(OrderContext);
  console.log(
    `orderswithItems from the addtotalOftoday :`,
    soldprodCtx.orderswithItem
  );
  return (
    <>
      <div className=" add-container " dir="rtl">
        {createPortal(
          <soldprodCtx.Msgcomponent />,
          document.getElementById("popup-portal")
        )}
        <h5>المنتجات المباعة اليوم</h5>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            // quantityCtx.updateorderitems();
            soldprodCtx.updatesoldprod();
          }}
        >
          <FilterProdBYCat />

          <label className="label">
            الكمية
            <input
              className="form-control input"
              type="text"
              value={quantityCtx.quantity}
              onChange={(event) =>
                quantityCtx.updatequantity(event.target.value)
              }
            />
          </label>

          <label className="label">
            التاريخ
            <input
              className="form-control input"
              type="date"
              value={soldprodCtx.orderDate}
              onChange={(event) =>
                soldprodCtx.updateOrderDate(event.target.value)
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

export default TotalOfToday;
