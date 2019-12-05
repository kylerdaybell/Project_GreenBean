var UserService = require('../services/UserService.js');
var MockApiDatabaseService = require('../services/MockApiDatabaseService.js');
var User = require('../models/UserModel.js');

UserService.constructor(MockApiDatabaseService);

test('bogus test',async ()=>{
    MockApiDatabaseService.GetUser();
    var user = new User("kyler.daybell96@gmail.com","password","user")
    expect(await UserService.LoginUser(user)).toBe(true);
})

