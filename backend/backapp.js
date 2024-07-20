const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const lotRoutes = require("./routes/lotRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const custRoutes = require("./routes/customerRoutes");
const rankRoutes = require("./routes/RankRoutes");
const financialRoutes = require("./routes/financeRouutes");
const userRoutes = require("./routes/userRoutes");
const sandwichroutes = require("./routes/sandwichRoutes");
const componentsroutes = require("./routes/componentRoute");
const NotificationRoutes = require("./routes/NotificationRoutes");
const { registerEventHandlers } = require("./utils/EventHandlers");
app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/lots", lotRoutes);
app.use("/vendors", vendorRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/customers", custRoutes);
app.use("/ranks", rankRoutes);
app.use("/finance", financialRoutes);
app.use("/users", userRoutes);
app.use("/sandwiches", sandwichroutes);
app.use("/components", componentsroutes);
app.use("/notificactions", NotificationRoutes);

//register all event handlers
registerEventHandlers();

const port = 3060;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
