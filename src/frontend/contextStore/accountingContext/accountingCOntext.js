import React, { createContext, useEffect, useState } from "react";
import serverport from "../../backendconfiguration";

export const AccountingContext = createContext({
  cash: "",
  owed: "",
  debt: "",
  productsInStockValue: "",
  profit: "",
});

export const AccountingProvider = (props) => {
  const [cash, setCash] = useState("");
  const [owed, setOwed] = useState("");
  const [debt, setDebt] = useState("");
  const [productsInStockValue, setProductsInStockValue] = useState("");
  const [profit, setProfit] = useState("");

  useEffect(() => {
    fetch(`http://localhost:${serverport}/finance/view`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCash(data[0].cash);
        setOwed(data[0].owed);
        setDebt(data[0].debt);
        setProductsInStockValue(data[0].productsInStockValue);
        setProfit(data[0].profit);
      })
      .catch((error) => {
        console.error("Failed to fetch financial data:", error);
      });
  }, []);

  return (
    <AccountingContext.Provider
      value={{
        cash,
        owed,
        debt,
        productsInStockValue,
        profit,
      }}
    >
      {props.children}
    </AccountingContext.Provider>
  );
};
