const express = require('express');
const router =express.Router();
const item = require('../controllers/item.controller');

console.log("hi2");
//get
router.get('/all',item.getItemAll);
router.get('/for',item.getItemFor);
router.post('/add',item.addItem);
router.post('/update',item.AddStockItem);
router.post('/sell',item.SellStockItem);
//post
//update
//delete
 
module.exports=router;