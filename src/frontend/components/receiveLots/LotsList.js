import React, { useContext } from "react";
import { LotContext } from "../../contextStore/lotsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const LotList = () => {
  const Lotctx = useContext(LotContext);

  return (
    <React.Fragment>
      <h2 className="text-center">بيانات المشتريات</h2>
      <table
        className="table table-striped table-bordered table-hover myResponsiveTable"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2">التصنيف</th>
            <th className="col-md-2">اسم المنتج</th>
            <th className="col-md-2">الكمية</th>
            <th className="col-md-2">التكلفة</th>
            <th className="col-md-2">المبلغ المتبقي</th>
            <th className="col-md-2">تاريخ الشراء</th>
          </tr>
        </thead>
        <tbody>
          {Lotctx.lotList.map((lot) => (
            <tr key={lot.id}>
              <td>{lot.catname}</td>
              <td>{lot.prodname}</td>
              <td>{lot.quantity}</td>
              <td>{lot.cost}</td>
              <td className="d-flex justify-content-between align-items-center">
                <span>{lot.remaining_payment}</span>
                <span>
                  {lot.remaining_payment > 0 && (
                    <button
                      className="btn btn-primary mt-2 add-btn "
                      onClick={() => {
                        console.log(lot.id);
                        Lotctx.installLot(lot.id);
                      }}
                    >
                      دفع الباقي
                    </button>
                  )}
                </span>
              </td>
              <td>
                <span> {lot.received_date}</span>
                <span className="me-4">
                  {" "}
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => Lotctx.handleDeleteLot(lot.id)} // Call handleDeleteOrder when the delete icon is clicked
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default LotList;
