import { useState } from "react";
import serverport from "../../backendconfiguration";

const EditPriceOfConstituent = (props) => {
  const [editingState, seteditingState] = useState(false);
  const [newBuyingPrice, setnewBuyingPrice] = useState("");

  //function to handle input change
  const handleInputChange = (e) => {
    setnewBuyingPrice(e.target.value);
  };
  //function to change price in the DB in backend
  const submitNewPrice = async () => {
    const payload = { newPricePerUnit: newBuyingPrice, id: props.id };
    const response = await fetch(
      `http://localhost:${serverport}/components/updateComponentPricePerUnit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log("here is the data i got from DB after changing the price");
    await props.fetchConstituents();
    toggleDisplay();
  };
  //function to toggle display
  const toggleDisplay = () => {
    seteditingState((prev) => !prev);
  };
  if (!editingState)
    return (
      <div className="d-flex justify-content-between">
        {props.price}
        <button className="btn btn-primary" onClick={toggleDisplay}>
          تعديل السعر
        </button>
      </div>
    );
  else
    return (
      <div className="d-flex justify-content-between">
        <input
          autoFocus
          className="form-control w-50 "
          type="number"
          value={newBuyingPrice}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={submitNewPrice}>
          حفظ
        </button>
      </div>
    );
};
export default EditPriceOfConstituent;
