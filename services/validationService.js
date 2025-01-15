const validateUser = (userData) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!userData.name || typeof userData.name !== "string" || ["admin", "user"].includes(userData.name.toLowerCase()) || !nameRegex.test(userData.name)) {
    errors.push("Name is required, must be a string, and cannot be 'admin' or 'user'.");
  }
  if (!userData.email || typeof userData.email !== "string" || userData.email == "admin@gmail.com" || !emailRegex.test(userData.email)) {
    errors.push("Email is required, must be a valid email address, and cannot be 'admin@gmail.com'.");
  }

  if (!userData.password || typeof userData.password !== "string" || !passwordRegex.test(userData.password)) {
    errors.push("Password is required and must be at least 6 characters long and contain at least one letter and one number.");
  }

  if (userData.is_admin === undefined || userData.is_admin !== 0 && userData.is_admin !== 1) {
    errors.push("is_admin is required and must be a 0 or 1.");
  }

  return errors;
};

const validatePartialUser = (userData) => {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
  
    if (userData.name && (typeof userData.name !== "string" || ["admin", "user"].includes(userData.name.toLowerCase()) || !nameRegex.test(userData.name))) {
      errors.push("Name must only contain letters and spaces.");
    }
  
    if (userData.email && (typeof userData.email !== "string" || userData.email == "admin@gmail.com" || !emailRegex.test(userData.email))) {
      errors.push("Email must be a valid email address.");
    }
  
    if (userData.password && (typeof userData.password !== "string" || !passwordRegex.test(userData.password))) {
      errors.push("Password is required and must be at least 6 characters long and contain at least one letter and one number.");
    }
  
    if (userData.is_admin !== undefined && userData.is_admin !== 0 && userData.is_admin !== 1) {
      errors.push("is_admin must be either 0 or 1.");
    }
  
return errors;
};

const validateBooks = (bookData) => {
    const errors = [];
    const titleRegex = /^[a-zA-Z\s]+$/;
    const descriptionRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;


    if (!bookData.title || typeof bookData.title !== "string" || !titleRegex.test(bookData.title)){
        errors.push("Title must only contain letters and spaces")
    }

    if (!bookData.description || typeof bookData.description !== "string" || !descriptionRegex.test(bookData.description)) {
        errors.push("Description is required, must be a valid description.");
    }

    if (!bookData.rating || typeof bookData.rating !== "number" || bookData.rating < 0 ||bookData.rating > 5){
        errors.push("Rating is required, must be a number and must have a rating from 0 to 5")
    }

    if (!bookData.user_id || typeof bookData.user_id !== "number" || bookData.user_id <= 0){
        errors.push("User id is required, must be a number and must be above 0")
    }

    if (bookData.image) {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = bookData.image.split('.').pop().toLowerCase();
    
        if (!allowedExtensions.includes(fileExtension)) {
          errors.push("Image must be a JPG, JPEG, or PNG file.");
        }
    }

return errors;
}

const validatePartialBooks = (bookData) => {
    const errors = [];
    const titleRegex = /^[a-zA-Z\s]+$/;
    const descriptionRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;

    if (bookData.title && (typeof bookData.title !== "string" || !titleRegex.test(bookData.title))) {
        errors.push("Title must only contain letters and spaces.");
    }

    if (bookData.description && (typeof bookData.description !== "string" || !descriptionRegex.test(bookData.description))) {
        errors.push("Description must be a valid description.");
    }

    if (bookData.description && (typeof bookData.rating !== "number" || bookData.rating < 0 ||bookData.rating > 5)){
        errors.push("Rating is required, must be a number and must have a rating from 0 to 5")
    }

    if (bookData.description && (typeof bookData.user_id !== "number" || bookData.user_id <= 0)){
        errors.push("User id is required, must be a number and must be above 0")
    }

    if (bookData.image) {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = bookData.image.split('.').pop().toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
          errors.push("Image must be a JPG, JPEG, or PNG file.");
        }
    }
return errors;
}

const validateNews = (newsData) => {
    const errors = [];
    const titleRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
    const contentRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
  
    if (!newsData.title || typeof newsData.title !== "string" || !titleRegex.test(newsData.title)) {
      errors.push("Title must only contain letters, numbers, and allowed punctuation.");
    }
  
    if (!newsData.content || typeof newsData.content !== "string" || !contentRegex.test(newsData.content)) {
      errors.push("Content is required and must be a valid text.");
    }
  
    if (newsData.image) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = newsData.image.split('.').pop().toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension)) {
        errors.push("Image must be a JPG, JPEG, or PNG file.");
      }
    }
  
return errors;
};

const validatePartialNews = (newsData) => {
    const errors = [];
    const titleRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
    const contentRegex = /^[a-zA-Z0-9\s.,!?'"()-]+$/;
  
    if (newsData.title && (typeof newsData.title !== "string" || !titleRegex.test(newsData.title))) {
      errors.push("Title must only contain letters, numbers, and allowed punctuation.");
    }
  
    if (newsData.content && (typeof newsData.content !== "string" || !contentRegex.test(newsData.content))) {
      errors.push("Content must be a valid text.");
    }
  
    if (newsData.image) {
      const allowedExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = newsData.image.split('.').pop().toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension)) {
        errors.push("Image must be a JPG, JPEG, or PNG file.");
      }
  
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (newsData.image.size && newsData.image.size > MAX_FILE_SIZE) {
        errors.push("Image file size must not exceed 5MB.");
      }
    }
  
return errors;
};

module.exports = {
    validateUser,
    validatePartialUser,
    validateBooks,
    validatePartialBooks,
    validateNews,
    validatePartialNews
};