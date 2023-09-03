const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("cafeteria");
// Enable foreign key constraints
db.run("PRAGMA foreign_keys = ON;", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Foreign key constraints enabled");
  }
});

// Enable JSON request body parsing
app.use(express.json());
app.use(cors());

/// Add a new product
app.post("/addproduct", (req, res) => {
  const { name, vendor_id, selling_price, quantity } = req.body;
  db.run("PRAGMA foreign_keys = ON;");
  db.run(
    `INSERT INTO Products (name, vendor_id, selling_price, quantity) VALUES (?, ?, ?, ?)`,
    [name, vendor_id, selling_price, quantity],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add product" });
      } else {
        res.json({
          message: "Product added successfully",
          prod_id: this.lastID,
        });
      }
    }
  );
});

// Add a new input (lot)
app.post("/addlot", (req, res) => {
  const { productID, quantity, cost, received_date } = req.body;
  db.run("PRAGMA foreign_keys = ON;");

  db.run(
    `INSERT INTO Lots (product_id, quantity, cost, received_date) VALUES (?, ?, ?, ?)`,
    [productID, quantity, cost, received_date],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add item" });
      } else {
        const lotID = this.lastID;
        console.log("lot  added");
        db.run(
          `UPDATE Products SET quantity = quantity + ? WHERE id=?`,
          [quantity, productID],
          function (err) {
            if (err) {
              console.error(err);
              res
                .status(500)
                .json({ error: "Failed to update product quantity" });
            } else {
              console.log("Sale added");

              res.json({
                message: "Lot added successfully",
                lot_id: lotID,
              });
            }
          }
        );
      }
    }
  );
});

// add  a new vendor
app.post("/addvendors", (req, res) => {
  const { name, phone } = req.body;

  db.run(
    `INSERT INTO Vendors (name, phone) VALUES (?, ?)`,
    [name, phone],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add vendor" });
      } else {
        res.json({
          message: "Vendor added successfully",
          vendor_id: this.lastID,
        });
      }
    }
  );
});

// Add a new  output sale
app.post("/addsale", (req, res) => {
  const { productID, quantity, received_date } = req.body;
  db.run("PRAGMA foreign_keys = ON;");
  // Fetch the product price from the Products table
  db.get(
    `SELECT selling_price FROM Products WHERE id = ?`,
    [productID],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch product price" });
        return;
      }

      if (!row) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const productPrice = row.selling_price;
      const revenue = productPrice * quantity;

      db.serialize(() => {
        db.run(
          `INSERT INTO Sales (product_id, sale_date, quantity, revenue) VALUES (?, ?, ?, ?)`,
          [productID, received_date, quantity, revenue],
          function (err) {
            if (err) {
              console.error(err);
              res.status(500).json({ error: "Failed to add sale" });
              return;
            }

            const saleId = this.lastID;

            // Update the quantity in the Products table
            db.run(
              `UPDATE Products SET quantity = quantity - ? WHERE id = ?`,
              [quantity, productID],
              function (err) {
                if (err) {
                  console.error(err);
                  res
                    .status(500)
                    .json({ error: "Failed to update product quantity" });
                } else {
                  console.log("Sale added");

                  res.json({
                    message: "Sale added successfully",
                    sale_id: saleId,
                  });
                }
              }
            );
          }
        );
      });
    }
  );
});

// Get all vendors
app.get("/vendors", (req, res) => {
  db.all("SELECT * FROM Vendors", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to get vendors" });
    } else {
      res.json(rows);
    }
  });
});

// Get all products with vendor details
app.get("/products", (req, res) => {
  db.all(
    "SELECT p.name as prodname,p.id ,v.name as vendorname, p.selling_price, p.quantity FROM Products p JOIN Vendors v ON p.vendor_id=v.id  ",
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get products" });
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

// Get all lots with  product details
app.get("/lots", (req, res) => {
  db.all(
    "SELECT  lot.quantity ,p.name AS prodname , lot.product_id, lot.cost ,lot.received_date,lot.id FROM Lots lot , Products p ON lot.product_id=p.id  ",
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get lots" });
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

// select lots in certain interval
app.post("/filterlotdate", (req, res) => {
  const { startdate, enddate } = req.body;
  db.all(
    `select l.quantity ,l.id, l.cost ,l.received_date , p.name as prodname from Products p , Lots l on p.id=l.product_id 
    where l.received_date between ? and ?`,
    [startdate, enddate],

    (err, rows) => {
      if (err) {
        console.log(err);
        res.status.json({ error: "failed to get filtetrd lots" });
      } else {
        console.log(startdate);
        console.log("dkjnbjhdbfj");
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

// select sales in certain interval
app.post("/filtersalesdate", (req, res) => {
  const { startdate, enddate } = req.body;
  db.all(
    `select s.quantity ,s.id, s.revenue ,s.sale_date , p.name as prodname from Products p , Sales s on p.id=s.product_id 
    where s.sale_date between ? and ?`,
    [startdate, enddate],

    (err, rows) => {
      if (err) {
        console.log(err);
        res.status.json({ error: "failed to get filtetrd sales" });
      } else {
        console.log(startdate);
        console.log("i got the filtered sales");
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

// Start the server
app.listen(3050, () => {
  console.log("Server is running on port 3050");
});
