
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product= require('../module/module');
const user = require('../module/model1');
const multer=require('multer');
const jwt = require('jsonwebtoken')
module.exports = router;
// const bodyParser = require("body-parser");

// const multer = require('multer');
var app = express();
var bodyParser = require('body-parser');
// app.use(express.bodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// var sendRes = function(ref, obj, status, code) {
//     if(status == 1) {
//         ref.send(obj);
//     } else {
//         ref.status(code).send(obj);
//     }
// }

//const upload=multer({dest: '/uploads'});

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const fileFilter = (req, file, cb) =>{
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
    else
    cb(null, false);
};

const upload = multer({storage: storage, limit: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
});


router.get("/", (req, res, next) => {
    Product.find()
      .select("name email branch tech productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              email: doc.email,
              branch: doc.branch,
              tech: doc.tech,
              productImage: doc.productImage,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:8081/product/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
      .select('name email branch tech productImage')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:8081/product'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  

router.post('/add', upload.single('productImage'), (req, res, next) => {
    console.log(req);
   const product = new Product({
       _id: new mongoose.Types.ObjectId(),
       name:req.body.name,
       email: req.body.email,
       branch:req.body.branch,
       tech:req.body.tech,
       productImage: req.file.path
   });
   product.save().then(result => {
       console.log(result);
       res.status(201).json({
           message: 'created Product',
           createdProduct: {
            name:result.name,
            email: result.email,
            branch:result.branch,
            tech:result.tech,
            productImage:result.productImage,
               _id: result._id,
               request: {
                   type: 'POST',
                   url: 'http://localhost:8081/product/'+result._id
               }
           }
       });
   })
   .catch(err => console.log(err));
  
});


router.patch("/update/:id", (req, res, next) => {
    const id = req.params.id;
   
    const updateOps = {};
    // const input ={
    //     name:result.name,
    //         email: result.email,
    //         branch:result.branch,
    //         tech:result.tech,
    //         productImage:result.productImage
    // }
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8081/product/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.delete("/delete/:id", (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:8081/product',
                body: { name: 'String', email: 'String',branch:'String',tech:'String',productImage:'String' }
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }
router.post('/register', (req, res) => {
    let userData = req.body
    let userSchema = new user(userData)
    userSchema.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  })
  
  router.post('/login', (req, res) => {
    let userData = req.body
    user.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    })
  })
