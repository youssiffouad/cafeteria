import { useEffect } from "react";
import usePopUp from "../../Hooks/use_popup";
import { SandwichProvider } from "../../contextStore/SandwichContext";
import SandwichForm from "./addNewSandwich";
import SandwichesList from "./sandwichesList";

const WholeSandwich = () => {
  const { ControllerBtn, controlFormJSX, FormContent } =
    usePopUp("اضافة ساندوتش جديد");
  const payloadForm = <SandwichForm />;
  useEffect(() => {
    controlFormJSX(payloadForm);
  }, []);
  return (
    <SandwichProvider>
      <div className="d-flex flex-column align-content-center align-items-center mt-3">
        <ControllerBtn />
        <FormContent />
      </div>
      <SandwichesList />
    </SandwichProvider>
  );
};
export default WholeSandwich;
