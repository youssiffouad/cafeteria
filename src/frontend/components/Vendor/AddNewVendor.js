import React, { useContext } from "react";

import { vendorContext } from "../../contextStore/vendorsContext";

const NewVendorForm = () => {
  const vendorCtx = useContext(vendorContext);

  return (
    <div className="container mb-5 add-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="add-heading">Add New Vendor</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              vendorCtx.updatevendorlist();
            }}
          >
            <label className="label">
              Vendor Name:
              <input
                type="text"
                value={vendorCtx.name}
                onChange={(event) => vendorCtx.updatename(event.target.value)}
                className="form-control input"
              />
            </label>
            <br />
            <label className="label">
              Phone:
              <input
                type="text"
                value={vendorCtx.phone}
                onChange={(event) => vendorCtx.updatephone(event.target.value)}
                className="form-control input"
              />
            </label>
            <br />
            <button type="submit" className="btn btn-primary mt-2 add-btn ">
              Add Vendor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewVendorForm;
