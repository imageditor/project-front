import config from '../config'

const {
    IM_SERVICE_HOST,
    IM_SERVICE_PORT
} = config

const processingBaseUrl = `//${IM_SERVICE_HOST}:${IM_SERVICE_PORT}`

class ProcessingImageDataService {
    startProcessing(data, successCallback, failureCallback = () => null) {
        return fetch(processingBaseUrl + '/api/images/processing', {
            method: "POST",
            body: data
        })
        .then(successCallback)
        .catch(failureCallback);
    }
}

export default new ProcessingImageDataService();