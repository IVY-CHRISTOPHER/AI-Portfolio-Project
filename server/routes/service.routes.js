import {
    handleServerError,
    getServices,
    getServiceById,
    updateService,
    deleteService,
} from "../controllers/services.controller.js";

export default (app) => {
    app.get("/", getServices, handleServerError);
    app.get("/:id", getServiceById, handleServerError);
    app.patch("/:id", updateService, handleServerError);
    app.delete("/:id", deleteService, handleServerError);
};
