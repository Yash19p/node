const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menu');



//POST route to add a person
router.post('/', async (req,res)=>{
    try {
        const data = req.body;//assuming the request body contains the person data

        //create a new person document using the mongooes model

        const newMenu = new MenuItem(data);

        //save the new person to the document

        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);

        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'});
        
    }
})

//GET method to get data

router.get('/', async (req, res)=>{
    try {
        const data = await MenuItem.find()
        console.log('data fetched');
        res.status(200).json(data);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
        
    }

})

router.get('/:tasteType', async (req, res)=>{
    try {
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){

            const response = await MenuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);


        }else{
            res.status(404).json({error:'Invalid work type'});

        }
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
        
    }
})

module.exports = router;


