import React, { createContext, useEffect, useState } from "react";
import serverport from "../../backendconfiguration";
import usePopUp from "../../Hooks/use_popup";

export const AccountingContext = createContext({
  cash: "",
  owed: "",
  debt: "",
  productsInStockValue: "",
  profit: "",
  reset: () => {},
  Msgcomponent: "",
});

export const AccountingProvider = (props) => {
  const [cash, setCash] = useState("");
  const [owed, setOwed] = useState("");
  const [debt, setDebt] = useState("");
  const [productsInStockValue, setProductsInStockValue] = useState("");
  const [profit, setProfit] = useState("");
  const { Msgcomponent, controlDisplay, controlMsgContent } = usePopUp();
  const viewFinance = () => {
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
  };
  const reset = () => {
    fetch(`http://localhost:${serverport}/finance/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Perform any necessary actions after adding the customer
        controlMsgContent(`تم اعادة الضبط بنجاح`);
        controlDisplay(true);
        viewFinance();
      })
      .catch((error) => {
        console.error("Failed to resset:", error);
        controlMsgContent(`"فشل اعادة الضبط:", ${error}`);
        controlDisplay(true);
        // Handle error
      });
  };

  useEffect(() => {
    viewFinance();
  }, []);

  return (
    <AccountingContext.Provider
      value={{
        cash,
        owed,
        debt,
        productsInStockValue,
        profit,
        reset,
        Msgcomponent,
      }}
    >
      {props.children}
    </AccountingContext.Provider>
  );
};
