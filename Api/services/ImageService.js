var fs = require("fs")
var base64ToImage = require('base64-to-image');

var ImageService = {
    Convert64BitToImageUrl: function(encodedstring){
        path = "../Images/" 
        var imageInfo =  base64ToImage(encodedstring,path);
        baseurl = "https://api.greenbeancooking.com/images/"
        
        imageurl = baseurl+imageInfo.fileName;
        console.log("trying to create images")


        fs.writeFileSync(path+fileName+".png",encodedstring);

        return imageurl;
    }
}

module.exports = ImageService;
