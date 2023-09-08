import React, { useContext, useState } from "react";

import { ProductContext } from "../../contextStore/productsContext";

const NewProductForm = () => {
  const productsCtx = useContext(ProductContext);
  const [isFormValid, setIsFormValid] = useState(true);

  const handleAddProduct = () => {
    const sellingPrice = parseFloat(productsCtx.sellingPrice);
    const quantity = parseFloat(productsCtx.quantity);
    if (
      !productsCtx.catid ||
      !productsCtx.vendorId ||
      productsCtx.name.trim().length === 0 ||
      isNaN(sellingPrice) ||
      isNaN(quantity)
    ) {
      console.log(typeof sellingPrice);
      console.log(typeof quantity);
      console.log(productsCtx.catid);
      console.log(productsCtx.vendid);
      console.log(productsCtx.name);
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
      productsCtx.updateprodlist();
    }
  };

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2>اضافة منتج جديد</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleAddProduct();
            }}
          >
            <label className="label">
              :اسم المنتج
              <input
                type="text"
                value={productsCtx.name}
                className="form-control input"
                onChange={(event) => productsCtx.updatename(event.target.value)}
              />
            </label>
            <br />
            <label className="label">
              المورد:
              <select
                value={productsCtx.vendid}
                className="form-control input"
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
            <label className="label">
              التصنيف
              <select
                value={productsCtx.catid}
                className="form-control input"
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
            <label className="label">
              سعر البيع:
              <input
                type="text"
                value={productsCtx.sellingPrice}
                className="form-control input"
                onChange={(event) =>
                  productsCtx.updatesellingPrice(event.target.value)
                }
              />
            </label>
            <br />
            <label className="label">
              الكمية:
              <input
                type="text"
                className="form-control input"
                value={productsCtx.quantity}
                onChange={(event) =>
                  productsCtx.updateQuantity(event.target.value)
                }
              />
            </label>
            <br />
            {!isFormValid && (
              <p className="text-danger">
                Please fill in all the required fields.
              </p>
            )}
            <button type="submit" className="btn btn-primary mt-2 add-btn">
              اضافة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProductForm;
