const bcrypt = require('bcryptjs');

const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  return hashedPassword;
};

const checkPass = async (enteredPassword, hashedPassword) => {
  const doesMatch = await bcrypt.compare(enteredPassword, hashedPassword)

  return doesMatch
};

module.exports = {
  hashPassword,
  checkPass
};
