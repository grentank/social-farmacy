const { where } = require('sequelize')
const {Product} = require('../db/models')

class ProductService{

    static async getAll(){
        const allProduct = await Product.findAll()
        const result = allProduct.map((el)=>el.get({plain:true}))
        return result
    }

    static async getOne(id){
        const oneProduct =  await Product.findByPk(id)
        const result = oneProduct.get({plain:true})
        return result
    }

    static async createProduct({name,description,img,price,stock}){
        const product = await Product.create({name,description,img,price,stock})
        const result = product.get({plain:true})
        return result
    }

    static async deleteProduct(id){
        const product = await Product.findByPk(id)
        product.destroy()
        return id
    }

    static async updateProduct(id,data){
        const product = await Product.update(data,{where:{id}})
        if(product){
            return product
        }else{
            return false
        }
    }
}

module.exports = ProductService