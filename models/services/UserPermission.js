// create user permission

const pool = require('../configs/db');

async function getUserPermissions(userId) {
   let client = await pool.connect();
   try {
      let query = await client.query('SELECT permission FROM permissions WHERE user_id=$1', [userId]);
      if (!query.rowCount) return [];
      // map throw array of objects to be only array of permissions string
      let permissionsArray = query.rows.map((perm) => perm.permission);
      return permissionsArray;
   } catch (error) {
      client.release();
      throw error;
   } finally {
      client.release();
   }
}

// get user permission

// update user permissions

// delete user permission

module.exports = { getUserPermissions };
