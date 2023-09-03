import React, { createContext, useEffect, useState } from "react";
import serverport from "../backendconfiguration";

export const RankContext = createContext({
  ranklist: [],
  updateranklist: () => {},
  name: "",
  updatename: (n) => {},
});

export const RankProvider = (props) => {
  const [ranklist, setranklist] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:${serverport}/ranks/view`)
      .then((response) => response.json())
      .then((data) => {
        setranklist(data);
      })
      .catch((error) => {
        console.error("Failed to fetch ranks:", error);
      });
  }, [name]);

  //adding new rank
  const updateranklist = () => {
    const rankData = {
      name,
    };

    fetch(`http://localhost:${serverport}/ranks/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rankData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Perform any necessary actions after adding the rank
      })
      .catch((error) => {
        console.error("Failed to add rank:", error);
        // Handle error
      });

    // Reset form fields
    setName("");
  };
  const updatename = (name) => {
    setName(name);
  };

  return (
    <RankContext.Provider
      value={{
        ranklist,
        updateranklist,
        name,
        updatename,
      }}
    >
      {props.children}
    </RankContext.Provider>
  );
};
