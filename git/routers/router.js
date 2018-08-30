
const express=require('express');
const router=express.Router();
module.exports=router;

//POST
router.post('/add',(req,res)=>{
res.send('post working');

});

//GET
router.get('/:id',(req,res)=>{
res.send('get working');
});

//UPDATE
router.patch('/:id',(req,res)=>{
    res.send('update working');
});

//DELETE
router.delete('/:id',(req,res)=>{
res.send('delete working');
});