export const responseHelper = (response, status, message, data, token) => {
    return response.status(status).json({
        message: message,
        status: status,
        data: data,
        token: token
    })
}
 