const dayjs = require("dayjs");
const { DATE_FORMAT } = require("../utils/consts");

function isNone(value) {
  return (
    value === undefined ||
    value === null ||
    value === "null" ||
    value === "undefined"
  );
}

function now() {
  return dayjs().format(DATE_FORMAT);
}

module.exports = {
  isNone,
  now,
};
