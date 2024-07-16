import { useEffect } from "react";
import usePopUp from "../../Hooks/use_popup";
import { SandwichProvider } from "../../contextStore/SandwichContext";
import SandwichesList from "../sandwiches/sandwichesList";
import CompositeProdForm from "./CompositeProductForm";

const CompositeProduct = () => {
  const { ControllerBtn, controlFormJSX, FormContent } = usePopUp(" اضافة منتج مركب" );
  const payloadForm = <CompositeProdForm />;
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
export default CompositeProduct;
