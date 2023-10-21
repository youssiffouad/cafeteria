import React, { useContext } from "react";
import FilterProdBYCat from "../product/filterbyCategory";
import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";
const TotalOfToday = () => {
  const quantityCtx = useContext(OrderItemContext);
  const soldprodCtx = useContext(OrderContext);
  return (
    <>
      <div className="container mb-5 add-container" dir="rtl">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2>soldProd today</h2>
            <h2>المنتجات المباعة اليوم</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                // quantityCtx.updateorderitems();
                soldprodCtx.updatesoldprod();
              }}
            >
              <br />
              <FilterProdBYCat />

              <br />
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
              <br />
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
        </div>
      </div>
    </>
  );
};

export default TotalOfToday;
