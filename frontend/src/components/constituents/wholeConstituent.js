import { ConstituentProvider } from "../../contextStore/constituentContext";
import AddNewConstituent from "./addnewCostituent";
import ConstituentList from "./viewConstituentsList";

const WholeConstituent = () => {
  return (
    <ConstituentProvider>
      <AddNewConstituent />
      <ConstituentList />
    </ConstituentProvider>
  );
};
export default WholeConstituent;
