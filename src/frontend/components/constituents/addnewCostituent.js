import { useContext } from "react";
import { ConstituentContext } from "../../contextStore/constituentContext";

const AddNewConstituent = () => {
  const ConstituentCtx = useContext(ConstituentContext);
  const submissionHandler = (formdata) => {
    const { constituentName, noOfUnits, priceOfUnit } = formdata;
    ConstituentCtx.validateField("constituentName", "name", constituentName);
    ConstituentCtx.validateField("noOfUnits", "number", noOfUnits);
    ConstituentCtx.validateField("priceOfUnit", "number", priceOfUnit);
  };

  return (
    <div className="container mb-5 add-container" dir="rtl">
      <h5 className="add-heading">اضافة مكون جديد</h5>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formdata = {
            constituentName: ConstituentCtx.formState.constituentName.value,
            noOfUnits: ConstituentCtx.formState.noOfUnits.value,
            priceOfUnit: ConstituentCtx.formState.priceOfUnit.value,
          };
          console.log("here is hte formdata", formdata);
          submissionHandler(formdata);
        }}
      >
        <label className="label">
          الاسم
          <input
            className={` form-control input`}
            name="constituentName"
            type="text"
            value={ConstituentCtx.formState.constituentName.value}
          />
        </label>
        <label className="label">
          {" "}
          سعر الشراء للوحدة
          <input
            className={` form-control input`}
            name="priceOfUnit"
            type="number"
            value={ConstituentCtx.formState.priceOfUnit.value}
          />
        </label>
        <label className="label">
          الكمية
          <input
            className={` form-control input`}
            name="noOfUnits"
            type="number"
            value={ConstituentCtx.formState.noOfUnits.value}
          />
        </label>
        <br />
        <button className="btn btn-primary" type="submit">
          اضافة المكون
        </button>
      </form>
    </div>
  );
};

export default AddNewConstituent;
