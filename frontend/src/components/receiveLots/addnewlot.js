import React, { useContext, useEffect } from "react";
import { LotContext } from "../../contextStore/lotsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import FilterProdBYCat from "../product/filterbyCategory";
import { createPortal } from "react-dom";
import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";

const AddNewLot = (props) => {
  const LotCtx = useContext(LotContext);
  const prodAndCatCtx = useContext(OrderItemContext);
  useEffect(() => {
    console.log(LotCtx.errors);
    console.log(LotCtx.getErrorMsg("customerName"));
    console.log(LotCtx.getErrorMsg("customerRank"));
  }, [LotCtx.errors]);

  const submissionHandler = (formdata) => {
    const { prod, cat, quantity, paidAmount, cost, received_date } = formdata;
    const v1 = prodAndCatCtx.validateField("prod", "dropdown", prod);
    const v2 = prodAndCatCtx.validateField("cat", "dropdown", cat);
    const v3 = LotCtx.validateField("quantity", "number", quantity);
    const v4 = LotCtx.validateField("paidAmount", "number", paidAmount);
    const v5 = LotCtx.validateField("cost", "number", cost);
    const v6 = LotCtx.validateField("received_date", "date", received_date);
    console.log(v1, v2, v3, v4, v5, v6);
    if (v1 && v2 && v3 && v4 && v5 && v6) LotCtx.updateLotList();
  };

  return (
    <div className="5 add-container position-relative" dir="rtl">
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
          <FilterProdBYCat hideSandwiches={true} />
          <div className="col">
            <label className="label">
              الكمية:
              <input
                name="quantity"
                className={`form-control input inputValue ${
                  !LotCtx.formState.quantity.valid && "is-invalid"
                }`}
                type="number"
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
                className={`form-control input inputValue ${
                  !LotCtx.formState.cost.valid && "is-invalid"
                }`}
                type="number"
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
                className={`form-control input inputValue ${
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
                type="number"
                className={`form-control input inputValue ${
                  !LotCtx.formState.paidAmount.valid && "is-invalid"
                }`}
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
      {/* <button
        className="btn btn-outline-info position-absolute"
        style={{ bottom: "-20%", right: "0px" }}
        onClick={() => props.toggleDisplay()}
      >
        شراء مكون <FontAwesomeIcon icon={faArrowsRotate} />
      </button> */}
    </div>
  );
};

export default AddNewLot;
