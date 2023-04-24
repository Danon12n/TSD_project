const { serverAnswer } = require("../models/serverModels");
const dbPets = require("../dbHandler/db-pets");
const dbOrders = require("../dbHandler/db-orders");

class vendorController {
    async createPet(request, response) {
        let result;
        let answer;
        try {
            console.log("Create Pet");
            console.log(request.body);
            await dbPets.getPetNewId().then((index) => {
                result = index;
            });
            const { pet_id, shop_id, price } = request.body;
            let new_pet_id = result + 1;

            await dbPets
                .addPet({ pet_id: new_pet_id, shop_id, price })
                .then((data) => {
                    console.log(data);
                });

            const {
                pet_type,
                name,
                age,
                color,
                can_swim,
                reproduce_ability,
                gender,
                pet_breed,
            } = request.body;
            await dbPets
                .addPetInfo({
                    pet_id: new_pet_id,
                    pet_type,
                    name,
                    age,
                    color,
                    can_swim,
                    reproduce_ability,
                    gender,
                    pet_breed,
                })
                .then((data) => {
                    console.log(data);
                });
            answer = serverAnswer(true, "Pet was Added", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
            console.log(error);
        }
        return response.json(answer);
    }

    async updatePet(request, response) {
        let result;
        let answer;
        try {
            console.log("updatePet");
            const { pet_id, shop_id, price } = request.body;
            console.log(request.body);

            await dbPets.updatePet({ pet_id, shop_id, price }).then((data) => {
                console.log(data);
            });

            const {
                pet_type,
                name,
                age,
                color,
                can_swim,
                reproduce_ability,
                gender,
                pet_breed,
            } = request.body;
            await dbPets
                .updatePetInfo({
                    pet_id,
                    pet_type,
                    name,
                    age,
                    color,
                    can_swim,
                    reproduce_ability,
                    gender,
                    pet_breed,
                })
                .then((data) => {
                    console.log(data);
                });
            answer = serverAnswer(true, "Pet was Added", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
            console.log(error);
        }
        return response.json(answer);
    }

    async getShopOrders(request, response) {
        let answer;
        let result = [];
        try {
            console.log("getShopOrders");
            await dbOrders
                .getOrderedPetsFromShop(request.body.shop_id)
                .then((data) => {
                    result = data;
                });

            answer = serverAnswer(true, "OK", result);
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async deletePet(request, response) {
        let answer;

        try {
            console.log("deletePet");
            console.log(request.body);
            await dbPets.deletePetById(request.body.pet_id);
            await dbPets.deletePetInfoById(request.body.pet_id);

            answer = serverAnswer(true, "OK", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async acceptOrder(request, response) {
        let answer;
        try {
            console.log("acceptOrder");
            console.log(request.body);
            await dbOrders.deleteOrderByNumber(request.body.order_number);
            await dbPets.deletePetById(request.body.pet_id);
            await dbPets.deletePetInfoById(request.body.pet_id);

            answer = serverAnswer(true, "Order Accepted", {});
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }

    async getShopPets(request, response) {
        let answer;
        let result;
        try {
            console.log("getShopPets");
            console.log(request.body);
            await dbPets.getShopPets(request.body.shop_id).then((data) => {
                result = data;
                console.log(data);
            });

            answer = serverAnswer(true, "Ok", [...result]);
        } catch (error) {
            answer = serverAnswer(false, `${error}`, {});
        }
        return response.json(answer);
    }
}
module.exports = new vendorController();
