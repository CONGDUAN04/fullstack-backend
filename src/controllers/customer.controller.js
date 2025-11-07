import { uploadSingleFile } from "../services/file.services.js";
import { createCustomerService, createArrCustomerService, getAllCustomersServices, putUpdateCustomerServices, deleteACustomerServices, deleteArrCustomerServices } from "../services/customer.services.js";
import Joi from "joi";
export const postCreateCustomer = async (req, res) => {
    const { name, address, phone, email, description } = req.body
    const schema = Joi.object({
        name: Joi.string()
            .pattern(/^[\p{L}0-9 ]+$/u)   // Cho phép kí tự tiếng Việt, số, khoảng trắng
            .required(),
        address: Joi.string(),
        phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
        description: Joi.string().max(500),
    })
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(200).json({
            message: error,
        })
    } else {
        const file = req.files.image;
        const results = await uploadSingleFile(file);
        const imageUrl = results.path
        const customerData = {
            name, address, phone, email, description, image: imageUrl
        }
        const customer = await createCustomerService(customerData)
        return res.status(200).json({
            ErrorCode: 0,
            data: customer
        })
    }
}
export const postCreateArrCustomer = async (req, res) => {
    const customers = await createArrCustomerService(req.body.customers)
    if (customers) {
        return res.status(200).json({
            ErrorCode: 0,
            data: customers
        })
    } else {
        return res.status(200).json({
            ErrorCode: -1,
            data: customers
        })
    }
}
export const getAllCustomers = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let name = req.query.name
    let result = null;
    if (limit && page) {
        result = await getAllCustomersServices(limit, page, name, req.query);
    } else
        result = await getAllCustomersServices();
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const putUpdateCustomer = async (req, res) => {
    const { id, name, email, address } = req.body
    const result = await putUpdateCustomerServices(id, name, email, address)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const deleteACustomer = async (req, res) => {
    const { id } = req.body
    const result = await deleteACustomerServices(id)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const deleteArrCustomer = async (req, res) => {
    const customerIds = req.body.customersId
    const result = await deleteArrCustomerServices(customerIds)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}