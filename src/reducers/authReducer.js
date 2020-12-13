const authReducer = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case "doLogin":
      return { isLoggedIn: (state.isLoggedIn = true) };
    case "doLogout":
      return { isLoggedIn: (state.isLoggedIn = false) };
    default:
      return state;
  }
};

export { authReducer };
