const dbUsers = require("../dbHandler/db-users");
const { serverAnswer } = require("../models/serverModels");
const { secret, expiringTime } = require("../JWT_config");
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: expiringTime });
};

class userController {
    async getUsers(request, response) {
        let result;
        let answer;
        try {
            await dbUsers.getUsers().then((data) => {
                result = data;
            });
            console.log("getUsers");
            answer = serverAnswer(true, "OK", [...result]);
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async changeRole(request, response) {
        let answer, result;
        try {
            console.log("changeRole");
            dbUsers.changeRole(
                request.body.id,
                request.body.role,
                request.body.address === "NULL" ? null : request.body.address
            );
            answer = serverAnswer(true, "User role was changed!", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async deleteUser(request, response) {
        let answer, result;
        try {
            console.log("deleteUser");
            dbUsers.deleteUserById(request.body);
            answer = serverAnswer(true, "User was deleted!", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async register(request, response) {
        let answer, result;
        try {
            console.log("register");
            await dbUsers.addUser(request.body);
            await dbUsers.getUserByLogin(request.body.login).then((data) => {
                result = { ...data };
            });
            const token = generateToken({
                user_id: result.user_id,
                password: result.password,
            });
            answer = serverAnswer(true, "User was added!", {
                user_id: result.user_id,
                login: result.login,
                name: result.name,
                surname: result.surname,
                role: result.role,
                telephone: result.telephone,
                shop_address: "null",
                token,
            });
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async authWithToken(request, response) {
        let result;
        let decodedData;
        console.log("authWithToken");
        try {
            const token = request.headers.authorization.split(" ")[1];
            if (!token) {
                return response
                    .status(403)
                    .json(
                        serverAnswer(false, "Пользователь не авторизован", {})
                    );
            }
            try {
                decodedData = jwt.verify(token, secret);
            } catch (error) {
                return response
                    .status(403)
                    .json(serverAnswer(false, "Token Expired", {}));
            }
            let AuthedUser;
            await dbUsers.getUserById(decodedData.user_id).then((user) => {
                AuthedUser = user;
            });

            return response.status(200).json(
                serverAnswer(true, "Authorized", {
                    user_id: AuthedUser.user_id,
                    login: AuthedUser.login,
                    name: AuthedUser.name,
                    surname: AuthedUser.surname,
                    role: AuthedUser.role,
                    telephone: AuthedUser.telephone,
                    shop_address: AuthedUser.shop_address,
                })
            );
        } catch (error) {
            return response.status(403).json(serverAnswer(false, error, {}));
        }
    }

    async auth(request, response) {
        let result;

        try {
            console.log("auth");
            await dbUsers.getUserByLogin(request.body.login).then((data) => {
                result = data;
            });
        } catch (error) {
            return response.json(serverAnswer(false, `${error}`, {}));
        }

        if (!result) {
            return response.json(serverAnswer(false, "User not found!", {}));
        }

        if (result.password !== request.body.password) {
            return response.json(serverAnswer(false, "Incorrect password", {}));
        }
        const token = generateToken({
            user_id: result.user_id,
            password: result.password,
        });
        return response.json(
            serverAnswer(true, "Successfully authorized", {
                user_id: result.user_id,
                login: result.login,
                name: result.name,
                surname: result.surname,
                role: result.role,
                telephone: result.telephone,
                shop_address: result.shop_address,
                token,
            })
        );
    }
}

module.exports = new userController();
