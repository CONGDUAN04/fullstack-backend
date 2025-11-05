import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

//shape data
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String
})
const projectSchema = new mongoose.Schema({
    name: String,
    startDate: String,
    endDate: String,
    description: String
})
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: String,
    status: String,
    startDate: String,
    usersInfo: userSchema,
    projectInfo: projectSchema
},
    {
        timestamps: true
    }
);
//override all methods
taskSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Task = mongoose.model('task', taskSchema);

export default Task;