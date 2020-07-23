const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const router = express.Router();



app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));





//Html Pages

app.use('/',require('./route/html'));

// Departments

app.use('/departments',require('./route/department'));

//Categories

app.use('/categories',require('./route/category'));

//Attributes

app.use('/attributes',require('./route/attribute'));

// Products

app.use('/products',require('./route/product'));

//Customers

app.use('/customers',require('./route/customer'));

// Orders

app.use('/orders',require('./route/order'));

//Shoppingg Cart

app.use('/shoppingcart',require('./route/shoppingcart'));

//Tax

app.use('/tax',require('./route/tax'));

//Shipping

app.use('/shipping/regions',require('./route/shipping'));




//Error Handling

app.use((req,res,next)=>{

    var error = new Error("Could Not Find What You Expected! ")
    
    error.status = 404;
    
    next(error);

});

app.use((error,req,res,next)=>{

    // console.log(error);
    
    error.status = (error.status || 500 );
   
    res.json({
   
        message:error.message
   
    });

});



let port = 8000;

app.listen(port,()=>{

    console.log('Successfully connected to port ',port);
    
});