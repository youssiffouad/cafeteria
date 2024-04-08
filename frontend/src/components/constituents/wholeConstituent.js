import { ConstituentProvider } from "../../contextStore/constituentContext";
import AddNewConstituent from "./addnewCostituent";
import ConstituentList from "./viewConstituentsList";

const WholeConstituent = (props) => {
  return (
    <ConstituentProvider>
      <AddNewConstituent toggleDisplay={props.toggleDisplay} />
      <ConstituentList />
    </ConstituentProvider>
  );
};
export default WholeConstituent;
