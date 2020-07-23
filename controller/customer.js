const knex = require('../model/database');

const jwt = require('jsonwebtoken');

exports.updateUser = (req,res)=>{

    var updateDetails = {};

    updateDetails['day_phone'] = req.body.day_phone;

    updateDetails['eve_phone'] = req.body.eve_phone;

    updateDetails['mob_phone'] = req.body.mob_phone;

    knex('customer').where('email',req.decodedToken).update(updateDetails).then(result=>{

        knex('customer').where('email',req.decodedToken).then(result =>{

            delete result[0].password;

            res.status(200).json(result[0]);
        
        });
        
    })

};

exports.getUser = (req,res)=>{

    knex('customer').where('email',req.decodedToken).then(result=>{

        res.status(200).json(result);

    })

};

exports.newUser = async (req,res)=>{

    var userDetails = {};

    userDetails['email'] = req.body.email;

    userDetails['name'] = req.body.name;

    userDetails['password'] = req.body.password;

    nameFlag = false;

    emailFlag = false;

    await knex('customer').then(result =>{

        for(var i of result){

            if(i.name == userDetails.name){

                nameFlag = true;

            }

            if(i.email == userDetails.email){

                emailFlag = true;

            }

        }
        
    })

    if(nameFlag){

        res.status(400).json('User Already Exists!');

    }else if(emailFlag){
        
        res.status(400).json('Email already in use!');

    }else{

        knex('customer').insert(userDetails).then(result => {

            knex('customer').where('name',userDetails.name).then(result =>{

                delete result[0].password;
                
                res.status(200).json(result[0]);
            
            });
    
        });

    }

};

exports.userLogin = (req,res)=>{

    knex('customer').where('email',req.body.email).then(result=>{

        if(result.length == 0){

            res.status(400).json('Invalid Email!');

        }else{

            if(result[0].password == req.body.password){

                let token = jwt.sign(req.body.email,'tokenvalidator')

                res.status(200).json({

                    'Token' : token,

                    'Login' : 'Success'

                });

            }else{
                
                res.status(400).json('Incorrect Password!');

            }

        }

    })

};

exports.facebook = (req,res)=>{

    res.status(200).json('This Feature Will Be Enabled Soon!');

};

exports.address = (req,res)=>{

    var updateAddress= {};

    updateAddress['address_1'] = req.body.address_1;

    updateAddress['address_2'] = req.body.address_2;

    updateAddress['region'] = req.body.region;

    updateAddress['postal_code'] = req.body.postal_code;

    updateAddress['country'] = req.body.country;

    updateAddress['shipping_region_id'] = req.body.shipping_region_id;

    updateAddress['city'] = req.body.city;

    knex('customer').where('email',req.decodedToken).update(updateAddress).then(result=>{

        knex('customer').where('email',req.decodedToken).then(result =>{

            delete result[0].password;

            res.status(200).json(result[0]);
        
        });
        
    })

};

exports.creditCard = (req,res)=>{

    var updateCreditCard = {};

    updateCreditCard['credit_card'] = req.body.credit_card;

    knex('customer').where('email',req.decodedToken).update(updateCreditCard).then(result=>{

        knex('customer').where('email',req.decodedToken).then(result =>{

            delete result[0].password;

            var creditCard = '';

            for(var i = 0;i<result[0].credit_card.length;i++){

                if(i >= result[0].credit_card.length-4){

                    creditCard += result[0]['credit_card'][i];

                }else{

                    creditCard += 'X';
                }

            }

            result[0].credit_card = creditCard;

            res.status(200).json(result[0]);
        
        });
        
    })
}