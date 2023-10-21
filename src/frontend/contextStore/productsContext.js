import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";

export const ProductContext = createContext({
  prodlist: [],
  updateprodlist: () => {},
  name: "",
  updatename: (n) => {},
  vendorId: "",
  updateVendorid: (c) => {},
  catid: "",
  updatecatid: (c) => {},
  sellingPrice: "",
  updatesellingPrice: (s) => {},
  buying_price: "",
  updatebuying_price: (b) => {},
  quantity: "",
  updateQuantity: (q) => {},
  vendors: [],
  categories: [],
});

export const ProductProvider = (props) => {
  const [prodlist, setprodlist] = useState([]);
  const [name, setName] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [catid, setcatid] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [buying_price, setbuying_price] = useState("");
  const [quantity, setQuantity] = useState("");
  const [vendors, setVendors] = useState([]);
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:${serverport}/products/view`)
      .then((response) => response.json())
      .then((data) => {
        setprodlist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, [name]);

  useEffect(() => {
    fetch(`http://localhost:${serverport}/vendors/view`)
      .then((response) => response.json())
      .then((data) => {
        setVendors(data);
      })
      .catch((error) => {
        console.error("Failed to fetch vendors:", error);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:${serverport}/categories/view`)
      .then((response) => response.json())
      .then((data) => {
        setcategories(data);
      })
      .catch((error) => {
        console.error("Failed to fetch categories:", error);
      });
  }, []);

  const updateprodlist = () => {
    const productData = {
      name,
      vendor_id: vendorId,
      catid,
      selling_price: sellingPrice,
      buying_price,
      quantity: 0,
    };

    fetch(`http://localhost:${serverport}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Perform any necessary actions after adding the product
      })
      .catch((error) => {
        console.error("Failed to add product:", error);
        // Handle error
      });

    // Reset form fields
    setName("");
    setVendorId("");
    setSellingPrice("");

    setQuantity("");
  };
  const updatename = (name) => {
    setName(name);
  };

  const updateVendorid = (vendorId) => {
    setVendorId(vendorId);
  };
  const updatecatid = (catid) => {
    setcatid(catid);
  };
  const updatesellingPrice = (sp) => {
    setSellingPrice(sp);
  };
  const updatebuying_price = (bp) => {
    setbuying_price(bp);
  };
  const updateQuantity = (q) => {
    setQuantity(q);
  };

  return (
    <ProductContext.Provider
      value={{
        prodlist,
        updateprodlist,
        name,
        updatename,
        vendorId,
        updateVendorid,
        catid,
        updatecatid,
        sellingPrice,
        updatesellingPrice,
        buying_price,
        updatebuying_price,
        quantity,
        updateQuantity,
        vendors,
        categories,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
