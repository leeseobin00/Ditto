export const isPasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const isPasswordValid = (password) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
  return passwordRegex.test(password);
};