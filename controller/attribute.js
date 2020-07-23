const knex = require('../model/database');

exports.allAttribute = (req,res)=>{

    knex('attribute ').then(result=>{

        res.status(200).json(result)

    })

};

exports.attribute_id = (req,res)=>{

    knex('attribute').where('attribute_id',req.params.attribute_id).then(result=>{

        res.status(200).json(result)

    })

};

exports.values = (req,res)=>{

    knex('attribute_value').where('attribute_id ',req.params.attribute_id).then(result=>{

        for(var i of result){            

            delete i.attribute_id;

        }

        res.status(200).json(result)

    })

};

exports.inProduct = async (req,res)=>{

    var responseList = [];

    await knex('product_attribute').where('product_id',req.params.product_id).then(async result=>{

        for(var i of result){

            var responseDict = {};

            responseDict['attribute_value_id'] = i.attribute_value_id;

            await knex('attribute_value').where('attribute_value_id',i.attribute_value_id).then(async result=>{

                responseDict['attribute_value'] = result[0].value;

                await knex('attribute').where('attribute_id',result[0].attribute_id).then(async result=>{

                    responseDict.attribute_name = result[0].name;
                    
                })
                
            })

            responseList.push(responseDict);

        }

    })

};