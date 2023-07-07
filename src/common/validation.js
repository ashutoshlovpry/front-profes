export const isValidEmail = (email) => {
    // Perform email validation logic (e.g., regex)
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };
  