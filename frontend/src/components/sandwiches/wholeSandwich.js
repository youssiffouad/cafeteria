import { SandwichProvider } from "../../contextStore/SandwichContext";
import SandwichForm from "./addNewSandwich";
import SandwichesList from "./sandwichesList";

const WholeSandwich = () => {
  return (
    <SandwichProvider>
      <SandwichForm />
      <SandwichesList />
    </SandwichProvider>
  );
};
export default WholeSandwich;
