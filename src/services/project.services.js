import Project from "../models/project.js"
import aqp from 'api-query-params';
export const createProjectService = async (data) => {
    if (data.type == "EMPTY PROJECT") {
        const result = await Project.create(data);
        return result
    }
    if (data.type === "Add Users") {
        console.log("Check data", data)
        const myProject = await Project.findById(data.projectId).exec();
        const existingUserIds = new Set(
            myProject.usersInfo.map(user => user.toString())
        );
        for (let i = 0; i < data.userArr.length; i++) {
            const userId = data.userArr[i].toString();
            if (!existingUserIds.has(userId)) {
                myProject.usersInfo.push(data.userArr[i])
            } else {
                return "User đã tồn tại trong project"
            }
        }
        const newResult = await myProject.save();
        return newResult;
    }
    if (data.type === "Remove User") {
        const myProject = await Project.findById(data.projectId).exec()
        for (let i = 0; i < data.userArr.length; i++) {
            myProject.usersInfo.pull(data.userArr[i]);
        }
        const newResult = await myProject.save();
        return newResult
    }
}
export const getProjectServices = async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString)
    delete filter.page;
    let offset = (page - 1) * limit;
    const result = await Project.find(filter).populate(population).skip(offset).limit(limit).exec();
    return result;
}

export const deleteProjectServices = async (id) => {
    try {
        const result = await Project.deleteById(id)
        return result
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}
export const putUpdateProjectServices = async (data) => {
    try {
        const result = await Project.updateOne({ _id: data.id }, { ...data })
        return result
    } catch (error) {
        console.log("check error", error)
        return null;
    }
}
