require('dotenv').config();
const pg = require('pg');
const parser = require('pg-connection-string').parse;
const databaseUrl = process.env.DATABASE_URL;
const databaseUrlDev= process.env.DATABASE_URL_DEV;
const env = process.env.ENV;

/** @type {pg.Pool} */
let pool;

if (env == 'dev') {
  let { host, port, user, password, database } = parser(databaseUrlDev);
  pool = new pg.Pool({
    host,
    port,
    user,
    password,
    database,
  });
} else {
  let { host, port, user, password, database } = parser(databaseUrl);
  pool = new pg.Pool({
    host,
    port,
    user,
    password,
    database,
    ssl: { rejectUnauthorized: false },
    max:20
  });
}


module.exports = pool;
