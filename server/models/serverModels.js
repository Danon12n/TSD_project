const serverAnswer = (success, message, payload) => {
    return {
        success,
        message,
        payload,
    };
};

module.exports = { serverAnswer };
