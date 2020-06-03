const productModel = require('../Models/product-model')
const mongoose = require('mongoose')

const productApi = app => {

    //add product
    app.post('/addproduct', async(req, res) => {
        const { product_name, category_id } = req.body
        try {
            let product = new productModel({ _id: mongoose.Types.ObjectId(), product_name, category_id })
            await product.save()
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler', error })
        }
    })


    //products by category
    app.post('/producstbycategory', async(req, res) => {
        const { category_id } = req.body
        try {
            let products = await productModel.find({ category_id })
            res.json({ message: 'success', data: products })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    })

    //product by id
    app.post('/productbyid', async(req, res) => {
        const { product_id } = req.body
        try {
            let product = await productModel.find({ _id: product_id }).lean()
            res.json({ message: 'success', data: product[0] })
        } catch (error) {
            res.json({ message: 'error from handler', error })
        }
    })


}


module.exports = productApi