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

const getDataa = (data) => {
  return {
    type: "getDataa",
    payload: data,
  };
};

const addToInventory = (data) => {
  return {
    type: "addToInventory",
    payload: data,
  };
};

export { doLogin, doLogout, getDataa, addToInventory };
