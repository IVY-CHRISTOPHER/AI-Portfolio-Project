import {
    handleServerError,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projects.controller.js";

export default (app) => {
    app.get("/", getProjects, handleServerError);
    app.get("/:id", getProjectById, handleServerError);
    app.patch("/:id", updateProject, handleServerError);
    app.delete("/:id", deleteProject, handleServerError);
};
