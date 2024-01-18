const db = require("../models/db");

db.run("update Vendors set owedmoney=?", [0]);
