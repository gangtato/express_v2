const Product = require("./model");
const path = require('path');
const fs = require('fs');

const { QueryTypes } = require('sequelize');


const index = async(req, res) => {
    const { search } = req.query;
    let data ='';
    if(search){
       data = await sequelize.query(
            'SELECT * FROM users WHERE name LIKE :search_name',
            {
              replacements: { search_name: `%${search}%` },
              type: QueryTypes.SELECT
            }
       );    
    }else{
       data = await Product.findAll();
    }
    res.send(data);
}

const view = async(req, res) => {
    try{
        let data = await Product.findAll({
            where:{
                id: req.params.id
            }
        })
        res.send(data);
    }catch(err){
        res.send(err);
    }
    
}


const store = async(req, res) => {
    const { name, price, stock, status, description } = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, "../../uploads", image.originalname);
        fs.renameSync(image.path, target);
        try{
           await Product.sync();
           const result = Product.create({name, price, stock, status, description, image_url:`http://localhost:8080/public/${image.originalname}`});
           res.send(result)
        }catch(err){
           res.send(err);
        }
    } 
}

const update = async(req, res) => {
    const { name, price, stock, status, description } = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, "../../uploads", image.originalname);
        fs.renameSync(image.path, target);
        try{
           await Product.sync();
           const result = Product.update({name, price, stock, status, description},{
               where:{
                   id: req.params.id
               }
           })
           res.send(result)
        }catch(err){
           res.send(err);
        }
    } 
}

const destroy = async (req, res) => {
    try{
        let data = await User.destroy({
            where: {
              id: req.params.id
            }
        });
        res.send(data);
    }catch(err){
        res.send(err);
    }
    
}


module.exports = {
    index,
    view,
    store,
    update,
    destroy
}