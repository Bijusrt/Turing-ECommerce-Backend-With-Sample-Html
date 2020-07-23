const knex = require('../model/database');

exports.shippingRegions = (req,res)=>{

    knex('shipping_region').then(result=>{

        res.send(result);

    })

};

exports.getByShippingRegionId = (req,res)=>{

    knex('shipping').where({

        'shipping_region_id' : req.params.shipping_region_id

    }).then(result=>{

        res.send(result);

    })

};