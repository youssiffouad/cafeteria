import React, { useContext } from "react";
import { LotContext } from "../../contextStore/lotsContext";
const LotList = () => {
  const { lotList } = useContext(LotContext);

  return (
    <React.Fragment>
      <h2 className="text-center">بيانات المشتريات</h2>
      <table
        className="table table-striped table-bordered table-hover"
        dir="rtl"
      >
        <thead>
          <tr>
            <th className="col-md-2">التصنيف</th>
            <th className="col-md-2">اسم المنتج</th>
            <th className="col-md-2">الكمية</th>
            <th className="col-md-2">التكلفة</th>
            <th className="col-md-2">تاريخ الشراء</th>
          </tr>
        </thead>
        <tbody>
          {lotList.map((lot) => (
            <tr key={lot.id}>
              <td>{lot.catname}</td>
              <td>{lot.prodname}</td>
              <td>{lot.quantity}</td>
              <td>{lot.cost}</td>
              <td>{lot.received_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default LotList;
