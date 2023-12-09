const path = require('path');
const ErrorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middleware/async');
const Inventory = require('../models/Inventory.js');
const Log = require('../models/Log.js');
const User = require('../models/User');


// @desc    Create pool
//@routes   /api/v1/pool/
//@acess    Private
exports.createInventoryPool =  asyncHandler(async (req, res, next) => {
  const{id,projectname}=req.params
  const{itemName,description,price,quantity,itemStatus}=req.body
  console.log(id,projectname,itemName,description,quantity,price,itemStatus)

  User.findOne({_id: id}, function(err, pool){
        
    if (err) {
      console.log('err', err);
      res.status(500).send(err);
    } else {
      const newInventory = new Inventory ({
        
        name:pool.name,
        businessName:pool.businessName,
        businessSector:pool.businessSector,
        businessLocation:pool.businessLocation,
        businessMobile:pool.businessMobile,
        email:pool.email,
        itemName:req.body.itemName,
      description:description,
      price:price,
      quantity:quantity,
      projectName:projectname,
      // suppliers_email:req.body.suppliers_email,          
      itemStatus:itemStatus,

      });
      console.log(`pool before save ${newInventory}`);
      newInventory.save(function (err, pool) {
					if (err) {
						console.log(err);
					} else {
						console.log('add pool success');
						res.send(pool);
					}
				});
      console.log(newInventory)     
    }
})
})

 // @desc Get all inventory
// @routes Get/api/v1/inventory
// @acess Public
exports.getAllInventory = asyncHandler(async (req, res, next) => {
    try {
      const email = req.params.email;
      // const projectName = req.params.projectname
      console.log("from inventory-frontend =>", email);
  
      Inventory.find({ email: email }, function (err, inventory) {
        if (err) {
          res.status(500);
          res.send(err);
        } else {
          res.json(inventory);
        }
      });
    } catch (error) {
      // Handle the error appropriately, log it, and send an error response
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
             
// @desc Get Total Inventory
//@routes Get/api/v1/inventory/total
//@acess  Public
exports.getTotalInventory =  asyncHandler(async (req, res, next) => {
email = req.params.email
const projectName=req.params.projectName
  
  Inventory.collection.countDocuments({email:email, projectName:projectName}, (err, inventory)=>{
  if(err){
  res.status(500);
  res.send(err);
  } else {
  res.json(inventory);
  }
  });
  });

// @desc Get one Inventory
//@routes   Get/api/inventory/1:id
//@acess    Private
exports.getOneInventory =  asyncHandler(async (req, res, next) => {

  var _id = req.params.id;

  Inventory.findOne({_id: _id}, function(err, inventory){

    if(err){
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
    console.log(req.params.id)
    let inventory = await Inventory.findById(req.params.id);
  
    if (!inventory) {
      return next(
        new ErrorResponse(`No inventory with the id of ${req.params.id}`),
        404
      );
    }
  
    course = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: inventory
    });
  });
  

  // @desc Delete inventory
// @route DELETE /api/v1/inventory/:id
// @access Private
exports.deleteInventory = asyncHandler(async (req, res, next) => {
 console.log("delete id =>",req.params.id)
  inventory=Inventory.findById(req.params.id)
  .then(inventory=>inventory.remove()).then(()=>res.json({deleted:true,inventory}))
  .catch(err=>res.json(err))
});

// @desc Multiply Qty and Price
//@routes    Get/api/v1/inventory/cst
//@acess    Private
exports.getTotalCost =  asyncHandler(async (req, res, next) =>{
const email=req.params.email
const projectName=req.params.projectname
  
  Inventory.aggregate([
    {$match:{'email':email, 'projectName':projectName}},
    { 
        $group: { 
            _id: null,              
            total: {$sum: {$multiply: ["$price", "$quantity"]}}
        }
    }        
]).exec((err, results) => { if (err) throw err; res.json(results); })       
});                              


// @desc outstock Inventory
//@routes   Get/add_product/:id/:num/:quantity/:order
//@acess    Private
exports.outGoingStock =  asyncHandler(async (req, res, next) =>{

  
  const id = req.params.id;
  const  quantity = req.params.quantity;
	const order = req.params.order;
  const num_mod = req.params.num;
  var dirSymbol =' &#8594;'
 
	const modified_count = parseInt(num_mod) - parseInt(quantity);
  console.log('num_mod----', num_mod);
  console.log(req.params.itemDest);

	Inventory.findByIdAndUpdate(
		id,
		{ quantity: parseInt(num_mod) },
		{ new: true },
		function (err, inventory) {
			if (err) {
				console.log('err', err);
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
          dirSymbol:dirSymbol
        
				});
				console.info(newLog.get('itemDest'));
				newLog.save(function (err, Log) {
					if (err) {
						console.log(err);
					} else {
						console.log('add log success');
						res.send(inventory);
					}
				});
			}
		}
	);
})


// @desc instock Inventory
//@routes   Get/add_product/:id/:num/:quantity
//@acess    Private
exports.incomingStock =  asyncHandler(async (req, res, next) =>{

  var id = req.params.id;
	var quantity = req.params.quantity;
	var email = req.params.email;
  var dirSymbol =' &#8592;'

	// console.log('id----', id);
	var num_mod = req.params.num;
	var modified_count = parseInt(quantity)-parseInt(num_mod) ;
	console.log('num_mod----', num_mod);
	Inventory.findByIdAndUpdate(
		id,
		{ quantity: parseInt(num_mod) },       
		{ new: true },
		function (err, inventory) {
			if (err) {
				console.log('err', err);
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
          dirSymbol : dirSymbol
				});

				newLog.save(function (err, Log) {
					if (err) {
						console.log(err);
					} else {
						console.log('add log success');
						res.send(inventory);
					}
				});
			}
		}
	);
})

// @desc Get all Inventory < 0
//@routes Get/api/v1/inventory/ofs 
//@acess  Public
exports.getStockBalance =  asyncHandler(async (req, res, next) => {
const projectName = req.params.projectname
const email = req.params.email
console.log('from front end =>',projectName,email)
  Inventory.find( {email:email,projectName:projectName,quantity :{$lt:1}}, function(err, inventory){
  
      if(err){
        res.status(500);          
        res.send(err);
      } else {
        res.json(inventory);
      }
    });
  });

// @desc Add Complain score
//@routes Get//:id/:num/:quantity
//@acess Private
exports.quantityPerItem =  asyncHandler(async (req, res, next) =>{
  const email=req.params.email
  const projectName=req.params.projectname
Inventory.aggregate([
{$match:{'email':email,'projectName': projectName}},

 {  "$group": {
     "_id": "$itemName",
     "count": { "$sum": 1 }
 } },
 { "$sort": { "_id": 1 } },
 {  "$group": {
     "_id": null,
     "counts": {
         "$push": {
             "itemName": "$_id",
             "number": "$count"
         }
     }
 } },
 
]).exec((err, results) => 
{ 
 if (err) throw err; res.json(results); })
})



// @desc update order status
//@acess Private
exports.connectItem = asyncHandler(async (req, res, next) => {
  const { connectCode,id} = req.body;
console.log(req.body)
  console.log('connect codes=>',connectCode,id);

  Inventory.findOneAndUpdate(
    { _id: id },
    {
      $set: { connectCode:connectCode },
    }
  ).exec((err, pool) => {
    if (err) {
      console.log(err);
    } else {
      console.log('connect success');

      res.send(pool);
    }
  });
});


