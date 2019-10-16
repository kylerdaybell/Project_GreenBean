var IApiDatabaseService;
const User = require('../models/UserModel.js')

const UserService = {
    constructor: function(IApiDatabaseServiceInsert){
        IApiDatabaseService = IApiDatabaseServiceInsert;
    },
    RegisterUser: async function(user){
        let databaseResult = IApiDatabaseService.GetUser(user.email);
        if(databaseResult[0]['EMAIL'] === null){
            IApiDatabaseService.RegisterUser(user);
            return true;
        }
        return false;
    }
}

module.exports = UserService;