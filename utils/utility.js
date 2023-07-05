class Utility {
    // Function to generate a random alphanumeric string of a specified length
    static generateRandomString(length) {
      const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
      }
      return randomString;
    }
  
    // Function to validate an email address format
    static isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Function to capitalize the first letter of a string
    static capitalizeFirstLetter(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  
    // Function to get the current date in ISO format (e.g., "2023-07-05T12:34:56Z")
    static getCurrentISODate() {
      return new Date().toISOString();
    }
  
    // Function to delay the execution of a promise by a specified number of milliseconds
    static delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
  
  export default Utility;
  