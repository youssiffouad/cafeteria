import React, { useContext } from "react";

import { vendorContext } from "../../contextStore/vendorsContext";

const NewVendorForm = () => {
  const vendorCtx = useContext(vendorContext);

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>Add New Vendor</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              vendorCtx.updatevendorlist();
            }}
          >
            <label>
              Vendor Name:
              <input
                type="text"
                value={vendorCtx.name}
                onChange={(event) => vendorCtx.updatename(event.target.value)}
                className="form-control"
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                value={vendorCtx.phone}
                onChange={(event) => vendorCtx.updatephone(event.target.value)}
                className="form-control"
              />
            </label>
            <br />
            <button type="submit" className="btn btn-primary mt-2 ">
              Add Vendor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewVendorForm;
