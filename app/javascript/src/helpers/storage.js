const setToLocalStorage = ({ authToken, email, userId, user_name }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("authEmail", JSON.stringify(email));
  localStorage.setItem("authUserId", JSON.stringify(userId));
  localStorage.setItem("authUserName", JSON.stringify(user_name));
};

const getFromLocalStorage = key => {
  let storedValue = null;
  try {
    storedValue = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(null));
    logger.error(error);
  }
  return storedValue;
};

export { setToLocalStorage, getFromLocalStorage };
