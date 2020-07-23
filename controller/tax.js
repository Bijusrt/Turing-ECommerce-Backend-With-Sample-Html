const knex = require('../model/database');

exports.getAllTax = (req,res)=>{

    knex('tax').then(result=>{

        res.send(result);

    })

};

exports.getTaxById = (req,res)=>{

    knex('tax').where({

        'tax_id' : req.params.tax_id

    }).then(result=>{

        res.send(result);

    })
    
};