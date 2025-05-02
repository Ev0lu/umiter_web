import { useState, useEffect } from 'react';
import { useValidation } from '@/shared/api/index';

/**
 * Hook to manage state and logic for the Registration component.
 * Handles field changes, validation, and password visibility.
 */
export const useRegistrationModel = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [checkIsValidPhone, setCheckIsValidPhone] = useState('');
  const [checkUniqueLoginPhone] = useState(''); // Placeholder for future uniqueness check

  // Password field visibility logic
  useEffect(() => {
    if (password === '') {
      setShowPassword(true);
    } else {
      setTimeout(() => setShowPassword(false), 200);
    }
  }, [password]);

  /**
   * Handles changes in the name field, sanitizing input.
   * @param event - input change event
   */
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/[<>%$&!*^`/"',.|#@()\[\]{}0-9]/g, '');
    setName(sanitizedValue);
  };

  /**
   * Handles changes in the phone field and updates phone validity.
   * @param event - input change event
   */
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValidPhone = /^\+/.test(event.target.value);
    setCheckIsValidPhone(isValidPhone ? 'true' : '');
    setPhone(event.target.value);
  };

  /**
   * Toggles password visibility.
   */
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const { errorFields, validateFields } = useValidation([
    'name',
    'phone',
    'password',
    'checkIsValidPhone',
    'checkUniqueLoginPhone',
  ]);

  const fieldValues = { name, phone, password, checkIsValidPhone, checkUniqueLoginPhone };

  /**
   * Handles registration button click: validates fields and stores data in sessionStorage if valid.
   * @returns {boolean} - true if registration data is valid, false otherwise
   */
  const handleRegister = () => {
    validateFields(fieldValues);
    const isValid =
      name &&
      phone &&
      password &&
      password.length > 9 &&
      checkIsValidPhone === 'true';

    if (isValid) {
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('phone', phone);
      sessionStorage.setItem('password', password);
      return true;
    }
    return false;
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    checkIsValidPhone,
    handleChangeName,
    handlePhoneChange,
    handleTogglePassword,
    errorFields,
    handleRegister,
  };
};
