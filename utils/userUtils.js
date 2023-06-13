const { compare, hash, genSalt } = require('bcrypt');

async function hashPassword(password) {
   let salt = await genSalt(process.env.ROUNDS);
   let hashedPassword = await hash(password, salt);
   return hashedPassword;
}

async function checkPassword(password, hashedPassword) {
   let isEqual = await compare(password, hashedPassword);
   return isEqual;
}

module.exports = { hashPassword, checkPassword };
