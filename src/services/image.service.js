import { getHttpTransport } from "../http-common";

const http = getHttpTransport('image')

class ImageDataService {
    getAll() {
        return http.get(`/images`);
    }

    get(id) {
        return http.get(`/images/${id}`);
    }

    create(data) {
        return http.post("/images", data);
    }

    update(id, data) {
        return http.put(`/images/${id}`, data);
    }

    delete(id) {
        return http.delete(`/images/${id}`);
    }

    deleteAll() {
        return http.delete(`/images`);
    }

    findByProjectId(projectId) {
        return http.get(`/images?projectid=${projectId}`);
    }
}

export default new ImageDataService();