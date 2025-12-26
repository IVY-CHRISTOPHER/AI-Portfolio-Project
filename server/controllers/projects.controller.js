import Project from "../models/Project.js";

export async function handleServerError(res, message, error) {
    console.error(message, error);
    res.status(500).json({ error: message });
}

export async function getProjects(_req, res) {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        handleServerError(res, "Failed to fetch projects", err);
    }
}

export async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json(project);
    } catch (err) {
        handleServerError(res, "Failed to fetch project", err);
    }
}

export async function createProject(req, res) {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) {
        handleServerError(res, "Failed to create project", err);
    }
}

export async function updateProject(req, res) {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json(project);
    } catch (err) {
        handleServerError(res, "Failed to update project", err);
    }
}

export async function deleteProject(req, res) {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(204).end();
    } catch (err) {
        handleServerError(res, "Failed to delete project", err);
    }
}
