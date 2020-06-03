const cartModel = require('../Models/cart-model')
const tempProduct = require('../Models/tempCart-model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const userModel = require('../Models/user-model')
const { secret } = require('../Config/app-config')

const cartApi = app => {

    //Create cart
    app.post('/createCart', async(req, res) => {
        const { product_id } = req.body
        try {
            let token = req.cookies['authorization']
            if (token) {
                let verfied = jwt.verify(token, secret)
                if (verfied) {
                    let user_id = verfied.id
                    let cart_id = mongoose.Types.ObjectId()
                    let cart = new cartModel({
                        _id: cart_id,
                        product_ids: product_id,
                        user_id
                    })
                    let user = await userModel.update({ _id: user_id }, { cart_id: cart_id })
                    await cart.save()
                    res.json({ message: 'success', data: cart_id })
                } else {
                    res.json({ message: 'not authorizied' })
                }
            } else {
                let cart = new tempProduct({
                    _id: mongoose.Types.ObjectId(),
                    product_ids: product_id
                })
                await cart.save()
                res.json({ message: 'success' })
            }
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    })

    //update product qty
    app.post('/updateproductqty', async(req, res) => {
        const { cart_id, product_id, qty } = req.body
        try {
            let cart = await cartModel.update({ _id: cart_id, "product_ids.product_id": product_id }, { $set: { "product_ids.$.qty": parseInt(qty) } })
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });
    //update temp product qty
    app.post('/updatetempproductqty', async(req, res) => {
        const { product_id, qty } = req.body
        try {
            let tempProducts = req.cookies['tempProductsIds']
            for (let productObject of tempProducts) {
                for (let key in productObject) {
                    if (key === "product_id" && productObject[key] === product_id) {
                        productObject.qty = +qty
                        break
                    }
                }
            }
            res.cookie('tempProductsIds', tempProducts)
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });
    //Add item to user cart
    app.post('/addItemToCart', async(req, res) => {
        let { cart_id, product_id } = req.body
        try {
            let products_ids = await cartModel.find({ _id: cart_id }).lean()
            let product = await cartModel.update({ _id: cart_id }, { $push: { product_ids: { product_id, qty: 1 } } })
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }

    });

    //remove item from user cart
    app.post('/removeitemfromcart', async(req, res) => {
        const { cart_id, product_id } = req.body
        try {
            let cart = await cartModel.update({ _id: cart_id, }, { $pull: { product_ids: { product_id } } }).lean()
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    })

    //remove all temp product for this product id from cookies
    app.post('/removealltempproductid', async(req, res) => {
        const { product_id } = req.body
        try {
            let tempProductIds = req.cookies['tempProductsIds']
            let productObjectIndex = tempProductIds.findIndex((val) => val.product_id === product_id)
            tempProductIds.splice(productObjectIndex, 1)
            if (tempProductIds.length) {
                res.cookie('tempProductsIds', tempProductIds)
            } else {
                res.clearCookie('tempProductsIds')
            }
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });

    //remove all 

    //Get all products in user cart
    app.post('/productsinusercart', async(req, res) => {
        const { cart_id } = req.body
        try {
            let cart = await cartModel.find({ _id: cart_id }).lean()
            let product_ids = cart[0].product_ids
            res.json({ message: 'success', data: product_ids })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    })

    //Get cart id
    app.post('/getcartid', async(req, res) => {
        const { user_id } = req.body
        try {
            let user = await userModel.find({ _id: user_id }).lean()
            let cart_id = user[0].cart_id
            if (cart_id) {
                res.json({ message: 'success', data: cart_id })
            } else {
                res.json({ message: 'there is not cart yet' })
            }
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });


    //add tempProduct object to tempProductsIds in cookies
    app.post('/addtempproduct', async(req, res) => {
        const { product_id } = req.body
        try {
            let product_Ids = req.cookies['tempProductsIds']
            if (product_Ids) {
                product_Ids.push({ product_id, qty: 1 })
                res.cookie('tempProductsIds', product_Ids)
                res.json({ message: 'success' })
            } else {
                product_Ids = []
                product_Ids.push({ product_id, qty: 1 })
                res.cookie('tempProductsIds', product_Ids)
                res.json({ message: 'success' })

            }
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    })

    //get tempProducts Objects
    app.get('/gettempproductsids', async(req, res) => {
        try {
            let tempProductObjectsArray = req.cookies['tempProductsIds']
            res.json({ message: 'success', data: tempProductObjectsArray })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });

    //add tempProducts Ids to user cart product ids
    app.post('/addTempProductIdsToUserCart', async(req, res) => {
        const { cart_id, tempProducts_ids } = req.body
        try {
            let userCart = await cartModel.update({ _id: cart_id }, { $push: { product_ids: tempProducts_ids } })
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });

    //remove temp products ids from cookies
    app.get('/removetempproductsidsfromcookies', async(req, res) => {
        res.clearCookie("tempProductsIds")
        res.json({ message: 'success' })
    })




}




module.exports = cartApi