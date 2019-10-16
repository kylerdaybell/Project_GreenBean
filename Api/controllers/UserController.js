var UserService = require('../services/UserService.js');
const ApiDatabaseService = require('../services/ApiDatabaseService.js');
const User = require('../models/UserModel.js');

UserService.constructor(ApiDatabaseService);

const UserController = {
    PostRegisterUser: async function(req, res){
        if(req.body.password == req.body.validate){
            const user = new User(req.body.email, req.body.password, "user");
            if(UserService.RegisterUser(user)){
                res.write(JSON.stringify("Result: Success"));
                res.end();
            }
            else{
                res.write(JSON.stringify("Result: Failure"));
                res.end();
            }
        }
    },
    loggedIn: function(email){
        return true;
    }
}