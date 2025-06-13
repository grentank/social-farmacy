const ProductService = require("../services/ProductService")


class ProductController{

    static async getAll(req,res){
        try {
            const result = await ProductService.getAll()
            res.status(200).json(result)
        } catch (error) {
          res.status(400).send("Не удолось получить Товары")  
        }
    }

    static async getOne(req,res){
        const {id} = req.params
        try {
            const product = await ProductService.getOne(id)
            res.status(200).json(product)
        } catch (error) {
            res.status(401).send("Не удолось получить Товар")            
        }
    }

    static async createProduct(req,res) {
        try {
            const {name,description,img,price,stock} = req.body
            const product = await ProductService.createProduct({name,description,img,price,stock})
            res.status(200).send('Товар добавлен')
        } catch (error) {
           res.status(401).send("Не удолось создать товар")     
        }
    }

    static async deleteProduct(req,res){
        try {
            const {id} = req.params
            const result = await ProductService.deleteProduct(id)
            res.status(200).send('Товар успешно удален')
        } catch (error) {
           res.status(401).send("Не удолось удалить товар")            
        }
    }

    static async updateProduct(req,res){
        try {
            const {id} = req.params
            const {name,description,img,price,stock} = req.body
            const updateProj = await  ProductService.updateProduct(id,{name,description,img,price,stock})
            res.status(200).json(updateProj)
        } catch (error) {
         res.status(401).send("Не удолось оновить  товар")    
        }
    }
}

module.exports = ProductController