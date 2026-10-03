export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return "Email address is required";
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return "Please enter a valid email address (e.g. user@example.com)";
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Phone number is required";
  }
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phone.trim())) {
    return "Please enter a valid phone number (min 10 digits)";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  return null;
};

export const validateLoginForm = (identifier, password, isPhoneMode) => {
  const errors = {};

  if (isPhoneMode) {
    const phoneErr = validatePhone(identifier);
    if (phoneErr) errors.phone = phoneErr;
  } else {
    const emailErr = validateEmail(identifier);
    if (emailErr) errors.email = emailErr;
  }

  const passErr = validatePassword(password);
  if (passErr) errors.password = passErr;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
