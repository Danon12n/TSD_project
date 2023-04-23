const MySQLRep = require("./MySQLRep");

class ShopMySQLRep extends MySQLRep {
    async getShops() {
        this.start();

        return this.connection
            .execute("SELECT * FROM `shops`")
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    async addNewShop(shop) {
        this.start();

        return this.connection
            .execute(
                `Insert into shops (shop_id, adress, city, owner) values (${shop.shop_id}, ${shop.adress}, ${shop.city}, ${shop.owner})`
            )
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    async deleteShopById(id) {
        this.start();

        return this.connection
            .execute(`Delete from shops where shop_id = ${id}`)
            .then((res) => {
                return res[0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }

    async getShopIdByAdress(address) {
        this.start();

        return this.connection
            .execute(`Select * from shops where adress like '${address}' `)
            .then((res) => {
                return res[0][0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }
    async getShopAdressByShopId(shopId) {
        this.start();

        return this.connection
            .execute(`Select * from shops where shop_id = ${shopId}`)
            .then((res) => {
                return res[0][0];
            })
            .then((data) => {
                this.stop();
                return data;
            });
    }
}

module.exports = new ShopMySQLRep();
