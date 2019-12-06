var UserService = require('../services/UserService.js');
var MockApiDatabaseService = require('../services/MockApiDatabaseService.js');
var User = require('../models/UserModel.js');

UserService.constructor(MockApiDatabaseService);

test('UserService.LoginUser with correct username and password',async ()=>{
    var user = new User("kyler.daybell96@gmail.com","password","user")
    expect(await UserService.LoginUser(user)).toBe(true);
});

test("UserService.LoginUser with invalid but complete username and password fails", async()=>{
    var user = new User("kyler.daybell96@gmail.com","pass","user")
    expect(await UserService.LoginUser(user)).toBe(false);
})

test("UserService.LoginUser with blank username and password fails", async()=>{
    var user = new User("","","")
    expect(await UserService.LoginUser(user)).toBe(false);
})

