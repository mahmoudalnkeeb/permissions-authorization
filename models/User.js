const pool = require('../configs/db');
const { hashPassword, checkPassword } = require('../utils/userUtils');

async function createUser(username, email, password) {
   let client = await pool.connect();
   try {
      let hashedPassword = await hashPassword(password);
      let sql =
         'INSERT INTO user(username , email , password) VALUES($1 , $2 , $3) RETURNING user_id , username , email';
      let query = await client.query(sql, [username, email, hashedPassword]);
      return query.rows[0];
   } catch (error) {
      client.release();
      throw error;
   } finally {
      client.release();
   }
}

async function loginUser(email, password) {
   let client = await pool.connect();
   try {
      let user = await client.query(
         'SELECT user_id , password , username , email FROM users WHERE email=$1',
         [email]
      );
      if (!user.rowCount) return false;
      if (!user.rows[0].password) return false;
      let isEqual = await checkPassword(password, user.rows[0].password);
      if (!isEqual) return false;
      return user.rows[0];
   } catch (error) {
      client.release();
      throw error;
   } finally {
      client.release();
   }
}

module.exports = { createUser, loginUser };
