const knex = require('../model/database');

exports.allProduct = async (req,res)=>{

    const page =req.query.page||'1'

    const limit=req.query.limit||'10'

    const description_length=req.query.description_length||'200'

    var list=[]

    await knex('product').then(result=>{

        list=result
    
    })

    listseperatedintopages=[]

    count=0

    listofpage=[]

    for (var i of list){

        delete i['image_2']

        delete i['image']
        
        delete i['display']

        let productDescription=''

        var count1 = 0

        for (var j of i['description']){
            
            productDescription+=j

            count1+=1

            if (count1==description_length){
                
                productDescription+="..."

                break

            }

        }

        i['description']=productDescription

        count+=1

        listofpage.push(i)

        if (count==limit){

            listseperatedintopages.push(listofpage)

            count=0

            listofpage=[]

        }

    }

    res.status(200).send(listseperatedintopages[page-1])

};

exports.productSearch = async (req,res)=>{

    const page =req.query.page||'1';

    const limit=req.query.limit||'20';

    const description_length=req.query.description_length||'200';

    const all_words = req.query.all_words||'on';

    const search_query = req.query.query_string;

    var result_list = [];

    await knex('product').then(result=>{

        for(var i of result){

            if(i['name'].includes(search_query)){

                result_list.push(i);

            }

        }

    })

    listseperatedintopages=[]

    count=0

    listofpage=[]

    for (var i of result_list){

        delete i['image_2']

        delete i['image']
        
        delete i['display']

        let productDescription=''

        var count1 = 0

        for (var j of i['description']){
            
            productDescription+=j

            count1+=1

            if (count1==description_length){
                
                productDescription+="..."

                break

            }

        }

        i['description']=productDescription

        count+=1

        listofpage.push(i)

        if (count==limit){

            listseperatedintopages.push(listofpage)

            count=0

            listofpage=[]

        }

    }

    res.status(200).send(listseperatedintopages[page-1])

};

exports.product_id = (req,res)=>{

    const product_id=req.params.product_id

    knex('product').where('product_id',product_id).then(result=>{

        res.send(result)
    
    })

};

exports.inCategory = async (req,res)=>{

    const page =req.query.page||'1';

    const limit=req.query.limit||'10';

    const description_length=req.query.description_length||'200';

    const category_id = req.params.category_id;

    var product_list = [];

    await knex('product_category').where('category_id',category_id).then(async result=>{

        for(var i of result){

            await knex('product').where('product_id',i['product_id']).then(result=>{

                product_list.push(result[0]);

            })

        }

    })

    listseperatedintopages=[]

    count=0

    listofpage=[]

    for (var i of product_list){

        delete i['image_2']

        delete i['image']
        
        delete i['display']

        let productDescription=''

        var count1 = 0

        for (var j of i['description']){
            
            productDescription+=j

            count1+=1

            if (count1==description_length){
                
                productDescription+="..."

                break

            }

        }

        i['description']=productDescription

        count+=1

        listofpage.push(i)

        if (count==limit){

            listseperatedintopages.push(listofpage)

            count=0

            listofpage=[]

        }

    }

    res.status(200).json({

        'count' : product_list.length,

        'rows' : listseperatedintopages[page-1]

    })

};

exports.inDepartment = async (req,res)=>{

    const page =req.query.page||'1';

    const limit=req.query.limit||'10';

    const description_length=req.query.description_length||'200';

    const department_id = req.params.department_id;

    var product_list = [];

    await knex('category').where('department_id',department_id).then(async result=>{

        for(var j of result){

            await knex('product_category').where('category_id',j.category_id).then(async result=>{

                for(var i of result){
        
                    await knex('product').where('product_id',i['product_id']).then(result=>{
        
                        product_list.push(result[0]);
        
                    })
        
                }
        
            })
        }
    })

    listseperatedintopages=[]

    count=0

    listofpage=[]

    for (var i of product_list){

        delete i['image_2']

        delete i['image']
        
        delete i['display']

        let productDescription=''

        var count1 = 0

        for (var j of i['description']){
            
            productDescription+=j

            count1+=1

            if (count1==description_length){
                
                productDescription+="..."

                break

            }

        }

        i['description']=productDescription

        count+=1

        listofpage.push(i)

        if (count==limit){

            listseperatedintopages.push(listofpage)

            count=0

            listofpage=[]

        }

    }

    res.status(200).json({

        'count' : product_list.length,

        'rows' : listseperatedintopages[page-1]

    })

};

exports.details = async (req,res)=>{

    var product_id = req.params.product_id;

    await knex('product').where('product_id',product_id).then(result=>{

        delete result[0].display;

        delete result[0].thumbnail;

        res.status(200).json(result)

    })

};

exports.locations = async(req,res)=>{

    var location_dict = {};

    await knex('product_category').where('product_id',req.params.product_id).then(async result=>{

        location_dict.category_id = result[0].category_id;

        await knex('category').where('category_id',result[0].category_id).then(async result=>{

            location_dict.category_name = result[0].name;

            location_dict.department_id = result[0].department_id;

            await knex('department').where('department_id',result[0].department_id).then(result=>{

                location_dict.department_name = result[0].name;

            })

        })

    })

    res.status(200).json(location_dict);

};

exports.reviews = async(req,res)=>{

    await knex('review').where('product_id',req.params.product_id).then(async result=>{

        if(result.length != 0){
            
            await knex('product').where('product_id',req.params.product_id).then(output=>{

                var name = output[0].name;

                for(var i of result){

                    i.name = name;
    
                }
    
                res.status(200).json(result);

            })

        }else{

            res.status(200).json('No reviews yet!!!');
        }

    })

};

exports.post_reviews = async(req,res)=>{

    var review_dict = {

        "product_id" : req.body.product_id,
        
        "review" : req.body.review,

        "rating" : req.body.rating,

        "created_on" : new Date()

    };

    knex('customer').where('email',req.decodedToken).then(result=>{

        review_dict['customer_id'] = result[0].customer_id;

        knex('review').insert(review_dict).then(result=>{

            res.status(200).json('success');
    
        })

    })

};