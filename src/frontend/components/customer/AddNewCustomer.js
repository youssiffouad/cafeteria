import React, { useContext } from "react";

import { CustomerContext } from "../../contextStore/customersContext";

const NewCustomerForm = () => {
  const customerCtx = useContext(CustomerContext);

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>add new Customer</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              customerCtx.updatecustlist();
            }}
          >
            <label>
              Customer Name:
              <input
                type="text"
                value={customerCtx.name}
                className="form-control"
                onChange={(event) => customerCtx.updatename(event.target.value)}
              />
            </label>
            <br />
            <label>
              Rank:
              <select
                value={customerCtx.rankId}
                className="form-control"
                onChange={(event) =>
                  customerCtx.updaterankId(event.target.value)
                }
              >
                <option value="">Select Rank</option>
                {customerCtx.ranks.map((rank) => (
                  <option key={rank.id} value={rank.id}>
                    {rank.name}
                  </option>
                ))}
              </select>
            </label>

            <br />
            <button type="submit" className="btn btn-primary mt-2 ">
              Add Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCustomerForm;
