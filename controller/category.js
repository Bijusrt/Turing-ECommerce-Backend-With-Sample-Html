const knex = require('../model/database');

exports.allCategory = (req,res)=>{

    knex('category').then(result=>{

        res.status(200).json({
        
            count:result.length,
        
            row:result
        
        })
    
    })

};

exports.category_id = (req,res)=>{
    
    knex('category').then(result=>{
    
        for (var i of result){
    
            if (req.query.id==i.category_id){
    
                res.status(200).json(i)
    
            }
   
        }

    })

};

exports.inProduct =  (req,res)=>{
    
    knex('product_category').where('product_id' ,req.query.product_id).then(result=>{
    
        knex('category').where('category_id',result[0].category_id).then(result=>{
    
            delete result[0].description 
    
            res.send(result)
    
        })

    })

};

exports.inDepartment = (req,res)=>{
       
    knex('category').where('department_id',req.query.department_id).then(result=>{
    
        res.status(200).send(result)
    
    })

};