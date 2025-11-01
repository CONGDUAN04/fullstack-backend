import { uploadSingleFile } from "../services/file.services.js";
import { createCustomerService } from "../services/customer.services.js";
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