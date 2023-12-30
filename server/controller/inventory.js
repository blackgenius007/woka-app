const path = require("path");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");
const Inventory = require("../models/Inventory.js");
const GenerateCode = require("../utils/generateCode.js");
const Log = require("../models/Log.js");
const User = require("../models/User");

 // @desc    Create pool
// @routes   /api/v1/pool/
// @acess    Private
exports.createInventoryPool = asyncHandler(async (req, res, next) => {
  const {
    email,
    tagName,
    itemName,
    description,
    price,
    category,
    status,
    stock,
    supplier,
    suppliers_number,
    suppliers_email,
  } = req.body;
  console.log(
    email,
    tagName,
    itemName,
    description,
    price,
    category,
    status,
    stock,
    supplier
  );

  try {
    const pool = await User.findOne({ ownerEmail: email }).exec();

    if (!pool) {
      console.log('User not found' )
      return res.status(404).json({ success: false, message: 'User not found' });
      
    }

    // Generate unique SKU number for new item
    const d = new Date();
    const year = d.getFullYear();
    const SKU_number = `${itemName.slice(0, 3)}-${year.toString().slice(-2)}-${GenerateCode(4)}`;

    const newInventory = new Inventory({
      tagName: tagName,
      itemName: itemName,
      email: email,
      description: description,
      price: price,
      stock: stock,
      category: category,
      supplier: supplier,
      suppliers_email: suppliers_email,
      suppliers_number: suppliers_number,
      status: status,
      SKU: SKU_number,
    });

    console.log(`pool before save ${newInventory}`);
    await newInventory.save();

    console.log("add pool success");
    res.status(201).json({ success: true, data: newInventory });
  } catch (error) {
    console.error("Error creating inventory pool:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Create pool
//@routes   /api/v1/pool/
//@acess    Private
exports.createInventoryPoolPoint = asyncHandler(async (req, res, next) => {
  const { email, tagName } = req.params;
  const { itemName, description, price, quantity, itemStatus } = req.body;
  console.log(
    id,
    projectname,
    itemName,
    description,
    quantity,
    price,
    itemStatus
  );

  User.findOne({ ownerEmail: email }, function (err, pool) {
    if (err) {
      console.log("err", err);
      res.status(500).send(err);
    } else {
      const newInventory = new Inventory({
        name: pool.name,
        businessName: pool.businessName,
        businessSector: pool.businessSector,
        businessLocation: pool.businessLocation,
        businessMobile: pool.businessMobile,
        email: pool.email,
        itemName: req.body.itemName,
        description: description,
        price: price,
        quantity: quantity,
        tagName: tagName,
        // suppliers_email:req.body.suppliers_email,
        itemStatus: itemStatus,
      });
      console.log(`pool before save ${newInventory}`);
      newInventory.save(function (err, pool) {
        if (err) {
          console.log(err);
        } else {
          console.log("add pool success");
          res.send(pool);
        }
      });
      console.log(newInventory);
    }
  });
});

// @desc Get all inventory
// @routes Get/api/v1/inventory
// @acess Public

exports.getAllInventory = asyncHandler(async (req, res, next) => {
  try {
    const { userEmail } = req.params;
    console.log("inventory detail from front+>", userEmail);

    const inventory = await Inventory.find(
      { $or: [{ email: userEmail }, { ownerEmail: userEmail }] },
      null,
      { sort: { name: 1 } }
    );

    res.json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


// @desc Get all inventory
// @routes Get/api/v1/inventory
// @acess Public
exports.getAllInventoryEachPoint = asyncHandler(async (req, res, next) => {
  try {
    const { email, tagName } = req.params;

    console.log("Request Params =>", email, tagName);

    // Find all documents where email and tagName match
    const inventory = await Inventory.find({
      email: email,
      tagName: tagName,
    }).exec();

    console.log("Found Inventory:", inventory);

    res.json(inventory);
  } catch (error) {
    console.error("Error in getAllInventoryEachPoint:", error);
    res.status(500).send("Internal Server Error");
  }
});





// exports.getAllInventoryEachPoint = asyncHandler(async (req, res, next) => {
//   try {
//     const { email, tagName } = req.params;

//     console.log("Request Params =>", email, tagName);

//     // Use $elemMatch to filter based on the tagName within collectionPointDetails
//     const inventory = await Inventory.find({
//       email: email,
//       "collectionPointDetails.tagName": tagName,
//     }).exec();

//     console.log("Found Inventory:", inventory);

//     res.json(inventory);
//   } catch (error) {
//     console.error("Error in getAllInventoryEachPoint:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// @desc Get Total Inventory
//@routes Get/api/v1/inventory/total
//@acess  Public
exports.getTotalInventory = asyncHandler(async (req, res, next) => {
  email = req.params.email;
  const projectName = req.params.projectName;

  Inventory.collection.countDocuments(
    { email: email, projectName: projectName },
    (err, inventory) => {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(inventory);
      }
    }
  );
});

// @desc Get one Inventory
//@routes   Get/api/inventory/1:id
//@acess    Private
exports.getOneInventory = asyncHandler(async (req, res, next) => {
  var _id = req.params.id;

  Inventory.findOne({ _id: _id }, function (err, inventory) {
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.json(inventory);
    }
  });
});

// @desc Update inventory
// @route PUT /api/v1/inventory/update/
// @access Private

exports.updateInventory = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  let inventory = await Inventory.findById(req.params.id);

  if (!inventory) {
    return next(
      new ErrorResponse(`No inventory with the id of ${req.params.id}`),
      404
    );
  }

  course = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: inventory,
  });
});

// @desc Delete inventory
// @route DELETE /api/v1/inventory/:id
// @access Private
exports.deleteInventory = asyncHandler(async (req, res, next) => {
  console.log("delete id =>", req.params.id);
  inventory = Inventory.findById(req.params.id)
    .then((inventory) => inventory.remove())
    .then(() => res.json({ deleted: true, inventory }))
    .catch((err) => res.json(err));
});

// @desc Multiply Qty and Price
//@routes    Get/api/v1/inventory/cst
//@acess    Private
exports.getTotalCost = asyncHandler(async (req, res, next) => {
  const email = req.params.email;
  const projectName = req.params.projectname;

  Inventory.aggregate([
    { $match: { email: email, projectName: projectName } },
    {
      $group: {
        _id: null,
        total: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]).exec((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// @desc outstock Inventory
//@routes   Get/add_product/:id/:num/:quantity/:order
//@acess    Private
exports.outGoingStock = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const quantity = req.params.quantity;
  const order = req.params.order;
  const num_mod = req.params.num;
  var dirSymbol = " &#8594;";

  const modified_count = parseInt(num_mod) - parseInt(quantity);
  console.log("num_mod----", num_mod);
  console.log(req.params.itemDest);

  Inventory.findByIdAndUpdate(
    id,
    { quantity: parseInt(num_mod) },
    { new: true },
    function (err, inventory) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log(inventory.name);

        const newLog = new Log({
          itemName: inventory.itemName,
          description: inventory.description,
          price: parseInt(inventory.price),
          quantity: parseInt(inventory.quantity),
          modified_quantity: parseInt(modified_count),
          email: req.params.email,
          itemDest: order,
          dirSymbol: dirSymbol,
        });
        console.info(newLog.get("itemDest"));
        newLog.save(function (err, Log) {
          if (err) {
            console.log(err);
          } else {
            console.log("add log success");
            res.send(inventory);
          }
        });
      }
    }
  );
});

// @desc instock Inventory
//@routes Get/add_product/:id/:num/:quantity
//@acess Private
exports.incomingStock = asyncHandler(async (req, res, next) => {
  try {
    console.log('incomingstock values:', req.params);

    // Destructure parameters
    const { id, quantity, email, nums } = req.params;
    const dirSymbol = " &#8592;";

    
    console.log("num_mod----", nums);

    // Update inventory item
    const inventory = await Inventory.findByIdAndUpdate(
      id,
      { quantity: parseInt(nums) },
      { new: true }
    );
 

    // Create a new log entry
    const newLog = new Log({
      itemName: inventory.itemName,
      description: inventory.description,
      price: parseInt(inventory.price),
      quantity: parseInt(inventory.quantity),
      modified_quantity:parseInt(nums) ,
      email: email,
      dirSymbol: dirSymbol,
    });

 
    // Save the log entry
    const log = await newLog.save();

    console.log("add log success");
    res.send(inventory);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message || "Internal Server Error");
  }
});

// @desc Get all Inventory < 0
//@routes Get/api/v1/inventory/ofs
//@acess  Public
exports.getStockBalance = asyncHandler(async (req, res, next) => {
  const projectName = req.params.projectname;
  const email = req.params.email;
  console.log("from front end =>", projectName, email);
  Inventory.find(
    { email: email, projectName: projectName, quantity: { $lt: 1 } },
    function (err, inventory) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        res.json(inventory);
      }
    }
  );
});

// @desc Add Complain score
//@routes Get//:id/:num/:quantity
//@acess Private
exports.quantityPerItem = asyncHandler(async (req, res, next) => {
  const email = req.params.email;
  const projectName = req.params.projectname;
  Inventory.aggregate([
    { $match: { email: email, projectName: projectName } },

    {
      $group: {
        _id: "$itemName",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $group: {
        _id: null,
        counts: {
          $push: {
            itemName: "$_id",
            number: "$count",
          },
        },
      },
    },
  ]).exec((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// @desc update order status
//@acess Private
exports.connectItem = asyncHandler(async (req, res, next) => {
  const { connectCode, id } = req.body;
  console.log(req.body);
  console.log("connect codes=>", connectCode, id);

  Inventory.findOneAndUpdate(
    { _id: id },
    {
      $set: { connectCode: connectCode },
    }
  ).exec((err, pool) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connect success");

      res.send(pool);
    }
  });
});
