import React, { useContext } from "react";
import { LotContext } from "../../contextStore/lotsContext";

import FilterProdBYCat from "../product/filterbyCategory";
import { createPortal } from "react-dom";

const AddNewLot = () => {
  const LotCtx = useContext(LotContext);

  const handleAddLOtItem = () => {
    LotCtx.updateLotList();
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
          event.preventDefault();
          handleAddLOtItem();
        }}
      >
        <FilterProdBYCat />

        <label className="label">
          الكمية:
          <input
            className="form-control input"
            type="text"
            value={LotCtx.quantity}
            onChange={(event) => LotCtx.updatequantity(event.target.value)}
          />
        </label>

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

        <label className="label">
          تاريخ التوريد:
          <input
            className="form-control input"
            type="date"
            value={LotCtx.received_date}
            onChange={(event) => LotCtx.updateReceivedDate(event.target.value)}
          />
        </label>
        <br />

        <button className="btn btn-primary mt-2 add-btn " type="submit">
          اضافة
        </button>
      </form>
    </div>
  );
};

export default AddNewLot;
