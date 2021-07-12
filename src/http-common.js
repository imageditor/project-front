import axios from "axios";

import config from './config'

const {
    USE_API_GW,
    API_GW_HOST,
    API_GW_PORT,
    PM_SERVICE_HOST,
    PM_SERVICE_PORT,
    IM_SERVICE_HOST,
    IM_SERVICE_PORT,
} = config

export const getHttpTransport = (service) => {
    let baseUrl = ''
    let contentType = "application/json"

    if (USE_API_GW) {
        baseUrl = `${API_GW_HOST}:${API_GW_PORT}`
    } else {
        switch (service) {
            case 'project':
                baseUrl = `//${PM_SERVICE_HOST}:${PM_SERVICE_PORT}`
                break;
            case 'image':
                baseUrl = `//${IM_SERVICE_HOST}:${IM_SERVICE_PORT}`
                break;
            case 'imagesFormData':
                baseUrl = `//${IM_SERVICE_HOST}:${IM_SERVICE_PORT}`
                contentType = "multipart/form-data"
                break;
            default:
                baseUrl = `//localhost:8086`
                break;
        }
    }
    return axios.create({
        baseURL: baseUrl + '/api',
        headers: {
            "Content-type": contentType
        }

    });
}
