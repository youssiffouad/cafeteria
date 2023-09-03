import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";

import React, { useState, useEffect, useContext } from "react";
import serverport from "../../backendconfiguration";
import { LotContext } from "../../contextStore/lotsContext";

const FilterProdBYCat = () => {
  const [categories, setCategories] = useState([]);
  // const [category, setCategory] = useState({ id: "", name: "" });
  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState({ id: "", name: "" });
  const lotCtx = useContext(LotContext);
  const orderItemCtx = useContext(OrderItemContext);

  // Fetch all categories existing
  useEffect(() => {
    fetch(`http://localhost:${serverport}/categories/view`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  // Change products on changing category
  useEffect(() => {
    if (orderItemCtx.cat !== "") {
      console.log(orderItemCtx.cat);
      console.log(`a7a b2a`);
      const requestBody = { catid: orderItemCtx.cat.id };
      fetch(`http://localhost:${serverport}/products/filtercategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProducts(data);
        })
        .catch((error) => {
          console.error("Failed to filter products:", error);
        });
    }
  }, [orderItemCtx.cat]);

  const catChangeHandler = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find((cat) => {
      return cat.id == selectedCategoryId;
    });

    // setCategory({ id: selectedCategoryId, name: selectedCategory?.name });
    console.log(selectedCategory);

    orderItemCtx.updatecat({
      id: selectedCategoryId,
      name: selectedCategory?.name,
    });
  };

  const ProdChangeHandler = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find((prod) => {
      return prod.id == selectedProductId;
    });

    // setProduct({
    //   id: selectedProductId,
    //   name: selectedProduct?.name,
    //   price: selectedProduct?.selling_price,
    // });
    // console.log(selectedProduct);

    orderItemCtx.updateprod({
      id: selectedProductId,
      name: selectedProduct?.name,
      price: selectedProduct?.selling_price,
    });
    console.log(selectedProductId);
    lotCtx.updateprodid(selectedProductId);
  };

  return (
    <React.Fragment>
      <label>
        Category
        <select
          className="form-control"
          value={orderItemCtx.cat.id}
          onChange={catChangeHandler}
        >
          <option value="">Select category Name</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
              {cat.id}
            </option>
          ))}
        </select>
      </label>

      <label>
        Product
        <select
          className="form-control"
          value={orderItemCtx.prod.id}
          onChange={ProdChangeHandler}
        >
          <option value="">Select product Name</option>
          {products.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.name}
            </option>
          ))}
        </select>
      </label>
    </React.Fragment>
  );
};

export default FilterProdBYCat;
