const success = (res, source = {}) => {
    const { httpCode, data, message, token } = source;
    res.status(httpCode).json({
        data: data,
        message: message,
        token: token
    })
}
export{
    success
}