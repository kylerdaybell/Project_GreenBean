function Navigate(pagename) {
    if(pagename =="home"){
        document.getElementById("content-area").innerHTML = "<h1>welcome home</h1>";
    }else if(pagename == "search"){
        document.getElementById("content-area").innerHTML = "<h1>Search for recipes</h1>"
    }       
}