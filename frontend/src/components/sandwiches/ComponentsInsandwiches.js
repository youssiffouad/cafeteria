import { useContext, useState } from "react";
import { ConstituentContext } from "../../contextStore/constituentContext";
import { SandwichCtx } from "../../contextStore/SandwichContext";

const ComponentsInSandwiches = () => {
  const sandwichCtx = useContext(SandwichCtx);

  const { constituentsList } = useContext(ConstituentContext);
  return (
    <>
      <form>
        <label className="label">
          اختر مكون
          {/* instead of this static list, we will have a dynamic one fetched from the constituents in the database */}
          <select
            className={`form-control input inputValue`}
            onChange={(event) => {
              const selectedConstituentId =
                event.target.options[event.target.selectedIndex].getAttribute(
                  "data-id"
                );

              const selectedConstituent = constituentsList.find(
                (ele) => selectedConstituentId == ele.id
              );
              const selectedConstituentName = event.target.value;
              console.log(selectedConstituent);

              if (selectedConstituentId) {
                console.log("Selected ID:", selectedConstituentId);
                console.log("Selected Name:", selectedConstituentName);

                sandwichCtx.ChangeCompName(selectedConstituentName);
                sandwichCtx.changePricePerUnit(
                  selectedConstituent.price_per_unit
                );
                sandwichCtx.changeComponent_id(selectedConstituentId);
              }
            }}
            value={sandwichCtx.compName}
          >
            <option value={""}>اختر المكون</option>
            {constituentsList.map((constituent) => (
              <option
                className="inputValue"
                key={constituent.id}
                value={constituent.name}
                data-id={constituent.id}
              >
                {constituent.name}
              </option>
            ))}
          </select>
        </label>
        <label className="label">
          {" "}
          عدد الساندوتشات للوحدة
          <input
            className={` form-control input inputValue`}
            type="number"
            value={sandwichCtx.compMapping}
            onChange={(event) => {
              sandwichCtx.Changemapping(event.target.value);
            }}
          />
        </label>

        <br />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            sandwichCtx.modifyComponets();
          }}
        >
          اضافة المكون
        </button>
      </form>
    </>
  );
};
export default ComponentsInSandwiches;
