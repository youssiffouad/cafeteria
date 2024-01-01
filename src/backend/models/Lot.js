const db = require("./db");
const Product = require("./Product");
const updateProductInStockValue = require("../businessLogic/updateProdInStock");
const Finance = require("./financial");
const Vendor = require("./Vendor");
const Component = require("../models/component");
// const e = require("cors");
// const { getVendorIdFromLotId } = require("./Vendor");

class Lot {
  static getCost(lotid) {
    return new Promise((res, rej) => {
      db.get(`SELECT cost FROM Lots WHERE id = ${lotid}`, (err, row) => {
        if (err) {
          console.error("failed to get cost", err);
          rej(err);
        } else {
          const totalCost = row ? row.cost : null;
          res(totalCost);
        }
      });
    });
  }

  static getRemainingPayment(lotid) {
    return new Promise((res, rej) => {
      db.get(
        `SELECT remaining_payment FROM Lots WHERE id = ${lotid}`,
        (err, row) => {
          if (err) {
            console.error("failed to get remaining payment", err);
            rej(err);
          } else {
            const remaining_payment = row ? row.remaining_payment : null;
            res(remaining_payment);
          }
        }
      );
    });
  }
  //function to get component id of certain lot
  static getComponentId(lotId) {
    return new Promise((res, rej) => {
      const sql = `select component_id from Lots where id = ?`;

      db.get(sql, [lotId], function (err, row) {
        if (err) {
          rej(err);
        } else {
          res(row.component_id);
        }
      });
    });
  }

  //function to get product id of certain lot
  static getProductId(lotid) {
    return new Promise((res, rej) => {
      db.get(`SELECT product_id FROM Lots WHERE id = ${lotid}`, (err, row) => {
        if (err) {
          console.error("failed to get product id of certain lot", err);
          rej(err);
        } else {
          const product_id = row ? row.product_id : null;
          console.log(` iam at getprod id`);
          console.log(
            "suuccessfully got the product id of the lot ",
            product_id
          );
          res(product_id);
        }
      });
    });
  }

  static getQuantity(lotid) {
    return new Promise((res, rej) => {
      db.get(`SELECT quantity FROM Lots WHERE id = ${lotid}`, (err, row) => {
        if (err) {
          console.error("failed to get quantity of certain lot", err);
          rej(err);
        } else {
          const quantity = row ? row.quantity : null;
          res(quantity);
        }
      });
    });
  }

  //function to insert a new ordinary lot
  static insertOrdinaryLot = (
    productID,
    quantity,
    cost,
    paidAmount,
    received_date,
    payment_method
  ) => {
    return new Promise((res, rej) => {
      const rem = cost - paidAmount;
      const sql = `INSERT INTO Lots (product_id, quantity, cost,remaining_payment, received_date,payment_method,is_component) VALUES (?, ?, ?, ?,?,?,?)`;
      const params = [
        productID,
        quantity,
        cost,
        rem,
        received_date,
        payment_method,
        0,
      ];
      db.run(sql, params, function (err) {
        if (err) {
          rej("failed to insert hte ordinary order", err);
        } else {
          console.log("successfully added the new lot", this.lastID);
          res(this.lastID);
        }
      });
    });
  };

  //function to insert a component Lot
  static insertComponentLot(
    quantity,
    cost,
    paidAmount,
    received_date,
    payment_method,
    component_id
  ) {
    return new Promise((res, rej) => {
      const rem = cost - paidAmount;
      const sql = `INSERT INTO Lots (quantity, cost,remaining_payment, received_date,payment_method,component_id,is_component) VALUES (?, ?, ?,?,?,?,?)`;
      const params = [
        quantity,
        cost,
        rem,
        received_date,
        payment_method,
        component_id,
        1,
      ];
      db.run(sql, params, function (err) {
        if (err) {
          console.log("error inserting component Lot", err);
          rej(err);
        } else {
          console.log("successfully added new componentLot", this.lastID);
          res(this.lastID);
        }
      });
    });
  }
  //function to delete lot
  static async deleteLot(lotid, callback) {
    try {
      const productID = await Lot.getProductId(lotid);
      const componentID = await Lot.getComponentId(lotid);
      const quantity = await Lot.getQuantity(lotid);
      const rem = await Lot.getRemainingPayment(lotid);
      const cost = await Lot.getCost(lotid);
      const paidAmount = cost - rem;
      if (productID !== null || productID !== undefined) {
        await Product.updateProductQuantity(productID, -quantity);
        await updateProductInStockValue(productID, -quantity);
        await Vendor.changeVendoerOwedMoney(0, lotid, -rem);
      } else if (componentID !== null || componentID !== undefined) {
        //step2- decrease component number of units(get no of units )
        const noOfUnits = await Component.getNoOfUnits(component_id);
        const newNumberOfUnits = noOfUnits - quantity;
        Component.updateComponentNumberOfUnits(componentID, newNumberOfUnits);
        await Vendor.changeVendoerOwedMoney(1, lotid, -rem);
      }

      await Finance.changeCashVlaue(paidAmount);

      await Lot.removeLotRow(lotid);

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
  // Function to view all lots with product names, category names, and component names
  static viewLots(callback) {
    db.all(
      `SELECT l.id, l.cost, l.remaining_payment, l.received_date, l.quantity, l.payment_method,
            p.name AS prodname, c.name AS catname, comp.name AS compname,
            CASE WHEN l.is_component THEN 'Component' ELSE 'Product' END AS lot_type
       FROM Lots l
      left JOIN Products p ON p.id = l.product_id
       left JOIN Categories c ON c.id = p.category_id
       left JOIN Components comp ON comp.id = l.component_id`,
      (err, rows) => {
        if (err) {
          callback(err);
        } else {
          callback(null, rows);
        }
      }
    );
  }
  //function to update remaining payment of certain lot
  static SetRemainingPayment = async (lotid, newValue) => {
    return new Promise((res, rej) => {
      const sql = `UPDATE Lots SET remaining_payment = ? WHERE id = ?`;
      const params = [lotid, newValue];
      db.run(sql, params, function (err) {
        if (err) rej(err);
        else res();
      });
    });
  };

  //function to install payment of certain lot(update remaining payment)

  static async installLot(lotId, callback) {
    try {
      const remainingPayment = await Lot.getRemainingPayment(lotId);

      const installQuan = remainingPayment;
      const updatedRemainingPayment = remainingPayment - installQuan;
      await Lot.SetRemainingPayment(lotId, updatedRemainingPayment);

      //change product Vendor owed money if the lot is product

      const vendorId = await Vendor.getVendorIdFromLotId(0, lotId);

      const owedMoney = await Vendor.getOwedMoneyOfvendor(vendorId);

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
      Vendor.changeVendoerOwedMoney();
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

  // Function to delete lot row
  static removeLotRow(lotid) {
    return new Promise((res, rej) => {
      db.run(`DELETE FROM Lots WHERE id = ${lotid} `, (err) => {
        if (err) {
          console.error("failed to remove lot row", err);
          rej(err);
        } else {
          console.log(`removed lot row successfully`);
          res();
        }
      });
    });
  }
  // Add other lot-related methods here
}

module.exports = Lot;
