const router = require('express').Router();
//import todo model
const todoItemsModel = require('../models/todoitems');


//lets create our first route -- we will add ToDo Items to our database
router.post('/api/item',async (req,res)=>{
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        //save this item in database
        //console.log("1");
        const saveItem = await newItem.save()
        //console.log("2");
        res.status(200).json('Item Added Successfully');
    }catch(err){
        console.log("Error");
        res.json(err);
    }
})

//lets create second route --get data from database
router.get('/api/items',async (req,res)=>{
    try{
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems) 
        //return all items in database in json format
    }catch(err){
        res.json(err);
    }
})

//lets update items
router.put('/api/item/:id',async (req,res)=>{
    try{
        //find the item by its id and update it
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id,{$set: req.body});
        res.status(200).json('item Updated');

    }catch(err){
        res.json(err);
    }
})

//lets delete items from database
router.delete('/api/item/:id', async(req,res)=>{
    try{
        //find the item by its id and delete it
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted');
    }catch(err){
        res.json(err);
    }
})

//export router
module.exports = router;

