import { useState } from "react";

const useFormValidation = (initialFormState) => {
  const [formState, setFormState] = useState({
    ...initialFormState,
    formValidity: false,
  });
  const [errors, setErrors] = useState({});
  const getErrorMsg = (fieldName) => {
    console.log(fieldName);
    console.log(errors);
    return errors[fieldName];
  };

  const resetErrors = (fieldName) => {
    setErrors(
      (prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }),
      console.log(errors)
    );
  };
  const HandleAuthError = (fieldName, msg) => {
    setErrors(
      (prevErrors) => ({
        ...prevErrors,
        [fieldName]: msg,
      }),
      console.log(errors)
    );
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    //modify only the value portion of the sent fieldname
    setFormState((prevstate) => {
      return { ...prevstate, [name]: { ...prevstate[name], value } };
    });
    console.log(formState);
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
      setFormState((prevstate) => {
        return {
          ...prevstate,
          formValidity: false,
          [fieldName]: { ...prevstate[fieldName], valid: false },
        };
      });
      return false; // Return false indicating validation failed
    }
    setFormState((prevstate) => {
      return {
        ...prevstate,
        [fieldName]: { ...prevstate[fieldName], valid: true },
      };
    });
    return true; // Return true indicating validation passed
  };

  const nameFieldValidation = (fieldName, fieldValue) => {
    const isValid = nullCheckValidation(fieldName, fieldValue);
    console.log(fieldValue);

    return isValid;
  };

  const numberFieldValidation = (fieldName, fieldValue) => {
    const notempty = nullCheckValidation(fieldName, fieldValue);
    const didgitsOnly = /^\d+$/.test(fieldValue); //using regular expressions
    return notempty && didgitsOnly;
  };

  const dropDownFieldValidation = (fieldName, fieldValue) => {
    const isValid = nullCheckValidation(fieldName, fieldValue);
    console.log(fieldValue);

    return isValid;
  };

  const dateFieldValidation = (fieldName, fieldValue) => {
    const isValid = nullCheckValidation(fieldName, fieldValue);

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
    console.log("i called reset field", fieldName);
    setFormState((prev) => {
      return {
        ...prev,
        [fieldName]: { value: "", valid: true },
      };
    });
    console.log("ya rab ba2a mn el ", fieldName, formState);
  };

  return {
    formState,
    errors,
    handleInputChange,
    validateField,
    HandleAuthError,
    resetField,
    getErrorMsg,
    resetErrors,
  };
};

export default useFormValidation;
