const db=require("../models/db");

//create notification table in the database

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Notification (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        seen BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

db.serialize(() => {
    db.run(createTableQuery, (err) => {
        if (err) {
            console.error("Error creating Notification table:", err.message);
        } else {
            console.log("Notification table created successfully");
        }
    });
});

