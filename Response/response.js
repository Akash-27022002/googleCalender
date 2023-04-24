function setResponse(status, message) {
    let result = {
        status: status,
        message: message,
    }
    return result;
}

function sendResponse(res, params) {
    return res.status(params.status).send(params.message);
}

module.exports = {
    sendResponse,
    setResponse
}
