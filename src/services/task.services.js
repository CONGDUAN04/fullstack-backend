import Task from "../models/task.js";
import aqp from 'api-query-params';

export const postCreateTaskServices = async (data) => {
    if (data.type == "EMPTY TASK") {
        const result = await Task.create(data);
        return result
    }
}
export const getAllTaskServices = async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString)
    delete filter.page;
    let offset = (page - 1) * limit;
    const result = await Task.find(filter).populate(population).skip(offset).limit(limit).exec();
    return result;
}
export const deleteTaskServices = async (id) => {
    try {
        const result = await Task.deleteById(id)
        return result
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}
export const putUpdateTaskServices = async (data) => {
    try {
        const result = await Task.updateOne({ _id: data.id }, { ...data })
        return result
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}