import { createProjectService, deleteProjectServices, getProjectServices, putUpdateProjectServices } from "../services/project.services.js"

export const postCreateProject = async (req, res) => {
    const project = req.body;
    console.log("check", project)
    const result = await createProjectService(project)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const getAllProject = async (req, res) => {
    const result = await getProjectServices(req.query);
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const deleteProject = async (req, res) => {
    const result = await deleteProjectServices(req.body.id)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}
export const putUpdateProject = async (req, res) => {
    const result = await putUpdateProjectServices(req.body)
    return res.status(200).json({
        ErrorCode: 0,
        data: result
    })
}