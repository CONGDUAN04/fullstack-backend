import mongoose from "mongoose";
import mongoose_delete from 'mongoose-delete';
const customerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: String,
        phone: String,
        email: String,
        image: String,
        description: String,
    },
    {
        timestamps: true,
        // statics: {
        //     findByName(name) {
        //         return this.find({ name: new RegExp(name, 'i') });
        //     },
        // }
    }

);
//override all methods
customerSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
