const express = require('express');
const router = express.Router();
const {
  
   createInventoryPool,
   getAllInventory,
   getTotalInventory,
   getOneInventory,
   updateInventory,
   deleteInventory,
   getTotalCost,
   outGoingStock ,
   incomingStock,
   getStockBalance,
   quantityPerItem,
   connectItem,
   createInventoryPoolPoint,
   getAllInventoryEachPoint  

   
  } = require('../controller/inventory');
  
 

  router
  .route('/:id')
  .get(getOneInventory);
 
  router
  .route('/all-inventory/:email')
  .get(getAllInventory )

  router
  .route('/inventory-point/:email/:tagName')
  .get(getAllInventoryEachPoint)

   
  router
  .route('/create')
  .post(createInventoryPool)
 

  router
  .route('/per-item/:email/:projectname')
  .get(quantityPerItem  )
 
  router
  .route('/count/:email/:projectname')
  .get(getTotalInventory )

  router
  .route('/cost/:email/:projectname')           
  .get(getTotalCost )

  router
  .route('/outstock/:email/:id/:num/:quantity/:order')
  .get( outGoingStock)

  router
  .route('/instock/:email/:id/:num/:quantity')
  .get( incomingStock)

  router
  .route('/stockbalance/:email/:projectname')
  .get(getStockBalance)

  router
  .route('/update/:id')
  .post(updateInventory )

  router
  .route('/connect')
  .post(connectItem )

  router
  .route('/delete/:id')
  .delete(deleteInventory )

  
  
  
 
module.exports = router