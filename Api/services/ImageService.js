var fs = require("fs")
var base64ToImage = require('base64-to-image');

var ImageService = {
    Convert64BitToImageUrl: function(encodedstring){
        console.log("we are in the darn function")
        path = "/root/Project_GreenBean/Api/Images/"
        var imageInfo = base64ToImage(encodedstring,path);
        baseurl = "https://api.greenbeancooking.com/images/"
        imageurl = baseurl+imageInfo.fileName;
        console.log(imageInfo.abs)
        return imageurl;
    },
    RemoveImage: function(imageurl){
        return;
    }
}


module.exports = ImageService;
