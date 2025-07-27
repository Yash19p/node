const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//POST route to add a person
router.post('/', async(req, res)=>{
    try {
       const data = req.body; //assuming the request body contains the person data
       
       //create a new person document using the mongooes model

       const newPerson = new Person(data);

       //save the new person to the document

       const response = await newPerson.save();
       console.log('data saved');
       res.status(200).json(response);
    }
    catch (error) {
       console.log(error);
       res.status(500).json({error:'Internal server Error'});
       
    }
})

//GET method to get data
router.get('/',async (req, res)=>{
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'});
        
    }
})

//Get method using paramerter
router.get('/:workType', async (req, res)=>{
    try {
    const workType = req.params.workType;// Extract the work type from the URL parameter
    if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){

        const response = await Person.find({work: workType});
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

router.put('/:id', async (req,res)=>{
    try {

        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatePersonData,{
            new: true,//return updated document
            runValidator: true,// run mongoose validation

        })
        if (!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
        
    }
})

router.delete('/:id', async (req,res)=>{
    try {
    const personId = req.params.id;

    //assuming you have a person model
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
        return res.status(404).json({error: 'Person not found'});
    }
    console.log('data delete');
    res.status(200).json({message:'person deleted successfully'});
}catch(error){
    console.log(error);
    res.status(500).json({error:'Internal server error'});
}
})

module.exports = router;