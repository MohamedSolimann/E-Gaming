const categoryModel = require('../Models/category-model')
const mongoose = require('mongoose')
const cors = require('cors')
const { corsOptions } = require('../Config/app-config')

const categoryApi = app => {

    //add category
    app.post('/addcategory', async(req, res) => {
        const { category_name } = req.body
        try {
            let category = new categoryModel({ _id: mongoose.Types.ObjectId(), category_name })
            await category.save()
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler', error })
        }
    })

    //get all categories
    app.get('/allcategories', cors(corsOptions), async(req, res) => {
        try {
            let categories = await categoryModel.find({})
            res.json({ message: 'success', data: categories })
        } catch (error) {
            res.json({ message: 'error from handler', error })
        }
    })






}


module.exports = categoryApi