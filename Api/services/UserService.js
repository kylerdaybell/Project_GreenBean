var IApiDatabaseService;
var User = require('../models/UserModel.js')
const bcrypt = require('bcryptjs');

var UserService = {
    constructor: function(IApiDatabaseServiceInsert){
        IApiDatabaseService = IApiDatabaseServiceInsert;
    },
    RegisterUser: async function(user){
        if(user.email !== "" && user.password!=""){
            var databaseResult = await IApiDatabaseService.GetUser(user.email);
            if(typeof databaseResult[0] == 'undefined'){
                user.password = bcrypt.hashSync(user.password);
                IApiDatabaseService.RegisterUser(user);
                return true;
            }
        }
        return false;
    },
    LoginUser: async function(user){
        var databaseResult = await IApiDatabaseService.GetUser(user.email);
        if(user.email != "" && password != ""){
            if(typeof databaseResult[0] != 'undefined'){
                password = databaseResult[0]['PASSWORD'];
                if(bcrypt.compareSync(user.password,password)){
                    return true;
                }
            }
        }
        return false
    },
    GetUserID: async function(user){
        var databaseResult = await IApiDatabaseService.GetUser(user.email);
        if(typeof databaseResult[0]["ID"] != 'undefined'){
            return databaseResult[0]["ID"]
        }else{
            return 0;
        }
    }
}

module.exports = UserService;
