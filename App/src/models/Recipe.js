 export default class RecipeAddModel {
    constructor(name, descr,picture,preptime,cooktime,category,instructions,ingredientslist,email,password){
        this.name = name;
        this.descr = descr;
        this.picture = picture;
        this.preptime = preptime;
        this.cooktime= cooktime;
        this.category = category;
        this.instructions = instructions;
        this.ingredientslist = ingredientslist;
        this.email = email;
        this.password = password;        
    }
}