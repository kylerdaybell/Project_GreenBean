 export default class RecipeAddModel {
    constructor(name, descr,picture,preptime,cooktime,instructions,ingredientslist,email,password){
        this.name = name;
        this.descr = descr;
        this.picture = picture;
        this.preptime = preptime;
        this.cooktime= cooktime;
        this.instructions = instructions;
        this.ingredientslist = ingredientslist;
        this.email = email;
        this.password = password;        
    }
}