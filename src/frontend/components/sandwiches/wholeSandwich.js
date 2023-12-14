import { SandwichProvider } from "../../contextStore/SandwichContext";
import SandwichForm from "./addNewSandwich";

const WholeSandwich = () => {
  return (
    <SandwichProvider>
      <SandwichForm />
    </SandwichProvider>
  );
};
export default WholeSandwich;
