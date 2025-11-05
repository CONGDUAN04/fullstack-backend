import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

//shape data
const customerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String
})
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    startDate: String,
    endDate: String,
    description: String,
    customerInfo: customerSchema,
    usersInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    leader: userSchema,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
},
    {
        timestamps: true
    }
);
//override all methods
projectSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Project = mongoose.model('project', projectSchema);

export default Project;