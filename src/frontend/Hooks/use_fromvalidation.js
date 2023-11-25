import { useState } from "react";

const useFormValidation = (initialFormState) => {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const getErrorMsg = (fieldName) => {
    console.log(fieldName);
    console.log(errors);
    return errors[fieldName];
  };

  const handleInputChange = (event, type) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value }, () => {
      // Call validateField here or perform other actions after state update
    });
  };

  const isEmpty = (value) => {
    return value.trim() === "";
  };

  const nullCheckValidation = (fieldName, fieldValue) => {
    if (isEmpty(fieldValue)) {
      console.log(`i am in nullcheck validation`);
      console.log(fieldName);
      console.log(fieldValue);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName} cannot be empty`,
      }));
      return false; // Return false indicating validation failed
    }
    return true; // Return true indicating validation passed
  };

  const nameFieldValidation = (fieldName, fieldValue) => {
    const isValid = nullCheckValidation(fieldName, fieldValue);
    console.log(fieldValue);

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

  const validateField = (fieldName, fieldType, fieldValue) => {
    if (fieldType === "name") {
      return nameFieldValidation(fieldName, fieldValue);
    } else if (fieldType === "number") {
      return numberFieldValidation(fieldName, fieldValue);
    } else if (fieldType === "dropdown") {
      return dropDownFieldValidation(fieldName, fieldValue);
    } else if (fieldType === "date") {
      return dateFieldValidation(fieldName, fieldValue);
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
    getErrorMsg,
  };
};

export default useFormValidation;
