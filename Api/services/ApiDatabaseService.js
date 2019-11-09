//Mike is awesome and is making this comment for testing purposes
require('dotenv').config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_DATA = process.env.DB_DATA;

const con = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATA
});

var mysql = require('mysql2/promise');

var ApiDatabaseService = {
    getConnection: async function(){
        return con;
    },
    GetUser: async function(email){
        const con = await this.getConnection();
        var [rows] = await con.execute('select * from USER WHERE EMAIL = ?', [email]);
        con.end()
        return rows;

    },
    RegisterUser: async function(user){
        const con = await this.getConnection();
        con.execute('INSERT INTO USER (EMAIL,PASSWORD,ROLE) VALUE (?,?,?)', [user.email, user.password, user.role]);
        con.end()
    },
    AddRecipe: async function(recipe){
        const con = await this.getConnection();
        con.execute('INSERT INTO RECIPE(USER_ID,NAME,DESCRIPTION,PICTURE,PREP_TIME,COOK_TIME,INSTRUCTIONS) VALUE (?,?,?,?,?,?,?)', 
            [recipe.userid, recipe.name, recipe.descr, recipe.picture, recipe.preptime, recipe.cooktime, recipe.instructions]);
        con.end()
    },
    GetRecipeID: async function(recipe){
        const con = await this.getConnection();
        rows = await con.execute('SELECT ID FROM RECIPE WHERE USER_ID = ? AND NAME = ?',[recipe.userid,recipe.name]);
        con.end()
        return rows;
    },
    GetIngredient:async function(ingredient){
        const con = await this.getConnection();
        var rows = await con.execute('SELECT * FROM INGREDIENT WHERE NAME = ?',[ingredient])
        con.end()
        return rows;
    },
    AddIngredient: async function(ingredient){
        const con = await this.getConnection();
        con.execute('INSERT INTO INGREDIENT (NAME) VALUES (?)',[ingredient])
        con.end()
    },
    GetIngredientID: async function(ingredient){
        const con = await this.getConnection();
        var rows = await con.execute('SELECT ID FROM INGREDIENT WHERE NAME = ?',[ingredient])
        con.end()
        return rows;
    },
    LinkIngredientToRecipe: async function(recipeID,IngredientID,Ingredient){
        const con = await this.getConnection();
        con.execute('INSERT INTO RECIPETOINGREDIENT (RECIPE_ID,INGREDIENT_ID,AMOUNT,UNIT) VALUES (?,?,?,?)',[recipeID,IngredientID,Ingredient.amount,Ingredient.unit])
        con.end()
    },
    GetListOfIngredientsByRecipeID: async function(RecipeID){
        const con = await this.getConnection();
        rows = await con.execute('SELECT * FROM RECIPETOINGREDIENT a inner join INGREDIENT b on (a.INGREDIENT_ID = b.ID) WHERE a.RECIPE_ID = ?',[RecipeID]);
        con.end()
        return rows;
    },
    GetRecipeByID: async function(RecipeID){
        const con = await this.getConnection();
        row = await con.execute('SELECT * FROM RECIPE WHERE ID = ?',[RecipeID]);
        con.end()
        return row;
    },
    GetAllRecipes: async function(){
        const con = await this.getConnection();
        row = await con.execute('SELECT * FROM RECIPE ');
        con.end()
        return row;
    },
    SearchRecipeByName: async function(RecipeName){
        const con = await this.getConnection();
        RecipeNameWithWildCards = "%"+RecipeName+"%"
        row = await con.execute('SELECT * FROM RECIPE WHERE NAME LIKE ?',[RecipeNameWithWildCards]);
        con.end()
        return row;
    },
    GetIngredientToRecipeByForeignKeys: async function(RecipeID,IngredientID){
        const con = await this.getConnection();
        row = await con.execute('SELECT * FROM RECIPETOINGREDIENT WHERE RECIPE_ID = ? AND INGREDIENT_ID = ?',[RecipeID,IngredientID]);
        con.end()
        return row;
    },
    DeleteRecipeToIngredientByRecipeID: async function(RecipeID){
        const con = await this.getConnection();
        row = await con.execute('DELETE FROM RECIPETOINGREDIENT where RECIPE_ID = ?',[RecipeID]);
        con.end()
        return row;
    },
    DeleteRecipeByID: async function(RecipeID){
        const con = await this.getConnection();
        row = await con.execute('DELETE FROM RECIPE where ID = ?',[RecipeID]);
        con.end()
        return row;
    },
    UpdateRecipe: async function(recipe){
        const con = await this.getConnection();
        con.execute('UPDATE RECIPE SET NAME = ?, DESCRIPTION = ?,PICTURE = ?,PREP_TIME = ?,COOK_TIME = ?,INSTRUCTIONS = ? WHERE ID = ?', 
            [ recipe.name, recipe.descr, recipe.picture, recipe.preptime, recipe.cooktime, recipe.instructions,recipe.id]);
        con.end()
    },
    SearchRecipeByIngredient: async function(IngredientName){
        const con = await this.getConnection();
        rows = await con.execute('Select a.ID from RECIPE a inner join RECIPETOINGREDIENT b on (a.ID = b.RECIPE_ID) inner join INGREDIENT c on (b.INGREDIENT_ID = c.ID) where c.NAME = ?',[IngredientName]);
        con.end()
        return rows;
    },
    GetNumberOfIngredientsByRecipeId: async function(RecipeID){
        const con = await this.getConnection();
        rows = await con.execute('Select count(*) from RECIPETOINGREDIENT a  inner join INGREDIENT b on (a.INGREDIENT_ID = b.ID) where a.RECIPE_ID = ? GROUP BY a.RECIPE_ID',[RecipeID]);
        con.end()
        return rows;
    }

}

module.exports = ApiDatabaseService;
