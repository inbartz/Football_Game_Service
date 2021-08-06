require("dotenv").config();
const sql = require("mssql");
var express = require("express");



const config = {
    user: process.env.db_userName, 
    password: process.env.db_password, 
    server: process.env.db_server, 
    database: process.env.db_database, 
    connectionTimeout: 1500000,
    options: {
      encrypt: true,
      enableArithAbort: true,
    },
  };

  const pool = new sql.ConnectionPool(config);
const poolConnect = pool
  .connect()
  .then(() => console.log("new connection pool Created"))
  .catch((err) => console.log(err));

async function execQuery(query) {
  await poolConnect;
  try {
    var result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("SQL error", err);
    throw err;
  }
}

execQuery().catch((error) => console.log(`Error in executing ${error}`));

process.on("SIGINT", function () {
  if (pool) {
    pool.close(() => console.log("connection pool closed"));
  }
});

async function create_table() {
    let returned = await execQuery(
      "CREATE TABLE [dbo].[teams]([teams_id] [UNIQUEIDENTIFIER] NOT NULL default NEWID(),[teams_name] [varchar](300) NOT NULL,PRIMARY KEY (teams_id))"
    );
    return returned;
  }