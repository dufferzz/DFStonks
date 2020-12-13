const doLogin = () => {
  return {
    type: "doLogin",
  };
};

const doLogout = () => {
  return {
    type: "doLogout",
  };
};

const toggleSocket = () => {
  return {
    type: "toggleSocket",
  };
};

const addSocketData = (data) => {
  return {
    type: "addSocketData",
    payload: data,
  };
};

const addToInventory = (data) => {
  return {
    type: "addToInventory",
    payload: data,
  };
};

export { doLogin, doLogout, addSocketData, addToInventory, toggleSocket };
