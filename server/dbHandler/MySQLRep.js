const mysql = require("mysql2");
const connectionInfo = require("../utils/dbConfig");

module.exports = class dbUsers {
    constructor() {
        this.connection;
    }

    start() {
        this.connection = mysql.createConnection(connectionInfo).promise();
        this.connection.connect((err) => {
            if (err) {
                return console.error("Ошибка: " + err.message);
            } else {
                console.log("Подключение к серверу MySQL успешно установлено");
            }
        });
    }

    stop() {
        this.connection.end((err) => {
            if (err) {
                return console.log("Ошибка: " + err.message);
            }
            console.log("Подключение закрыто");
        });
    }
};
