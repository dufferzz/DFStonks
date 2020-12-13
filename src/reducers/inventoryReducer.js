const inventoryReducer = (state = { arr: [] }, action) => {
  switch (action.type) {
    case "addToInventory":
      const newItem = {
        stockName: action.payload.stockName,
        price: action.payload.price,
        qty: action.payload.qty,
      };
      return {
        ...state,
        arr: [...state.arr, newItem],
      };

    default:
      return state;
  }
};

export { inventoryReducer };
