'use strict';

module.exports = function(Client) {
    /**
     * Custom login function.
     *
     * @param {Object} credentials - {"username": "myUser", "password": "myPass"}
     * @param {Object} include - A filter to include more data
     * @return {Object} A JSON object with the token information and username
     */
    Client.clientLogin = function(credentials, include, callback) {
        Client.login(credentials, include, (loginErr, loginToken) => {
            if (loginErr) {
                console.log(loginErr)
                callback(loginErr);
            }
            else {
                Client.findById(loginToken.userId, (findErr, userData) => {
                    if (findErr) {
                        console.log(findErr)
                        callback(findErr);
                    }
                    else {
                        let userToken = {
                            accessToken: loginToken.id,
                            ttl: loginToken.ttl,
                            created: loginToken.created,
                            userId: loginToken.userId,
                            username: userData.username,
                            zipCode: userData.zipCode
                        }

                        callback(null, userToken);
                    }
                });
            }
        });
    };
};
