export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 6) {
    return { valid: false, error: 'Senha deve ter no mínimo 6 caracteres' };
  }
  return { valid: true };
};

export const validateHeight = (height: number): boolean => {
  return height >= 100 && height <= 250;
};

export const validateWeight = (weight: number): boolean => {
  return weight >= 30 && weight <= 300;
};

export const validateDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
