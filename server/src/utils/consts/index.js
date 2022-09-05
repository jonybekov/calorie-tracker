const roles = require("./roles");
const DATE_FORMAT = "DD-MMM-YYYY";
const BYCRIPT_SALT = 10;

module.exports = {
  ...roles,
  DATE_FORMAT,
  BYCRIPT_SALT,
};
