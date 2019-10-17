var IApiDatabaseService;
var User = require('../models/UserModel.js')
const bcrypt = require('bcrypt-nodejs');

var UserService = {
    constructor: function(IApiDatabaseServiceInsert){
        IApiDatabaseService = IApiDatabaseServiceInsert;
    },
    RegisterUser: async function(user){
        var databaseResult = await IApiDatabaseService.GetUser(user.email);
        if(typeof databaseResult[0] == 'undefined'){
            user.password = bcrypt.hashSync(user.password);
            IApiDatabaseService.RegisterUser(user);
            return true;
        }
        return false;
    },
    LoginUser: async function(user){
        var databaseResult = await IApiDatabaseService.GetUser(user.email);
        if(typeof databaseResult[0] != 'undefined'){
            password = databaseResult[0]['PASSWORD'];
            if(bcrypt.compareSync(user.password,password)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}

module.exports = UserService;
