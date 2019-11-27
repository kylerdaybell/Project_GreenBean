var fs = require("fs")
var base64ToImage = require('base64-to-image');
const APIBaseURL = process.env.URL;

var ImageService = {
    Convert64BitToImageUrl: function(encodedstring){
        console.log(encodedstring)
        console.log("in image service")
        var imageurl = APIBaseURL+"/images/DefaultImage.jpg";
        if(encodedstring === ""){
            return imageurl;
        }else{
            path = __basedir + "/Images/";
            console.log(path);
            var imageInfo =  base64ToImage(encodedstring,path);
            baseurl = APIBaseURL+"/images/"
            imageurl = baseurl+imageInfo.fileName;
        }
        return imageurl;
    },
    RemoveImage: function(imageurl){
        let imagepatharray = imageurl.split('/')
        imagepath = __basedir +"/Images/"+imagepatharray[imagepatharray.length()]
        fs.unlink(imagepath);
        return;
    }
}


module.exports = ImageService;
