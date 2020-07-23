const knex = require('../model/database');

exports.generateCartId = async(req,res)=>{

    function generateUniqueCartID(){

        forUniqueId = "ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxz1234567890#$&";

        var allUnique = forUniqueId.split(""); 

        var cart_id = "";

        for (var i = 0 ; i < 12 ; i ++ ) {

            cart_id += ( allUnique [ Math.floor ( Math.random() * (allUnique.length - 1))])
        }

        return cart_id;

    };

    var unique_cart_id = generateUniqueCartID();

    await knex('shopping_cart').where('cart_id',unique_cart_id).then(result=>{

        for(var i of result){

            if(i.cart_id == unique_cart_id){

                unique_cart_id = generateUniqueCartID();

            }

        }

    });

    res.status(200).json({

        'cart_id' : unique_cart_id
    });

};

exports.addToCart = (req,res)=>{

    var product = {

        'cart_id' : req.body.cart_id,

        'product_id' : req.body.product_id,

        'attributes' : req.body.attributes,

        ' added_on' : new Date(),

        'quantity' : 0
    };

    knex('shopping_cart').insert(product).then(result=>{

        res.send('Added To Cart!');
    })
    
};

exports.getCart = (req,res)=>{

    knex('shopping_cart').where({

        'cart_id' : req.params.cart_id

    }).then(result=>{

        knex('shopping_cart').then(result=>{

            res.send(result);

        })

    })

}; 

exports.updateCart = (req,res)=>{

    knex('shopping_cart').update({

        'quantity' : req.body.quantity

    }).where({

        'item_id' : req.params.item_id,

        'cart_id' : req.params.cart_id

    }).then(result=>{

        knex('shopping_cart').then(result=>{

            res.send(result);
            
        })

    })

};

exports.deleteCart = (req,res)=>{

    knex('shopping_cart').where({

        'cart_id' : req.params.cart_id

    }).del().then(result=>{

        res.send('Deleted Cart!');

    })

};  

exports.moveToCart = (req,res)=>{

    knex('save_cart').where({

        'item_id' : req.params.item_id,

        'cart_id' : req.params.cart_id

    }).then(result=>{

        knex('shopping_cart').insert(result).then(result=>{

            knex('save_cart').where({

                'item_id' : req.params.item_id,
        
                'cart_id' : req.params.cart_id
        
            }).del().then(result=>{

                res.send('Moved To Cart!');

            });

        })

    })

};

exports.totalAmount = async (req,res)=>{

    var total_amount = 0;

    await knex('shopping_cart').where({

        'cart_id' : req.params.cart_id

    }).then(async result=>{

        if(result.length != 0){

            for(var i of result){

                await knex('product').where({

                    'product_id' : i.product_id

                }).then(async data=>{

                    price = data[0].price * i.quantity;

                    total_amount += await price;

                    knex('shopping_cart').update({

                        'total_amount' : total_amount
                
                    }).where({
                
                        'cart_id' : req.params.cart_id
                
                    }).then(result=>{});

                })
            }
        }
    })

    res.json({
        
        'total_amount' : total_amount
        
    });
    
};

exports.saveForLater = (req,res)=>{

    knex('shopping_cart').where({

        'item_id' : req.params.item_id,

        'cart_id' : req.params.cart_id

    }).then(result=>{

        knex('save_cart').insert(result).then(result=>{

            knex('shopping_cart').where({

                'item_id' : req.params.item_id,
        
                'cart_id' : req.params.cart_id
        
            }).del().then(result=>{

                res.send('Saved For Later!');
                
            });

        })

    })

};

exports.getSavedProducts = (req,res)=>{

    knex('save_cart').where({

        'cart_id' : req.params.cart_id
    }).then(result=>{

        res.send(result);

    })

};

exports.removeProduct =(req,res)=>{

    knex('shopping_cart').where({

        'cart_id' : req.params.cart_id,

        'item_id' : req.params.item_id

    }).del().then(result=>{

        res.send('Deleted Product successfully!');

    })
    
};