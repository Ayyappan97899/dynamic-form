import type { FC } from "react";
import { useEffect, useState } from "react";
import AppModal from "./ui/AppModal";
import AppFields from "./ui/AppFields";
import useOnChangeHandler from "../hooks/useOnChangeHandler";
import type { FormValues, User, Field } from "../types";
import { userFormFields } from "../constant";

interface AppUserFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  initialValues?: User;
}

const defaultValues: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(?=(?:.*\d){10}$)[6-9][0-9\s-]{9}$/;

// Generate random string ID (e.g., "usr_a1b2c3d4e5f6")
const generateRandomId = (): string => {
  const prefix = "usr_";
  const randomStr = Math.random().toString(36).substring(2, 14);
  return prefix + randomStr;
};

const AppUserForm: FC<AppUserFormProps> = ({
  open,
  onClose,
  onSave,
  initialValues,
}) => {
  const { values, handleChange, setValues, resetValues } =
    useOnChangeHandler(defaultValues);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      if (initialValues) {
        setValues({
          firstName: initialValues.firstName || "",
          lastName: initialValues.lastName || "",
          phone: initialValues.phone || "",
          email: initialValues.email || "",
        });
      } else {
        setValues(defaultValues);
      }
      setErrors({});
    } else {
      resetValues();
      setErrors({});
    }
  }, [open, initialValues, setValues, resetValues]);

  const validateField = (name: string, value: string | number): string => {
    const str = String(value).trim();
    const fieldMeta = (userFormFields as Field[]).find((f) => f.name === name);

    if (fieldMeta?.required && !str) {
      return "This field is required";
    }

    if (name === "email" && str && !emailRegex.test(str)) {
      return "Enter a valid email address";
    }

    if (name === "phone" && str && !phoneRegex.test(str)) {
      return "Enter a valid Indian phone number";
    }

    return "";
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    const { name, value } = e.target;
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const validateAll = (): boolean => {
    const nextErrors: Record<string, string> = {};
    (userFormFields as Field[]).forEach((f) => {
      const val = values[f.name] ?? "";
      const msg = validateField(f.name, val);
      if (msg) nextErrors[f.name] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateAll()) {
      return;
    }

    const user: User = {
      id: initialValues?.id || generateRandomId(),
      firstName: String(values.firstName),
      lastName: String(values.lastName),
      phone: String(values.phone),
      email: String(values.email),
    };

    onSave(user);
    onClose();
    resetValues();
    setErrors({});
  };

  const isEditMode = Boolean(initialValues?.id);
  const modalTitle = isEditMode ? "Edit User" : "Add User";

  return (
    <AppModal
      open={open}
      title={modalTitle}
      onClose={onClose}
      onConfirm={handleSave}
      confirmText="Save"
      cancelText="Cancel"
      maxWidth="sm"
      fullWidth
    >
      <AppFields
        fields={userFormFields}
        values={values}
        onChange={handleFieldChange}
        errors={errors}
      />
    </AppModal>
  );
};

export default AppUserForm;
