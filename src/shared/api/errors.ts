import { useState } from 'react';

export const useValidation = <T extends Record<string, string>>(fields: (keyof T)[]) => {
  const [errorFields, setErrorFields] = useState<Record<keyof T, boolean>>(() => {
    const initialErrors = {} as Record<keyof T, boolean>;
    fields.forEach((field) => {
      initialErrors[field] = false;
    });
    return initialErrors;
  });

  const validateFields = (fieldValues) => {
    const errors = {} as Record<keyof T, boolean>;
    fields.forEach((field) => {
      errors[field] = fieldValues[field] === '';
    });

    setErrorFields(errors);
    return !Object.values(errors).some(Boolean);
  };

  return { errorFields, validateFields };
}
