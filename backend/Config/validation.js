const { check, body, validationResult } = require('express-validator')
module.exports = {
    user: {
        signUpValidation: [check('email').not().isEmpty(),
            check('email').isEmail(),
            check('username').not().isEmpty(),
            body('username').trim(),
            body('email').trim()
        ],
        signInValidation: [
            check('email').not().isEmpty(),
            check('email').isEmail(),
            check('password').not().isEmpty()
        ]
    },
    catchValidationErrors: (req, res, next) => {
        let errorObject = validationResult(req)
        if (errorObject.errors.length > 0) {
            res.json({ message: "Invalid Value, Please try again", data: errorObject.errors })
        } else {
            next()
        }

    }
}