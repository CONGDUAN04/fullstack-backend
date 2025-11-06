import { deleteTaskServices, getAllTaskServices, postCreateTaskServices, putUpdateTaskServices } from "../services/task.services.js"

export const postCreateTask = async (req, res) => {
    const result = await postCreateTaskServices(req.body)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const getAllTask = async (req, res) => {
    const result = await getAllTaskServices(req.query)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const deleteTask = async (req, res) => {
    const result = await deleteTaskServices(req.body.id)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const putUpdateTask = async (req, res) => {
    const result = await putUpdateTaskServices(req.body)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}