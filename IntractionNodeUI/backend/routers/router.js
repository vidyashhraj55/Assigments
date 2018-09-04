
const express = require('express');
const router = express.Router();
const UseModel = require('../module/module')
module.exports = router;

//POST
router.post('/add', (req, res) => {
    // res.send('post working');
    if (req.body.data) {
        const user = UseModel({
            name: req.body.data.name,
            age: req.body.data.age
        });
        user.save((err, result) => {
            if (err) {
                res.status(500).send({
                    succes: false,
                    message: err.message
                });
            }

            else {
                res.status(200).json({
                    success: true,
                    message: 'User Data Added Succefully',
                    result
                });
            }
        });

    } else {
        res.status(400).json({
            message: 'Please Enter any Data!'
        });
    }
});

router.get('/:name', (req, res) => {
    UseModel.findOne({name: req.params.name}, (err, result) => {
        if (err || result === null) {
            res.status(404).send({sucees: false, message: "User Not Found"})
        } else {
            res.status(200).send({sucess: true, message: "Succesfully fetched user details", result});
        }
    })
})

router.patch('/:name', (req, res) => {    
    UseModel.findOneAndUpdate({name: req.params.name}, req.body.data,{new: true}, (err, doc) => {
        if (err) {
            res.status(500).send({success: false, message: "Unable to update data"})            
        } else {
            res.status(200).send({success: true ,message: "Succesfully updated the data", result: doc});
        }
 })
}); 

router.delete('/:name', (req, res) =>{
    UseModel.remove({name: req.params.name}, (err, doc) => {
        if (err) {
            res.status(500).send({success: false, message: "Unable to delete the user"});
        } else {
            res.status(200).send({success: true, message: "Succesfully deleted the user", result: doc});
        }
    })
});