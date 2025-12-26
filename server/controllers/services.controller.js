import Service from "../models/Service.js";

export async function handleServerError(res, message, error) {
    console.error(message, error);
    res.status(500).json({ error: message });
}

export async function getServices(_req, res) {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        handleServerError(res, "Failed to fetch services", err);
    }
}

export async function getServiceById(req, res) {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.json(service);
    } catch (err) {
        handleServerError(res, "Failed to fetch service", err);
    }
}

export async function createService(req, res) {
    try {
        const service = await Service.create(req.body);
        res.status(201).json(service);
    } catch (err) {
        handleServerError(res, "Failed to create service", err);
    }
}

export async function updateService(req, res) {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.json(service);
    } catch (err) {
        handleServerError(res, "Failed to update service", err);
    }
}

export async function deleteService(req, res) {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(204).end();
    } catch (err) {
        handleServerError(res, "Failed to delete service", err);
    }
}
