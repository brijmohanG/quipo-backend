const User = require('../db/models/user');
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form;
const changeCaseObject = require('change-case-object');

module.exports.addUser = async function (req, res) {
    
    try {
        const body = req.body

        /* preparing the validation body */
        const validatedObject = Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            phone: Joi.string().allow(''),
            city: Joi.string().allow(''), // City
            state: Joi.string().allow(''), // state
            pin: Joi.string().allow(''), // Postal code
            
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
            city: body.city,
            state: body.state,
            pin: body.pin,

        }, { abortEarly: false })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms([
            {
                regex: '/[0-9]{10}/',
                message: '"${key}" must be a valid 10 digit contact number.'
            }
        ])
        const validationError = convertToForms(validateValue.error)

        /* checking for any validation error,
        If received error then throw it to client */
        if (validationError) {
            const errMsgObject = await utils.validateData(validationError)
            return res.status(200).json({
                success: false,
                message: errMsg,
                error: errMsgObject
            })
        }

        const validatedValues = validateValue.value
        const updateValues = changeCaseObject.snakeCase(validatedValues)
        User.create(updateValues).then(user => {
            if(user) {
                 return res.status(200).json({
                success: true,
                message: 'user profile created successfully',
                response: user
            })
            }else {
                res.status(200).json({
                success: false,
                message: 'database error'
            })
            }
        })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `exception ${error}`
        })
    }
}

module.exports.findAllUser = async function (req, res) {
    
    try {
        User.findAll().then(user => {
            if(user) {
                 return res.status(200).json({
                success: true,
                message: 'user fetch successfully',
                response: user
            })
            }else {
                res.status(200).json({
                success: false,
                message: 'database error'
            })
            }
        })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `exception ${error}`
        })
    }
}

module.exports.findUser = async function (req, res) {
    
    try {
        const body = req.body

        /* preparing the validation body */
        const validatedObject = Joi.object({
            id: Joi.number()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            id: body.id,

        }, { abortEarly: false })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms([
            {
                regex: '/[0-9]{10}/',
                message: '"${key}" must be a valid 10 digit contact number.'
            }
        ])
        const validationError = convertToForms(validateValue.error)

        /* checking for any validation error,
        If received error then throw it to client */
        if (validationError) {
            
            return res.status(200).json({
                success: false,
                message: errMsg,
                error: errMsgObject
            })
        }

        const validatedValues = validateValue.value
        User.findOne({where: {id:validatedValues.id}}).then(user => {
            if(user) {
                 return res.status(200).json({
                success: true,
                message: 'user profile get successfully',
                response: user
            })
            }else {
                res.status(200).json({
                success: false,
                message: 'database error'
            })
            }
        })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `exception ${error}`
        })
    }
}

module.exports.deleteUser = async function (req, res) {
    
    try {
        const body = req.body

        /* preparing the validation body */
        const validatedObject = Joi.object({
            id: Joi.number()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            id: body.id,

        }, { abortEarly: false })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms([
            {
                regex: '/[0-9]{10}/',
                message: '"${key}" must be a valid 10 digit contact number.'
            }
        ])
        const validationError = convertToForms(validateValue.error)

        /* checking for any validation error,
        If received error then throw it to client */
        if (validationError) {
            return res.status(200).json({
                success: false,
                message: errMsg,
                error: errMsgObject
            })
        }

        const validatedValues = validateValue.value
        User.destroy({where: {id: validatedValues.id}}).then(user => {
            if(user) {
                 return res.status(200).json({
                success: true,
                message: 'user profile deleted successfully',
                response: user
            })
            }else {
                return res.status(200).json({
                success: false,
                message: 'database error'
            })
            }
        })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `exception ${error}`
        })
    }
}

module.exports.updateUser = async function (req, res){
    try {
        const body = req.body

        /* preparing the validation body */
        const validatedObject = Joi.object({
            id: Joi.number(),
            firstName: Joi.string(),
            lastName: Joi.string(),
            phone: Joi.string().allow(''),
            city: Joi.string().allow(''), // City
            state: Joi.string().allow(''), // state
            pin: Joi.string().allow(''), // Postal code
            
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            id: body.id,
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
            city: body.city,
            state: body.state,
            pin: body.pin,

        }, { abortEarly: false })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms([
            {
                regex: '/[0-9]{10}/',
                message: '"${key}" must be a valid 10 digit contact number.'
            }
        ])
        const validationError = convertToForms(validateValue.error)

        /* checking for any validation error,
        If received error then throw it to client */
        if (validationError) {
            const errMsgObject = await utils.validateData(validationError)
            return res.status(200).json({
                success: false,
                message: errMsg,
                error: errMsgObject
            })
        }

        const validatedValues = validateValue.value
        const updateValues = changeCaseObject.snakeCase(validatedValues)
        User.update(updateValues, {where :{id : updateValues.id}}).then(user => {
            if(user) {
                 return res.status(200).json({
                success: true,
                message: 'user profile update successfully',
                response: user
            })
            }else {
                res.status(200).json({
                success: false,
                message: 'database error'
            })
            }
        })
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `exception ${error}`
        })
    }
}

