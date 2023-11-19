const db = require("./db");

class Lot {
  static getCost(lotid, callback) {
    db.get(`SELECT cost FROM Lots WHERE id = ${lotid}`, (err, row) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const totalCost = row ? row.cost : null;
        callback(null, totalCost);
      }
    });
  }

  static getRemainingPayment(lotid, callback) {
    db.get(
      `SELECT remaining_payment FROM Lots WHERE id = ${lotid}`,
      (err, row) => {
        if (err) {
          console.error(err);
          callback(err, null);
        } else {
          const remaining_payment = row ? row.remaining_payment : null;
          callback(null, remaining_payment);
        }
      }
    );
  }

  static getProductId(lotid, callback) {
    db.get(`SELECT product_id FROM Lots WHERE id = ${lotid}`, (err, row) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const product_id = row ? row.product_id : null;
        console.log(` iam at getprod id`);
        console.log(product_id);
        callback(null, product_id);
      }
    });
  }

  static getQuantity(lotid, callback) {
    db.get(`SELECT quantity FROM Lots WHERE id = ${lotid}`, (err, row) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        const quantity = row ? row.quantity : null;
        callback(null, quantity);
      }
    });
  }
  // Function to add a new lot
  static async addLot(
    productID,
    quantity,
    cost,
    paidAmount,
    received_date,
    payment_method,
    callback
  ) {
    try {
      console.log(productID);
      if (!productID) {
        const error = new Error("productID is sent null");
        console.error(error);
        callback(error);
        return;
      }

      let lotID; // Declare lotID variable
      const rem = cost - paidAmount;
      await new Promise((resolve, reject) => {
        db.serialize(() => {
          db.run("PRAGMA foreign_keys = ON;");

          console.log(`cost is ${cost}`);
          console.log(`paidAmount is ${paidAmount}`);
          db.run(
            `INSERT INTO Lots (product_id, quantity, cost,remaining_payment, received_date,payment_method) VALUES (?, ?, ?, ?,?,?)`,
            [productID, quantity, cost, rem, received_date, payment_method],
            function (err) {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                lotID = this.lastID; // Assign value to lotID
                console.log("lot added");
                resolve();
              }
            }
          );
        });
      });

      await updateProductQuantity(productID, quantity);
      await updateProductInStockValue(productID, quantity);
      await changeCashVlaue(-paidAmount);
      await changeVendoerOwedMoney(lotID, rem); // Use lotID and rem variables

      console.log("Quantity and productInStockValue updated");
      callback(null, {
        message: "Lot added successfully",
        lot_id: lotID,
      });
    } catch (error) {
      callback(error);
    }
  }
  //function to delete lot
  static async deleteLot(lotid, callback) {
    try {
      let productID, quantity, rem, cost;

      await new Promise((resolve, reject) => {
        db.run("PRAGMA foreign_keys = ON;");

        this.getProductId(lotid, (err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            productID = res;
            resolve();
          }
        });
      });

      await new Promise((resolve, reject) => {
        this.getQuantity(lotid, (err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            quantity = res;
            resolve();
          }
        });
      });

      await new Promise((resolve, reject) => {
        this.getRemainingPayment(lotid, (err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            rem = res;
            resolve();
          }
        });
      });

      await new Promise((resolve, reject) => {
        this.getCost(lotid, (err, res) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            cost = res;
            resolve();
          }
        });
      });

      const paidAmount = cost - rem;
      await updateProductQuantity(productID, -quantity);
      await updateProductInStockValue(productID, -quantity);
      await changeCashVlaue(paidAmount);
      await changeVendoerOwedMoney(lotid, -rem);

      await new Promise((resolve, reject) => {
        deleteLotRow(lotid, (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        });
      });

      console.log("Quantity and productInStockValue updated");
      callback(null, {
        message: "Lot deleted successfully",
      });
    } catch (error) {
      console.error(error);
      callback(error);
    }
  }
  //function to view all lots in certain interval with product name
  static viewFilterDateLots = (startdate, enddate, callback) => {
    db.all(
      `select l.id,l.cost,l.remaining_payment, l.received_date,l.quantity,l.payment_method ,p.name as prodname from Lots l join Products p on p.id=l.product_id
      where l.received_date between ? and ? `,
      [startdate, enddate],
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  };
  //function to view all lots with product names with category_name
  static viewLots(callback) {
    db.all(
      `select l.id,l.cost,l.remaining_payment, l.received_date,l.quantity,l.payment_method ,p.name as prodname,c.name as catname
       from Lots l join Products p join Categories c on p.id=l.product_id and c.id=p.category_id`,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }

  //function to install payment of certain lot(update remaining payment)

  static async installLot(lotId, callback) {
    try {
      const row = await new Promise((resolve, reject) => {
        db.get(
          "SELECT remaining_payment FROM Lots WHERE id = ?",
          [lotId],
          (err, row) => {
            if (err) {
              console.error("Failed to fetch lot details:", err);
              reject(err);
            } else {
              resolve(row);
            }
          }
        );
      });

      if (!row) {
        throw new Error(`Lot with ID ${lotId} not found`);
      }

      const remainingPayment = row.remaining_payment;
      console.log(remainingPayment);
      const installQuan = remainingPayment;
      const updatedRemainingPayment = remainingPayment - installQuan;
      console.log(updatedRemainingPayment);

      await new Promise((resolve, reject) => {
        db.run(
          "UPDATE Lots SET remaining_payment = ? WHERE id = ?",
          [updatedRemainingPayment, lotId],
          (err) => {
            if (err) {
              console.error("Failed to update remaining_payment:", err);
              reject(err);
            } else {
              console.log("Payment successfully installed");
              resolve();
            }
          }
        );
      });

      const vendorRow = await new Promise((resolve, reject) => {
        db.get(
          "SELECT p.vendor_id FROM Products p join Lots l on l.product_id=p.id    WHERE l.id = ?",
          [lotId],
          (err, row) => {
            if (err) {
              console.error("Failed to fetch lot vendor ID:", err);
              reject(err);
            } else {
              resolve(row);
            }
          }
        );
      });

      const vendorId = vendorRow.vendor_id;

      const owedMoneyRow = await new Promise((resolve, reject) => {
        db.get(
          "SELECT owedmoney FROM Vendors WHERE id = ?",
          [vendorId],
          (err, row) => {
            if (err) {
              console.error("Failed to fetch vendor owed money:", err);
              reject(err);
            } else {
              resolve(row);
            }
          }
        );
      });

      const owedMoney = owedMoneyRow.owedmoney;

      await new Promise((resolve, reject) => {
        db.run(
          "UPDATE Vendors SET owedmoney = ? WHERE id = ?",
          [owedMoney - installQuan, vendorId],
          (err) => {
            if (err) {
              console.error("Failed to update vendor owed money:", err);
              reject(err);
            } else {
              console.log("Vendor owed money successfully updated");
              resolve();
            }
          }
        );
      });
      await new Promise((resolve, reject) => {
        db.run(
          `UPDATE Financial SET debt = debt - ${installQuan} WHERE id =${1} `,
          (err) => {
            if (err) {
              console.error("Failed to update vendor owed money:", err);
              reject(err);
            } else {
              console.log("Vendor owed money successfully updated");
              resolve();
            }
          }
        );
      });
      await new Promise((resolve, reject) => {
        db.run(
          `UPDATE Financial SET cash = cash - ${installQuan} WHERE id =${1} `,
          (err) => {
            if (err) {
              console.error("Failed to update vendor owed money:", err);
              reject(err);
            } else {
              console.log("Vendor owed money successfully updated");
              resolve();
            }
          }
        );
      });

      callback(null, {
        message: "Lot installed successfully",
        lot_id: lotId,
      });
    } catch (error) {
      console.error(error);
      callback(error);
      throw error;
    }
  }
  // Add other lot-related methods here
}

module.exports = Lot;

// Function to update product quantity in the Products table
async function updateProductQuantity(productID, quantity) {
  try {
    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE Products SET quantity = quantity + ? WHERE id = ?`,
        [quantity, productID],
        function (err) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to update productsInStockValue in the Financial table
async function updateProductInStockValue(productID, quantity) {
  try {
    const row = await new Promise((resolve, reject) => {
      db.get(
        `SELECT selling_price FROM Products WHERE id = ?`,
        [productID],
        (err, row) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });

    const sellingPrice = row.selling_price;
    const addedValue = sellingPrice * quantity;
    console.log(
      `addededededeededeededededeghjjhjhjdhgfghhjhjd value is ${addedValue}`
    );

    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE Financial SET productsInStockValue = productsInStockValue + ?`,
        [addedValue],
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
  }
}

//function to change cash value
const changeCashVlaue = async (amount) => {
  try {
    await new Promise((resolve, reject) => {
      db.run(
        `
    UPDATE Financial
    SET cash = cash + ${amount}
    WHERE id = 1;
  `,
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(null);
          }
        }
      );
    });
  } catch (err) {
    console.error(err);
  }
};

//function to return vendorid of lot
function getVendorIdFromLotId(lotId) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT vendor_id FROM Products JOIN Lots ON Products.id = Lots.product_id WHERE Lots.id = ?",
      [lotId],
      (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(row);
          console.log(row.vendor_id);
          resolve(row.vendor_id);
        }
      }
    );
  });
}

//fn to change vendor owedmoney
const changeVendoerOwedMoney = async (lotid, remainingPayment) => {
  try {
    const vendorid = await getVendorIdFromLotId(lotid);
    console.log(`the vendorid is ${vendorid}`);

    db.run(
      `UPDATE Vendors SET owedmoney =owedmoney+ ${remainingPayment} WHERE id = ${vendorid}`,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`the remaining payment equals ${remainingPayment}`);
          console.log(`the vendorid is ${vendorid}`);
          updatemyDebt(remainingPayment, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};
//fn to update debt
const updatemyDebt = (newdebt, callback) => {
  db.run(`update financial set debt =debt +${newdebt}`, (err) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log(`my debt updated successfully`);
      callback(null);
    }
  });
};

// Function to delete order row
function deleteLotRow(lotid, callback) {
  db.run(`DELETE FROM Lots WHERE id = ${lotid} `, (err) => {
    if (err) {
      console.error(err);
      callback(err);
    } else {
      console.log(`Deleted successfully`);
      callback(null);
    }
  });
}
