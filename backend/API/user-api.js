const userModel = require('../Models/user-model')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../Config/app-config')
const { user, catchValidationErrors } = require('../Config/validation')

const userApi = app => {

    //signup
    app.post('/signup', user.signUpValidation, catchValidationErrors, async(req, res) => {
        const { username, email, password, mobile } = req.body
        try {
            let encryptedPassword = bcrypt.hashSync(password, 8)
            let user = new userModel({
                _id: mongoose.Types.ObjectId(),
                username,
                email,
                password: encryptedPassword,
                mobile
            })
            await user.save()
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler', error })
        }
    });

    //signin
    app.post('/signin', user.signInValidation, catchValidationErrors, async(req, res) => {
        const { email, password } = req.body
        try {
            let user = await userModel.findOne({ email }).lean()
            if (user) {
                let encryptedPassword = user.password
                let validPassword = bcrypt.compareSync(password, encryptedPassword)
                if (validPassword) {
                    let token = jwt.sign({ id: user._id }, secret)
                    res.cookie('authorization', token)
                    delete user.password
                    res.json({ message: 'success', user })
                } else {
                    res.json({ message: 'Invalid password, Please try again' })
                }
            } else {
                res.json({ message: 'Invalid email, Please try again' })
            }
        } catch (error) {

        }
    })

    //signout
    app.get('/signout', async(req, res) => {
        try {
            res.clearCookie('authorization')
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }

    })

    //update user
    app.post('/updateuser', async(req, res) => {
        const { user_id, cart_id } = req.body
        try {
            let user = await userModel.update({ _id: user_id }, { cart_id })
            res.json({ message: 'success' })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }

    })

    //get user by id
    app.post('/userbyid', async(req, res) => {
        const { user_id } = req.body
        try {
            let user = await userModel.find({ _id: user_id }).lean()
            delete user[0].password
            res.json({ message: 'success', data: user })
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });

    //get user id
    app.get('/getuserid', async(req, res) => {
        try {
            let token = req.fcookies['authorization']
            let verfied = jwt.verify(token, secret)
            if (verfied) {
                let user_id = verfied.id
                res.json({ message: 'success', data: user_id })
            } else {
                res.json({ message: 'not authorized' })
            }
        } catch (error) {
            res.json({ message: 'error from handler' })
        }


    })

    //user authentication
    app.get('/userauth', async(req, res) => {
        try {
            let token = req.cookies['authorization']
            let verfied = jwt.verify(token, secret)
            if (verfied) {
                let user_id = verfied.id
                res.json({ message: 'success', data: user_id })
            } else {
                res.json({ message: 'not authorized' })
            }
        } catch (error) {
            res.json({ message: 'error from handler' })
        }
    });

}

module.exports = userApi