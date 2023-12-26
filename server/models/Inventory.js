const mongoose = require('mongoose');



//create Schema
const InventorySchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  
  description: {
    type: String,
    required: true
  },
tagName: {
    type: String,
    required: true
  },
   price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  
  suppliers  : {
    type: String,
    required: true
  },
  suppliers_email : {
    type: String,
    required: true
  },
  suppliers_number : {
    type: String,
    required: true
  },
  status : {
    type: String,
    required: true
  },
  itemDest : {
    type: Boolean,
    required: false
  },
  SKU : {
    type: String,
    required: false
  },
  connectCode : {
    type: String,
    required: false
  },
  imagePath:{
    type:String,
    required:false
},


},{timestamps:true});

 

// Create model from the schema
const Inventory = mongoose.model("Inventory", InventorySchema);


// Export model
module.exports = Inventory;