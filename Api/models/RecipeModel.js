
class Recipe{
    constructor(id, userid, name, descr, picture, preptime, cooktime, instructions, ingredientslist){
        this.id = id;
        this.userid = userid;
        this.name = name;
        this.descr = descr;
        this.picture = picture;
        this.preptime = preptime;
        this.cooktime = cooktime;
        this.instructions = instructions;
        this.ingredientslist = ingredientslist;
    }
}

module.exports = Recipe;
