# GreenBeans API Usage #
>The Project_GreenBeans database is open source and available for use by anyone. you may choose to use our existing data store or create one of your own for your application. If you choose to create your own data store using our API please see the GreenBeans_API_Setup.md for install instructions.

## Registering an email ##
Method
>POST

URL
>http://api.greenbeancooking.com/register

Request Body
```
{
	"email": "youremail",
	"password": "password",
	"validate": "password"
}
```

## login validation ##
### Our api will validate the login of users who's credentials you store in our api ###
Method
>POST

URL
>http://api.greenbeancooking.com/login

Request Body
```
{
	"email": "youremail",
	"password": "password"
}
```
## Adding a recipe ##
Method
>POST

URL
>http://api.greenbeancooking.com/createrecipe

Request Body
```
{
    "name": "chicken a la mode",
    "descr": "chicken on icecream",
    "picture": "Fake url",
    "preptime": "00:05:00",
    "cooktime": "00:00:00",
    "instructions": "put raw chicken on icecream and then serve",
    "ingredientslist": [{"name":"chicken","amount":"10","unit":"cups"},{"name":"icecream","amount":"10","unit":"cups"}],
    "email": "test@gmail.com",
    "password": "test"
}
```

## Updating a recipe ##
Notes
>ingredients that you don't include in your update request that were previously in your recipe they will be removed from the recipe 

Method
>POST

URL
>http://api.greenbeancooking.com/updaterecipe

Request Body
```
{
	"id": "73",
    "name": "chicken salmonilla",
    "descr": "chicken on icecream",
    "picture": "Fake url",
    "preptime": "00:05:00",
    "cooktime": "00:00:00",
    "instructions": "put raw chicken on icecream and then serve",
    "ingredientslist": [{"name":"chicken","amount":"10","unit":"cups"}],
    "email": "test@gmail.com",
    "password": "test"
}
```



## Getting recipe details by recipe database ID
Method
>GET

URL
>http://api.greenbeancooking.com/getrecipebyid/id


## Getting all recipes from the database including ingredients

### this request may take a long time to return

Method
>GET

URL
>http://api.greenbeancooking.com/getallrecipes


## Searching for a recipe by name
Method
>GET

URL
>http://api.greenbeancooking.com/searchrecipebyname/recipesearchterm
