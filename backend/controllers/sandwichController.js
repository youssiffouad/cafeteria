const { ERROR } = require("sqlite3");
const Sandwich = require("../models/sandwich");

// Add a new sandwich
exports.addSandwich = async (req, res) => {
  try {
    const { name, componentsList, sellingPrice } = req.body;
    const result = await Sandwich.addSandwich(
      name,
      componentsList,
      sellingPrice
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("error in the controller of adding new sanadwich", error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to add sandwich" });
  }
};

// View all sandwiches
exports.viewSandwiches = async (req, res) => {
  try {
    const sandwiches = await Sandwich.viewSandwiches();
    res.status(200).json(sandwiches);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to view sandwiches" });
  }
};

// Update sandwich name
exports.updateSandwichName = async (req, res) => {
  try {
    const { id, newName } = req.body;
    const result = await Sandwich.updateSandwichName(id, newName);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to update sandwich name" });
  }
};

// Update sandwich cost
exports.updateSandwichCost = async (req, res) => {
  try {
    const { id, newCost } = req.body;
    const result = await Sandwich.updateSandwichCost(id, newCost);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to update sandwich cost" });
  }
};

// Update sandwich selling price
exports.updateSandwichSellingPrice = async (req, res) => {
  try {
    const { id, newSellingPrice } = req.body;
    const result = await Sandwich.updateSandwichSellingPrice(
      id,
      newSellingPrice
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error: failed to update sandwich selling price",
    });
  }
};

// Delete sandwich by ID
exports.deleteSandwich = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("her eis the sand id i got", id);

    const result = await Sandwich.deleteSandwich(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to delete sandwich" });
  }
};

// Get sandwich by ID
exports.getSandwichByID = async (req, res) => {
  try {
    const { id } = req.body;
    const sandwich = await Sandwich.getSandwichByID(id);
    res.status(200).json(sandwich);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to get sandwich by ID" });
  }
};
