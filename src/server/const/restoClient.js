const resJson = (res, source = {}) => {
    const { status, data, msg, err, token } = source;
    res.status(status).json({
        data: data,
        msg: msg,
        err: err,
        token: token
    })
}

// resJson(res, {

// })

export default {
    resJson
}