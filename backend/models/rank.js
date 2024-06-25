const db = require("./db");

class Rank {
  static AddRank(name, callback) {
    db.run(`INSERT INTO Ranks (name) VALUES (?)`, [name], (err) => {
      if (err) {
        callback(err);
        return;
      } else {
        const rankId = this.lastID;
        callback(null, {
          message: "Rank added successfully",
          rank_id: rankId,
        });
      }
    });
  }

  //function to view all ranks

  static viewRanks(callback) {
    db.all(`select id ,name from Ranks `, (err, rows) => {
      if (err) {
        callback(err);
      } else {
        callback(null, rows);
      }
    });
  }
}

module.exports = Rank;
