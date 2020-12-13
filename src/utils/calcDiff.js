const calcDiff = (a, b) => {
  return 100 * Math.abs((a - b) / ((a + b) / 2));
};

export default calcDiff;
