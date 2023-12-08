const mongoose = require('mongoose');



//create Schema
const InventorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
businessName: {
    type: String,
    required: true
  },
  businessSector: {
    type: String,
    required: true
  },
  businessLocation: {
    type: String,
    required: true
  },
  businessMobile: {
    type: Number,
    required: true
  },
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
  projectName: {
    type: String,
    required: true
  },
   price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  
  // suppliers_email : {
  //   type: String,
  //   required: true
  // },
  itemStatus : {
    type: String,
    required: true
  },
  itemDest : {
    type: Boolean,
    required: false
  },
  itemCode : {
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