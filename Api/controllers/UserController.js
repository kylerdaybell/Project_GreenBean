var UserService = require('../services/UserService.js');
var ApiDatabaseService = require('../services/ApiDatabaseService.js');
var User = require('../models/UserModel.js');

UserService.constructor(ApiDatabaseService);

var UserController = {
    PostRegisterUser: async function(req, res){
        if(req.body.password == req.body.validate){
            var user = new User(req.body.email, req.body.password, "user");
            if(await UserService.RegisterUser(user)){
                res.write(JSON.stringify("Result: Success"));
                res.end();
            }
            else{
                res.write(JSON.stringify("Result: Failure"));
                res.end();
            }
        }
        else{
            res.write(JSON.stringify("Result: Failure"));
            res.end();
        }
    },
    PostLoginUser: async function(req,res){
    var user = new User(req.body.email, req.body.password, null);
        if(await UserService.LoginUser(user)){
            let userId = await UserService.GetUserID(user);
            resultObject = {Result: "Success", UserId: userId} 
            res.write(JSON.stringify(resultObject));
            res.end();
        }
        else{
            resultObject = {Result: "Failure"};
            res.write(JSON.stringify(resultObject));
            res.end();
        }
    }
}

module.exports = UserController;
