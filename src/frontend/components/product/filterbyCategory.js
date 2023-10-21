import { OrderItemContext } from "../../contextStore/Order/OrderItemContext";

import React, { useState, useEffect, useContext } from "react";
import serverport from "../../backendconfiguration";
import { LotContext } from "../../contextStore/lotsContext";

const FilterProdBYCat = (props) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    sellingprice: "",
    buying_priceperitem: "",
  });
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
    if (category.id !== "") {
      console.log(category);
      console.log(`a7a b2a`);
      const requestBody = { catid: category.id };
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
  }, [category]);

  const catChangeHandler = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = categories.find((cat) => {
      return cat.id == selectedCategoryId;
    });

    setCategory({ id: selectedCategoryId, name: selectedCategory?.name });
    console.log(selectedCategory);
    console.log(category);

    orderItemCtx.updatecat({
      id: selectedCategoryId,
      name: selectedCategory?.name,
    });
    lotCtx.updatecatid(selectedCategoryId);
  };

  const ProdChangeHandler = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find((prod) => {
      return prod.id == selectedProductId;
    });

    setProduct({
      id: selectedProductId,
      name: selectedProduct?.name,
      sellingprice: selectedProduct?.selling_price,
      buying_priceperitem: selectedProduct?.buying_price,
    });
    console.log(selectedProduct);

    orderItemCtx.updateprod({
      id: selectedProductId,
      name: selectedProduct?.name,
      price: selectedProduct?.selling_price,
    });
    console.log(` i cahnged prodid`);
    console.log(selectedProductId);
    lotCtx.updateprodid(selectedProductId);
    lotCtx.updateprodBuyingPrice(selectedProduct?.buying_price);
  };

  return (
    <React.Fragment>
      <label>
        التصنيف
        <select
          className="form-control"
          value={category.id}
          onChange={catChangeHandler}
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
              {cat.id}
            </option>
          ))}
        </select>
      </label>

      <label>
        المنتج
        <select
          className="form-control"
          value={product.id}
          onChange={ProdChangeHandler}
        >
          <option value="">اختر اسم المنتج</option>
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
