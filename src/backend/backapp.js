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

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
console.log(productRoutes);
app.use("/lots", lotRoutes);
app.use("/vendors", vendorRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/customers", custRoutes);
app.use("/ranks", rankRoutes);

const port = 3060;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
