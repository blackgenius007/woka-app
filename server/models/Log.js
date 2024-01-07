const mongoose= require('mongoose');


//create Schema
const LogSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  itemName : { type: String, required: true },
  description : { type: String, required: true },
  price : { type: Number, required: true },
  quantity : { type: Number, required: true },
  modified_quantity:{ type:Number, required:true},
  transit_stock: { type: Number, required: true },
  tagName: String,
  supplier : String,
  taxable : Boolean,
  itemDest: String,
  dirSymbol: String,
  email:String

},{timestamps:true});

 

// Create model from the schema
const Log = mongoose.model("Log", LogSchema);


// Export model
module.exports = Log;