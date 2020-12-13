const chartReducer = (state = [], action) => {
  switch (action.type) {
    case "addChart":
      return [
        ...state,
        {
          title: action.payload.title,
          isActive: true,
          data: action.payload.data,
        },
      ];

    default:
      return state;
  }
};

export { chartReducer };
