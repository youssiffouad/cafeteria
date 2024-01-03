const Component = require("../models/component");

// Add a new component
exports.addComponent = async (req, res) => {
  try {
    console.log("here is the request body sent to the server", req.body);
    const { name, numberOfUnits, pricePerUnit } = req.body;

    const result = await Component.addComponent(
      name,
      numberOfUnits,
      pricePerUnit
    );
    console.log("here is the result", result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to add component" });
  }
};

// View all components
exports.viewComponents = async (req, res) => {
  try {
    const components = await Component.viewComponents();
    res.status(200).json(components);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to view components" });
  }
};

// Update component name
exports.updateComponentName = async (req, res) => {
  try {
    const { id, newName } = req.body;
    const result = await Component.updateComponentName(id, newName);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error: failed to update component name",
    });
  }
};

// Update component number of units
exports.updateComponentNumberOfUnits = async (req, res) => {
  try {
    const { id, newNumberOfUnits } = req.body;
    const result = await Component.updateComponentNumberOfUnits(
      id,
      newNumberOfUnits
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Internal server error: failed to update component number of units",
    });
  }
};

// Update component price per unit
exports.updateComponentPricePerUnit = async (req, res) => {
  try {
    const { id, newPricePerUnit } = req.body;
    const result = await Component.updateComponentPricePerUnit(
      id,
      newPricePerUnit
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error: failed to update component price per unit",
    });
  }
};

// Delete component by ID
exports.deleteComponent = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Component.deleteComponent(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error: failed to delete component" });
  }
};
