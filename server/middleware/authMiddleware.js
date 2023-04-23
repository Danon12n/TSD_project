const jwt = require("jsonwebtoken");
const { secret } = require("../JWT_config");
const { serverAnswer } = require("../models/serverModels");

module.exports = function (request, response, next) {
    if (request.method === "OPTIONS") {
        next();
    }

    try {
        const token = request.headers.authorization.split(" ")[1];
        if (!token) {
            return response
                .status(403)
                .json(serverAnswer(false, "Пользователь не авторизован", {}));
        }
        try {
            const decodedData = jwt.verify(token, secret);
            request.user = decodedData;
        } catch (error) {
            return response
                .status(403)
                .json(serverAnswer(false, "Token Expired", {}));
        }

        next();
    } catch (e) {
        console.log(e);
        return response
            .status(403)
            .json(serverAnswer(false, "Пользователь не авторизован", {}));
    }
};
