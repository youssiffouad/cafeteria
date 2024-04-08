import { useContext } from "react";
import { ConstituentContext } from "../../contextStore/constituentContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const AddNewConstituent = (props) => {
  const ConstituentCtx = useContext(ConstituentContext);
  const submissionHandler = (formdata) => {
    const { constituentName, noOfUnits, priceOfUnit } = formdata;
    let c1 = ConstituentCtx.validateField(
      "constituentName",
      "name",
      constituentName
    );
    let c2 = ConstituentCtx.validateField("noOfUnits", "number", noOfUnits);
    let c3 = ConstituentCtx.validateField("priceOfUnit", "number", priceOfUnit);
    if (c1 && c2 && c3) ConstituentCtx.addConstituent();
  };

  return (
    <div className="container mb-5 add-container position-relative" dir="rtl">
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
        <div className="row">
          <div className="col">
            <label className="label">
              الاسم
              <input
                className={`form-control input ${
                  !ConstituentCtx.formState.constituentName.valid &&
                  "is-invalid"
                }`}
                name="constituentName"
                type="text"
                value={ConstituentCtx.formState.constituentName.value}
                onChange={(event) => {
                  ConstituentCtx.handleInputChange(event);
                  ConstituentCtx.validateField(
                    event.target.name,
                    "name",
                    event.target.value
                  );
                }}
              />
            </label>
            {!ConstituentCtx.formState.constituentName.valid && (
              <p className="text-danger">
                {ConstituentCtx.getErrorMsg("constituentName")}
              </p>
            )}
          </div>
          <div className="col">
            <label className="label">
              {" "}
              سعر الشراء للوحدة
              <input
                className={`form-control input ${
                  !ConstituentCtx.formState.priceOfUnit.valid && "is-invalid"
                }`}
                name="priceOfUnit"
                type="number"
                value={ConstituentCtx.formState.priceOfUnit.value}
                onChange={(event) => {
                  ConstituentCtx.handleInputChange(event);
                  ConstituentCtx.validateField(
                    event.target.name,
                    "number",
                    event.target.value
                  );
                }}
              />
            </label>
            {!ConstituentCtx.formState.priceOfUnit.valid && (
              <p className="text-danger">
                {ConstituentCtx.getErrorMsg("priceOfUnit")}
              </p>
            )}
          </div>
          <div className="col">
            <label className="label">
              الكمية
              <input
                className={`form-control input ${
                  !ConstituentCtx.formState.noOfUnits.valid && "is-invalid"
                }`}
                name="noOfUnits"
                type="number"
                value={ConstituentCtx.formState.noOfUnits.value}
                onChange={(event) => {
                  ConstituentCtx.handleInputChange(event);
                  ConstituentCtx.validateField(
                    event.target.name,
                    "number",
                    event.target.value
                  );
                }}
              />
            </label>
            {!ConstituentCtx.formState.noOfUnits.valid && (
              <p className="text-danger">
                {ConstituentCtx.getErrorMsg("noOfUnits")}
              </p>
            )}
          </div>
        </div>

        <br />
        <button className="btn btn-primary" type="submit">
          اضافة المكون
        </button>
      </form>
      <button
        className="position-absolute btn btn-outline-info"
        style={{ bottom: "-20%", right: "0" }}
        onClick={() => props.toggleDisplay()}
      >
        اظهار المنتجات <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
    </div>
  );
};

export default AddNewConstituent;
