function Navigate(pagename) {
    if(pagename =="home"){
        SetHomePage()
    }else if(pagename == "search"){
        SetSearchPage();
    }else if(pagename == "new"){
        SetNewPage();
    }       
}

function SetHomePage(){
    document.getElementById("title").innerHTML = "<h1>Welcome Home</h1>";
    document.getElementById("content-area").innerHTML = "<p>this is where the home page goes</p>";
}

function SetSearchPage(){
    document.getElementById("title").innerHTML = "<h1>Search for Recipes</h1>"
    document.getElementById("content-area").innerHTML = "<p>this is where the search page goes</p>";
}

function SetNewPage(){
    document.getElementById("title").innerHTML = "<h1>Add a new recipe</h1>"
    document.getElementById("content-area").innerHTML = "<p>this is where the add page goes</p>";
}