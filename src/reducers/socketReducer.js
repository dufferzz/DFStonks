const currentDate = new Date();

const socketReducer = (
  // Construct a default state on init
  state = {
    arr: [
      {
        x: currentDate.getTime(),
        y: 0,
        stockName: "",
        yLow: 0,
        yHigh: 0,
        yOpen: 0,
        yClose: 0,
      },
    ],
  },
  action
) => {
  switch (action.type) {
    case "getDataa":
      const {
        currentPrice,
        stock,
        time,
        unitsPurchased,
        unitsSold,
        yClose,
        yHigh,
        yLow,
        yOpen,
      } = action.payload;

      if (state.arr.length > 50) state.arr.shift();

      return {
        ...state,
        arr: [
          ...state.arr,
          {
            x: time,
            y: currentPrice,
            stockName: stock,
            unitsPurchased: unitsPurchased,
            unitsSold: unitsSold,

            yLow: yLow,
            yHigh: yHigh,
            yOpen: yOpen,
            yClose: yClose,
          },
        ],
      };
    default:
      return state;
  }
};

export { socketReducer };
