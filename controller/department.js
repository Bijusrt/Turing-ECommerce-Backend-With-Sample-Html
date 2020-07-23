const knex = require('../model/database');

exports.allDepartment = (req,res)=>{

    knex('department').then(result=>{

        res.status(200).json(result);

    })

};

exports.department_id = (req,res)=>{

    knex('department').then(result=>{

        for(var i of result){

            if(i.department_id == req.query.department_id){

                res.status(200).json(i);

            }

        }

    })

};