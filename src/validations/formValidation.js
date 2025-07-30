
export const validationRules = {
  name: (value) => {
    if (!value.trim()) return "Name is required";
  },
  email: (value) => {
    if (!value) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      return "Invalid email address";
    }
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Must be at least 6 characters";
  },
  confirmPassword: (value, allValues) => {
    if (!value) return "Please confirm your password";
    if (value !== allValues.password) return "Passwords do not match";
  },
};

export const validateField = (field, value, allValues) => {
  const rule = validationRules[field];
  return rule ? rule(value, allValues) : "";
};
