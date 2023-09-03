import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { RankContext } from "../../contextStore/ranksContext";
const RankList = () => {
  const rankCtx = useContext(RankContext);

  return (
    <React.Fragment>
      <h2>view all ranks</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th className="col-md-2">Rank ID</th>
            <th className="col-md-2">Rank Name</th>
          </tr>
        </thead>
        <tbody>
          {rankCtx.ranklist.map((rank) => (
            <tr key={rank.id}>
              <td>{rank.id}</td>
              <td>{rank.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default RankList;
