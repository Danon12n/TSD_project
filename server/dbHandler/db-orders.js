const MySQLRep = require("./MySQLRep");

class OrdersMySQLRep extends MySQLRep {
    async createOrder(order) {
        this.start();

        return this.connection
            .execute(
                `Insert into orders (user_id, pet_id) values (${order.userId}, ${order.petId})`
            )
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    async createOrderWithId(order) {
        this.start();

        return this.connection
            .execute(
                `Insert into orders (order_number, user_id, pet_id) values (${order.order_number}, ${order.userId}, ${order.petId})`
            )
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    async getOrderedPets(userId) {
        this.start();

        return this.connection
            .execute(
                `Select pet_id, order_number from orders where user_id = ${userId} `
            )
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    async getOrderedPetsFromShop(shop_id) {
        this.start();

        return this.connection
            .execute(
                `SELECT order_number, user_id, t1.pet_id, price, available 
                FROM 
                    (SELECT * FROM orders) t1 
                JOIN 
                    (SELECT * FROM pets) t2 
                ON t1.pet_id = t2.pet_id 
                WHERE shop_id =${shop_id}; `
            )
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    async deleteOrderByNumber(number) {
        this.start();
        console.log(number);
        return this.connection
            .execute(`Delete from orders where order_number = ${number}`)
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                console.log("done");
                return data;
            });
    }

    async getOrders() {
        this.start();

        return this.connection
            .execute(`SELECT * FROM orders`)
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }
}

module.exports = new OrdersMySQLRep();
