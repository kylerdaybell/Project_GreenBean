var IApiDatabaseService;
var User = require('../models/UserModel.js')

var UserService = {
    constructor: function(IApiDatabaseServiceInsert){
        IApiDatabaseService = IApiDatabaseServiceInsert;
    },
    RegisterUser: async function(user){
        var databaseResult = IApiDatabaseService.GetUser(user.email);
        if(databaseResult[0]['EMAIL'] === null){
            IApiDatabaseService.RegisterUser(user);
            return true;
        }
        return false;
    }
}

module.exports = UserService;
