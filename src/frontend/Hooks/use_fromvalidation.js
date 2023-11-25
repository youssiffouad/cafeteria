import { useState } from "react";

const useFormValidation = (initialFormState) => {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const isEmpty = (value) => {
    return value.trim() === "";
  };

  const nullCheckValidation = (fieldName, fieldValue) => {
    if (isEmpty(fieldValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName} cannot be empty`,
      }));
      return false; // Return false indicating validation failed
    }
    return true; // Return true indicating validation passed
  };

  const nameFieldValidation = (nameValue) => {
    const isValid = nullCheckValidation("Name", nameValue);
    console.log(nameValue);

    return isValid;
  };

  const numberFieldValidation = (numberValue) => {
    const notempty = nullCheckValidation("Number", numberValue);
    const didgitsOnly = /^\d+$/.test(numberValue); //using regular expressions
    return notempty && didgitsOnly;
  };

  const dropDownFieldValidation = (dropValue) => {
    const isValid = nullCheckValidation("Dropdown", dropValue);

    return isValid;
  };

  const dateFieldValidation = (dateValue) => {
    const isValid = nullCheckValidation("Date", dateValue);

    return isValid;
  };

  const validateField = (fieldType, fieldValue) => {
    if (fieldType === "name") {
      return nameFieldValidation(fieldValue);
    } else if (fieldType === "number") {
      return numberFieldValidation(fieldValue);
    } else if (fieldType === "dropdown") {
      return dropDownFieldValidation(fieldValue);
    } else if (fieldType === "date") {
      return dateFieldValidation(fieldValue);
    }
    return true; // Return true if no specific validation needed for the field type
  };
  const resetField = (fieldName) => {
    setFormState({ ...formState, [fieldName]: "" });
  };

  return {
    formState,
    errors,
    handleInputChange,
    validateField,
    resetField,
  };
};

export default useFormValidation;
