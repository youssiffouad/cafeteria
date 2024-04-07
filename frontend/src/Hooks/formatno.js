export const formatNo = (num) => {
  if (num % 1 !== 0) {
    // If it has a fractional part, format it to two decimal places
    return num.toFixed(2);
  } else {
    // If it's an integer, return it without decimal places
    return num.toString();
  }
};
