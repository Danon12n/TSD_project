const dbPets = require("../dbHandler/db-pets");
const dbShop = require("../dbHandler/db-shop");
const dbOrders = require("../dbHandler/db-orders");
const { serverAnswer } = require("../models/serverModels");

class customerController {
    async getPets(request, response) {
        let result;
        let answer;
        try {
            console.log("getPets");
            await dbPets.getPetsWithInfo().then((pets) => {
                result = pets;
            });

            answer = serverAnswer(true, "OK", [...result]);
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async getShops(request, response) {
        let result;
        let answer;
        try {
            console.log("getShops");
            await dbShop.getShops().then((shops) => {
                result = shops;
            });

            answer = serverAnswer(true, "OK", [...result]);
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async createOrder(request, response) {
        let answer;
        try {
            console.log("createOrder");
            await dbOrders.createOrder(request.body);
            await dbPets.changePetAvailability(request.body.petId, "no");

            answer = serverAnswer(true, "Order Created", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async refuseOrder(request, response) {
        let answer;
        try {
            console.log("refuseOrder");
            console.log(request.body);
            await dbOrders.deleteOrderByNumber(request.body.order_number);
            await dbPets.changePetAvailability(request.body.pet_id, "yes");

            answer = serverAnswer(true, "Order Refused", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async getCustomerOrders(request, response) {
        let answer;
        let result = [];
        console.log("getCustomerOrders");
        try {
            await dbOrders.getOrderedPets(request.body.user_id).then((data) => {
                result = data;
            });

            answer = serverAnswer(true, "OK", result);
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }

        console.log("getCustomerOrders done");
        return response.json(answer);
    }
}

module.exports = new customerController();
