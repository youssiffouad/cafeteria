import React, { useContext } from "react";
import FilterProdBYCat from "../product/filterbyCategory";
import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";
import { createPortal } from "react-dom";

const TotalOfToday = () => {
  const quantityCtx = useContext(OrderItemContext);
  const soldprodCtx = useContext(OrderContext);

  const submissionHandler = (formdata) => {
    const { cat, prod, quantity, orderDate } = formdata;
    quantityCtx.validateField("cat", "dropdown", cat);
    quantityCtx.validateField("quantity", "dropdown", quantity);
    quantityCtx.validateField("prod", "dropdown", prod);
    soldprodCtx.validateField("orderDate", "dropdown", orderDate);
    //  soldprodCtx.updatesoldprod();
  };
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
            const formdata = {
              cat: quantityCtx.formState.cat.value,
              prod: quantityCtx.formState.prod.value,
              quantity: quantityCtx.formState.quantity.value,
              orderDate: soldprodCtx.formState.orderDate.value,
            };
            event.preventDefault();
            submissionHandler(formdata);
          }}
        >
          <div className="row">
            <FilterProdBYCat />
            <div className="col">
              <label className="label">
                الكمية
                <input
                  name="quantity"
                  className={`form-control input ${
                    !quantityCtx.formState.quantity.valid && "is-invalid"
                  }`}
                  type="text"
                  value={quantityCtx.formState.quantity.value}
                  onChange={(event) => {
                    quantityCtx.handleInputChange(event);
                    quantityCtx.validateField(
                      event.target.name,
                      "number",
                      event.target.value
                    );
                  }}
                />
                {!quantityCtx.formState.quantity.valid && (
                  <p className="text-danger">
                    {quantityCtx.getErrorMsg("quantity")}
                  </p>
                )}
              </label>
            </div>
            <div className="col">
              <label className="label">
                التاريخ
                <input
                  name="orderDate"
                  className="form-control input"
                  type="date"
                  value={soldprodCtx.formState.orderDate.value}
                  onChange={(event) => {
                    soldprodCtx.handleInputChange(event);
                    soldprodCtx.validateField(
                      event.target.name,
                      "date",
                      event.target.value
                    );
                  }}
                />
              </label>
              {!soldprodCtx.formState.orderDate.valid && (
                <p className="text-danger">
                  {soldprodCtx.getErrorMsg("orderDate")}
                </p>
              )}
            </div>
          </div>

          <button className="btn btn-primary mt-2 add-btn " type="submit">
            اضافة
          </button>
        </form>
      </div>
    </>
  );
};

export default TotalOfToday;
