// db.js
import mysql from "mysql2";

let db;

function initialiseDB(host, user, password, database) {
  db = mysql.createConnection({
    host,
    user,
    password,
    database,
    port: 3306,
  });

  db.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:", err.stack);
      return;
    }
    console.log("Successfully connected to the database as ID " + db.threadId);
  });
}

export { db, initialiseDB };
