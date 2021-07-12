import { getHttpTransport } from "../http-common";

const httpJson = getHttpTransport('project')

class ProjectDataService {
    getAll() {
        return httpJson.get("/projects");
    }

    get(id) {
        return httpJson.get(`/projects/${id}`);
    }

    create(data) {
        return httpJson.post("/projects", data);
    }

    update(id, data) {
        return httpJson.put(`/projects/${id}`, data);
    }

    delete(id) {
        return httpJson.delete(`/projects/${id}`);
    }

    deleteAll() {
        return httpJson.delete(`/projects`);
    }

    findByTitle(title) {
        return httpJson.get(`/projects?title=${title}`);
    }
}

export default new ProjectDataService();