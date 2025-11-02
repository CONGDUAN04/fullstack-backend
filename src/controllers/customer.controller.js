import { uploadSingleFile } from "../services/file.services.js";
import { createCustomerService, createArrCustomerService, getAllCustomersServices, putUpdateCustomerServices, deleteACustomerServices } from "../services/customer.services.js";
export const postCreateCustomer = async (req, res) => {
    const { name, address, phone, email, description } = req.body

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
    const result = await getAllCustomersServices()
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