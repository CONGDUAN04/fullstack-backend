import Customer from "../models/customer.js";
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
export const getAllCustomersServices = async (arr) => {
    try {
        const result = await Customer.find({})
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
