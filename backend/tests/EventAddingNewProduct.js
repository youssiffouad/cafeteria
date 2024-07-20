const Product = require("../models/Product");
const { registerEventHandlers } = require("../utils/EventHandlers");
registerEventHandlers();
Product.addProduct("test", 1, 1, 500, 400, 0, null);
