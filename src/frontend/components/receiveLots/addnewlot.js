import React, { useContext, useEffect } from "react";
import { LotContext } from "../../contextStore/lotsContext";

import FilterProdBYCat from "../product/filterbyCategory";
import { createPortal } from "react-dom";
import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";

const AddNewLot = () => {
  const LotCtx = useContext(LotContext);
  const prodAndCatCtx = useContext(OrderItemContext);
  useEffect(() => {
    console.log(LotCtx.errors);
    console.log(LotCtx.getErrorMsg("customerName"));
    console.log(LotCtx.getErrorMsg("customerRank"));
  }, [LotCtx.errors]);

  const submissionHandler = (formdata) => {
    const { prod, cat, quantity, paidAmount, cost, received_date } = formdata;
    prodAndCatCtx.validateField("prod", "dropdown", prod);
    prodAndCatCtx.validateField("cat", "dropdown", cat);
    LotCtx.validateField("quantity", "number", quantity);
    LotCtx.validateField("paidAmount", "number", paidAmount);
    LotCtx.validateField("cost", "number", cost);
    LotCtx.validateField("received_date", "number", received_date);
    // LotCtx.updateLotList();
  };

  return (
    <div className="5 add-container" dir="rtl">
      {createPortal(
        <LotCtx.Msgcomponent />,
        document.getElementById("popup-portal")
      )}

      <h2 className="add-heading">اضافة مشتريات</h2>
      <form
        onSubmit={(event) => {
          const formdata = {
            prod: prodAndCatCtx.formState.prod.value,
            cat: prodAndCatCtx.formState.cat.value,
            prodBuyingPrice: LotCtx.formState.prodBuyingPrice.value,
            quantity: LotCtx.formState.quantity.value,
            paidAmount: LotCtx.formState.paidAmount.value,
            cost: LotCtx.formState.cost.value,
            received_date: LotCtx.formState.received_date.value,
          };
          event.preventDefault();
          submissionHandler(formdata);
        }}
      >
        <div className="row">
          <FilterProdBYCat />
          <div className="col">
            <label className="label">
              الكمية:
              <input
                name="quantity"
                className={`form-control input ${
                  !LotCtx.formState.quantity.valid && "is-invalid"
                }`}
                type="text"
                value={LotCtx.formState.quantity.value}
                onChange={(event) => {
                  LotCtx.handleInputChange(event);
                  LotCtx.validateField(
                    event.target.name,
                    "number",
                    event.target.value
                  );
                }}
              />
            </label>
            {!LotCtx.formState.quantity.valid && (
              <p className="text-danger">{LotCtx.getErrorMsg("quantity")}</p>
            )}
          </div>
          <div className="col">
            <label className="label">
              التكلفة:
              <input
                name="cost"
                className={`form-control input ${
                  !LotCtx.formState.cost.valid && "is-invalid"
                }`}
                type="text"
                value={LotCtx.formState.cost.value}
                onChange={(event) => {
                  LotCtx.handleInputChange(event);
                  LotCtx.validateField(
                    event.target.name,
                    "number",
                    event.target.value
                  );
                }}
              />
            </label>
            {!LotCtx.formState.cost.valid && (
              <p className="text-danger">{LotCtx.getErrorMsg("cost")}</p>
            )}
          </div>

          <div className="col">
            <label className="label">
              تاريخ التوريد:
              <input
                name="received_date"
                className={`form-control input ${
                  !LotCtx.formState.received_date.valid && "is-invalid"
                }`}
                type="date"
                value={LotCtx.formState.received_date.value}
                onChange={(event) => {
                  LotCtx.handleInputChange(event);
                  LotCtx.validateField(
                    event.target.name,
                    "date",
                    event.target.value
                  );
                }}
              />
              {!LotCtx.formState.received_date.valid && (
                <p className="text-danger">
                  {LotCtx.getErrorMsg("received_date")}
                </p>
              )}
            </label>
          </div>
          <div className="col">
            {" "}
            <label className="label">
              المبلغ المدفوع:
              <input
                name="paidAmount"
                className={`form-control input ${
                  !LotCtx.formState.paidAmount.valid && "is-invalid"
                }`}
                type="text"
                value={LotCtx.formState.paidAmount.value}
                onChange={(event) => {
                  LotCtx.handleInputChange(event);
                  LotCtx.validateField(
                    event.target.name,
                    "number",
                    event.target.value
                  );
                }}
              />
            </label>
            {!LotCtx.formState.paidAmount.valid && (
              <p className="text-danger">{LotCtx.getErrorMsg("paidAmount")}</p>
            )}
          </div>
        </div>

        <button className="btn btn-primary mt-2 add-btn " type="submit">
          اضافة
        </button>
      </form>
    </div>
  );
};

export default AddNewLot;
