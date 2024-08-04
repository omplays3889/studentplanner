export const isValidEmail = (email) => {
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

export const checkEmails = (emailString) => {
    if (emailString) {
      const cleanedEmails = emailString
        .split(',') // Split the string by commas
        .map(email => email.trim()) // Trim any leading/trailing whitespace from each part
        .filter(email => email !== '');

      const allValid = cleanedEmails.every(email => isValidEmail(email));

      const emails = cleanedEmails.join(',');
      return {
        allValid,
        emails
      }
    }
    return false;
  };
