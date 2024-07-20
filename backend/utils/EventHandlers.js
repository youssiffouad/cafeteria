const Product = require("../models/Product");
const User = require("../models/users");
const Notification = require("../models/Notification");

function registerEventHandlers() {
  // Register listeners for the 'productAdded' event
  Product.on("productAdded", User.notifyUser);
  Product.on("productAdded", Notification.createNotification);

  // Register listeners for other events here
  // Product.on('anotherEvent', AnotherListener);
}

module.exports = { registerEventHandlers };
