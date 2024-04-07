const db = require("../models/db");
const ranks = [
  "جندي",
  "عريف",
  "رقيب",
  "رقيب أول",
  "مساعد",
  "مساعد أول",
  "ملازم",
  "ملازم أول",
  "نقيب",
  "رائد",
  "مقدم",
  "عقيد",
  "عميد",
  "لواء",
];

const insertRank = async (rank) => {
  const sql = "INSERT INTO Ranks(name) VALUES (?)";
  return new Promise((resolve, reject) => {
    db.run(sql, rank, function (err) {
      if (err) {
        console.log("Failed to insert rank", rank, "into ranks table");
        reject(err);
      } else {
        console.log(
          "Successfully added the rank",
          rank,
          "into ranks table with id",
          this.lastID
        );
        resolve(this.lastID);
      }
    });
  });
};

const InsertAllRanks = async () => {
  try {
    for (const rank of ranks) {
      await insertRank(rank);
    }
    console.log("All ranks inserted successfully.");
  } catch (error) {
    console.error("Error inserting ranks:", error);
  } finally {
    db.close();
  }
};

InsertAllRanks();
