import { useState, type ChangeEvent, useCallback } from "react";
import type { FormValues } from "../types";

interface UseOnChangeHandlerReturn {
  values: FormValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: FormValues) => void;
  resetValues: () => void;
}

const useOnChangeHandler = (
  initialValues: FormValues = {}
): UseOnChangeHandlerReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);

  // TODO: Future enhancement - handle multiple field types
  // Current: Handles text input fields (firstName, lastName, email, phone, etc.)
  // Future: Extend to support:
  //   - Radio buttons: extract value from event.target.value
  //   - Select/Dropdown: extract value from event.target.value
  //   - Checkboxes: extract checked state from event.target.checked
  //   - File inputs: handle event.target.files
  // Consider creating separate handlers: handleRadioChange, handleSelectChange, etc.
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const resetValues = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    setValues,
    resetValues,
  };
};

export default useOnChangeHandler;
