const knex = require('../model/database');

exports.createOrder = async(req,res)=>{

    var orderDict = {

        shipping_id : req.body.shipping_id,

        tax_id : req.body.tax_id,

        created_on : new Date(),

        auth_code : req.headers.authorization

    }

    await knex('customer').where({

        "email" : req.decodedToken

    }).then(async result=>{

        if(result.length!=0){

            orderDict['customer_id'] = result[0].customer_id;

            await knex('shopping_cart').where({

                'cart_id' : req.body.cart_id

            }).then(async result=>{

                orderDict['total_amount'] = result[0].total_amount;

                await knex('orders').insert(orderDict).then(async result=>{

                    await knex('orders').where({

                        'customer_id' : orderDict.customer_id

                    }).then(result=>{

                            res.send(result);

                    })

                })

            })

        }

    });

};

exports.getOrderById = (req,res)=>{console.log(2);

    knex('orders').where({

        'order_id' : req.params.order_id

    }).then(result=>{

        res.send(result);

    })

};

exports.getOrderByCustomerToken = async(req,res)=>{console.log(1);

    await knex('customer').where({

        "email" : req.decodedToken

    }).then(async result=>{console.log(result);

        if(result.length!=0){

            customer_id = result[0].customer_id;
            
            knex('orders').where({

                'customer_id' : customer_id

            }).then(result=>{

                res.send(result);

            })

        }

    })

};

exports.orderInfo = async(req,res)=>{

    await knex('orders').where({

        'order_id' : req.params.order_id

    }).then(async result=>{

        orderDict = {

            order_id : result.order_id,

            total_amount : result[0].total_amount,

            created_on : result[0].created_on,

            shipped_on : result[0].shipped_on,

            status : result[0].status

        }

        await knex('customer').where({

            'email' : req.decodedToken

        }).then(result=>{

            orderDict['name'] = result[0].name;

            res.send(orderDict);

        })

    })

};