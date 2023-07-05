const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(databaseFilePath) {
    this.db = new sqlite3.Database(databaseFilePath);
  }

  run(query, params) {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve(this);
        }
      });
    });
  }

  get(query, params) {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, function (error, row) {
        if (error) {
          reject(error);
        } else {
          resolve(row);
        }
      });
    });
  }

  all(query, params) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, function (error, rows) {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close(error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Database;
