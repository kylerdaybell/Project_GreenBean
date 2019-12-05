var UserService = require('../services/UserService.js');
var MockApiDatabaseService = require('../services/MockApiDatabaseService.js');
var User = require('../models/UserModel.js');

UserService.constructor(MockApiDatabaseService);

test('bogus test',async ()=>{
    expect(true).toBe(true);
})

