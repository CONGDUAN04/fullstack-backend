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