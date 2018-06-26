'use strict';

const generateEnumKey = (enumObj) => {
  const enumList = [];
  for (const key in enumObj) {
    if (Object.hasOwnProperty(key)) {
      enumList.push(key);
    }
  }
  return enumList;
};

module.exports = {
  generateEnumKey,
};
