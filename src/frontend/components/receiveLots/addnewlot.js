import React, { useContext, useState } from "react";
import { LotContext } from "../../contextStore/lotsContext";

import FilterProdBYCat from "../product/filterbyCategory";

const AddNewLot = () => {
  const LotCtx = useContext(LotContext);

  const [isFormValid, setIsFormValid] = useState(true);

  const handleAddLOtItem = () => {
    const cost = parseFloat(LotCtx.cost);
    const quantity = parseFloat(LotCtx.quantity);
    if (
      !LotCtx.catid ||
      !LotCtx.productID ||
      isNaN(cost) ||
      isNaN(quantity) ||
      !LotCtx.received_date
    ) {
      console.log(LotCtx.catid);
      console.log(LotCtx.prodid);
      console.log(LotCtx.received_date);
      console.log(typeof cost);
      console.log(typeof quantity);
      setIsFormValid(false);
    } else {
      console.log(LotCtx.catid);
      console.log(LotCtx.prodid);
      console.log(LotCtx.received_date);
      console.log(typeof cost);
      console.log(typeof quantity);
      setIsFormValid(true);
      LotCtx.updateLotList();
    }
  };

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="add-heading">اضافة مشتريات</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleAddLOtItem();
            }}
          >
            <FilterProdBYCat />
            <br />
            <label className="label">
              الكمية:
              <input
                className="form-control input"
                type="text"
                value={LotCtx.quantity}
                onChange={(event) => LotCtx.updatequantity(event.target.value)}
              />
            </label>
            <br />
            <label className="label">
              التكلفة:
              <input
                className="form-control input"
                type="text"
                value={LotCtx.cost}
                onChange={(event) => {
                  console.log(event.target.value);
                }}
              />
            </label>
            <label className="label">
              المبلغ المدفوع:
              <input
                className="form-control input"
                type="text"
                value={LotCtx.paidAmount}
                onChange={(event) => {
                  LotCtx.updatepaidAmount(event.target.value);
                  console.log(event.target.value);
                }}
              />
            </label>
            <br />
            <label className="label">
              تاريخ التوريد:
              <input
                className="form-control input"
                type="date"
                value={LotCtx.received_date}
                onChange={(event) =>
                  LotCtx.updateReceivedDate(event.target.value)
                }
              />
            </label>
            <br />
            {!isFormValid && (
              <p className="text-danger">
                Please fill in all the required fields.
              </p>
            )}
            <button className="btn btn-primary mt-2 add-btn " type="submit">
              اضافة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewLot;
