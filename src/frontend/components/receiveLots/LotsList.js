import React, { useContext } from "react";
import { LotContext } from "../../contextStore/lotsContext";
const LotList = () => {
  const { lotList } = useContext(LotContext);

  return (
    <React.Fragment>
      <h2>view all lots</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Category</th>
            <th className="col-md-2">Product Name</th>
            <th className="col-md-2">Quantity</th>
            <th className="col-md-2">Cost</th>
            <th className="col-md-2">Date</th>
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
