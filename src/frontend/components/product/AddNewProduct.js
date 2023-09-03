import React, { useContext } from "react";

import { ProductContext } from "../../contextStore/productsContext";

const NewProductForm = () => {
  const productsCtx = useContext(ProductContext);

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>add new Product</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              productsCtx.updateprodlist();
            }}
          >
            <label>
              Product Name:
              <input
                type="text"
                value={productsCtx.name}
                className="form-control"
                onChange={(event) => productsCtx.updatename(event.target.value)}
              />
            </label>
            <br />
            <label>
              Vendor:
              <select
                value={productsCtx.vendid}
                className="form-control"
                onChange={(event) =>
                  productsCtx.updateVendorid(event.target.value)
                }
              >
                <option value="">Select Vendor</option>
                {productsCtx.vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              category
              <select
                value={productsCtx.catid}
                className="form-control"
                onChange={(event) =>
                  productsCtx.updatecatid(event.target.value)
                }
              >
                <option value="">Select Category</option>
                {productsCtx.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <br />
            <label>
              Selling Price:
              <input
                type="text"
                value={productsCtx.sellingPrice}
                className="form-control"
                onChange={(event) =>
                  productsCtx.updatesellingPrice(event.target.value)
                }
              />
            </label>
            <br />
            <label>
              Quantity:
              <input
                type="text"
                className="form-control"
                value={productsCtx.quantity}
                onChange={(event) =>
                  productsCtx.updateQuantity(event.target.value)
                }
              />
            </label>
            <br />
            <button type="submit" className="btn btn-primary mt-2 ">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;
