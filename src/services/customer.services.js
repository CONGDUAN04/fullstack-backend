import Customer from "../models/customer.js";
import aqp from 'api-query-params';
export const createCustomerService = async (customerData) => {
    try {
        const results = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        })
        return results
    } catch (error) {
        console.log(error)
        return null;
    }
}
export const createArrCustomerService = async (arr) => {
    try {
        const results = await Customer.insertMany(arr)
        return results
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}
export const getAllCustomersServices = async (limit, page, name, queryString) => {
    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;
            console.log("check filter:", filter)
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({})
        }
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
export const putUpdateCustomerServices = async (id, name, email, address) => {
    try {
        const result = await Customer.updateOne({ _id: id }, { name, email, address })
        return result
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}
export const deleteACustomerServices = async (id, name, email, address) => {
    try {
        const result = await Customer.deleteById(id)
        return result
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}
export const deleteArrCustomerServices = async (customerIds) => {
    try {
        const result = await Customer.delete({ _id: { $in: customerIds } })
        return result
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}