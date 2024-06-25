import { useEffect } from "react";
import usePopUp from "../../Hooks/use_popup";
import { ConstituentProvider } from "../../contextStore/constituentContext";
import AddNewConstituent from "./addnewCostituent";
import ConstituentList from "./viewConstituentsList";

const WholeConstituent = (props) => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp(" اضافة مكون  جديد");
  const payloadForm = <AddNewConstituent toggleDisplay={props.toggleDisplay} />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <ConstituentProvider>
      <div className="d-flex flex-column align-content-center align-items-center mt-3">
        <ControllerBtn />
        <FormContent />
      </div>
      <ConstituentList />
    </ConstituentProvider>
  );
};
export default WholeConstituent;
