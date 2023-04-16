const bcrypt = require("bcrypt");
const hashedPassword = (str) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};

module.exports = {
  hashedPassword,
};
