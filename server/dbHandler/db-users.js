const MySQLRep = require("./MySQLRep");

class UserMySQLRep extends MySQLRep {
    
    async getUsers() {
        this.start();

        return this.connection
            .execute("SELECT * FROM users")
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    
    async addUser(user) {
        this.start();
        return this.connection
            .execute(
                "Insert into users (login, password, name, surname, telephone, role)" +
                    ` values ('${user.login}', '${user.password}', '${user.name}', '${user.surname}','${user.telephone}', 'customer')`
            )
            .then((res) => {
                return res;
            })
            .then((data) => {
                this.stop();
                return data;
            });
        
    }

    async changeRole(id, role, address) {
        this.start();
        return this.connection
            .execute(
                `UPDATE users SET role='${role}',shop_address='${address}' WHERE user_id=${id};`
            )
            .then((res) => {
                return res;
            })
            .then((data) => {
                this.stop();
                return data;
            });
        //кароче тут catch добавить
    }

    // найти user по login // login => string
    async getUserByLogin(login) {
        this.start();
        if (login === "" || login === undefined) {
            return Promise.reject("empty payload");
        }
        return this.connection
            .execute(`Select * from users where login like '${login}'`)
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data[0];
            });
    }

    // id => int
    async getUserById(id) {
        this.start();
        if (id === undefined) {
            return Promise.reject("empty payload");
        }
        return this.connection
            .execute(`Select * from users where user_id = '${id}'`)
            .then((res) => {
                return res[0][0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    // id => int
    async deleteUserById(payload) {
        this.start();
        if (payload.id === undefined) {
            return Promise.reject("empty payload");
        }
        return this.connection
            .execute(`Delete from users where user_id = ${payload.id}`)
            .then((res) => {
                console.log(res);
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }
}

module.exports = new UserMySQLRep();
