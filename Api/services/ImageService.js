var fs = require("fs")
var base64ToImage = require('base64-to-image');

var ImageService = {
    Convert64BitToImageUrl: function(encodedstring){
        var imageurl = "https://api.greenbeancooking.com/images/DefaultImage.jpg";
        if(encodedstring == ""){
            return;
        }else{
            console.log("we are in the darn function")
            path = "/root/Project_GreenBean/Api/Images/"
            var imageInfo =  base64ToImage(encodedstring,path);
            baseurl = "https://api.greenbeancooking.com/images/"
            imageurl = baseurl+imageInfo.fileName;
            console.log(imageInfo.abs)
        }
        return imageurl;
    },
    RemoveImage: function(imageurl){
        let imagepatharray = imageurl.split('/')
        imagepath = "/root/Project_GreenBean/Api/Images/"+imagepatharray[imagepatharray.length()]
        fs.unlink(imagepath);
        return;
    }
}


module.exports = ImageService;
