import React, { useContext } from "react";
import FilterProdBYCat from "../product/filterbyCategory";
import { OrderContext } from "../../contextStore/Order/OrdersContext/orderProvider";
import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";
import { createPortal } from "react-dom";
import { SandwichCtx } from "../../contextStore/SandwichContext";
import e from "cors";

const TotalOfToday = () => {
  const quantityCtx = useContext(OrderItemContext);
  const soldprodCtx = useContext(OrderContext);
  const sanwichCtx = useContext(SandwichCtx);

  const submissionHandler = (formdata) => {
    const { cat, prod, quantity, orderDate, sandwichId } = formdata;
    const v1 = quantityCtx.validateField("cat", "dropdown", cat);
    const v2 = quantityCtx.validateField("quantity", "dropdown", quantity);
    let v3;
    if (cat == 1) {
      v3 = sanwichCtx.VFFilterByCat("sandwichId", "dropdown", sandwichId);
    } else {
      v3 = quantityCtx.validateField("prod", "dropdown", prod);
    }
    const v4 = soldprodCtx.validateField("orderDate", "dropdown", orderDate);
    console.log(v1, v2, v3, v4);
    if (v1 && v2 && v3 && v4) {
      if (cat == 1) {
        console.log(
          "i am gonna submit a new sandwich order and her eis hte formdata",
          formdata
        );
        soldprodCtx.updateSoldsandwiches();
      } else {
        soldprodCtx.updatesoldprod();
        console.log(
          "i am gonna submit a new product order and her eis hte formdata",
          formdata
        );
      }
    }
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
              //either one of hte two sandwcih or product will be  used in validaiton
              prod: quantityCtx.formState.prod.value,
              sandwichId: sanwichCtx.formStateFilterByCat.sandwichId.value,
              quantity: quantityCtx.formState.quantity.value,
              orderDate: soldprodCtx.formState.orderDate.value,
            };
            console.log("here is the form data before submission", formdata);
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
