export const isSpaceInUseHandler = function (arr, param1, param2) {
  return arr.some((val) => val[param1] === param2);
};

export const findDataIndexHandler = function (arr, param1, param2) {
  return arr.findIndex((val) => val[param1] === param2);
};

export const filterDataHandler = function (arr, param1, param2) {
  return arr.filter((val) => val[param1] === param2);
};

export const searchDataHandler = function (arr, param1, param2) {
  return arr.find((val) => val[param1] === param2);
};