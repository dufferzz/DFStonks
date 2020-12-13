const currentDate = new Date();

const socketReducer = (
  // Construct a default state on init

  //TODO: How to break this down more compoenenty... static chart1 is nasty..
  // Array of SocketClient objects

  // default state empty array, SocketClients = SocketClient[]

  // SocketClient = {
  //    isActive: true,
  //    curVal: action.payload.data.slice(-1)[0],
  //    prevVal: action.payload.data.slice(-2)[0],
  //    tickDiff: calcDiff(action.payload.data.slice(-1)[0], action.payload.data.slice(-2)[0]),
  //    data: action.payload.data
  // }

  // Need to add checks before try to render null values on charts..
  // Also add function to add more charts dynamically..

  state = {
    isActive: true,
    chart1: [
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
    case "addSocketData":
      if (state.chart1.length > 25) state.chart1.shift();

      return {
        ...state,
        chart1: [
          ...state.chart1,
          {
            x: action.payload.time,
            y: action.payload.currentPrice,
            stockName: action.payload.stock,
            unitsPurchased: action.payload.unitsPurchased,
            unitsSold: action.payload.unitsSold,
            yLow: action.payload.yLow,
            yHigh: action.payload.yHigh,
            yOpen: action.payload.yOpen,
            yClose: action.payload.yClose,
          },
        ],
      };
    case "toggleSocket":
      return {
        ...state,
        isActive: !state.isActive,
      };

    default:
      return state;
  }
};

// Gosh Darnit, Prettier... What did you do..

export { socketReducer };
