var fs = require("fs")
var base64ToImage = require('base64-to-image');

var ImageService = {
    Convert64BitToImageUrl: async function(encodedstring){
        path = "../Images/" 
        var imageInfo =  await this.base64ToImage(encodedstring,path);
        baseurl = "https://api.greenbeancooking.com/images/"
        
        imageurl = baseurl+imageInfo.fileName;
        return imageurl;
    },
    base64ToImage: function (base64Str, path, optionalObj) {

        if (!base64Str || !path) {
            throw new Error('Missing mandatory arguments base64 string and/or path string');
        }
    
        var optionalObj = optionalObj || {};
        var imageBuffer = this.decodeBase64Image(base64Str);
        var imageType = optionalObj.type || imageBuffer.type || 'png';
        var fileName = optionalObj.fileName || 'img-' + Date.now();
        var abs;
        var fileName = '' + fileName;
    
        if (fileName.indexOf('.') === -1) {
            imageType = imageType.replace('image/', '');
            fileName = fileName + '.' + imageType;
        }
    
        abs = path + fileName;
        fs.writeFile(abs, imageBuffer.data, 'base64', function(err) {
            if (err && optionalObj.debug) {
                console.log("File image write error", err);
            }
    
        });
        return {
            'imageType': imageType,
            'fileName': fileName
        };
    },
    decodeBase64Image: function(base64Str) {
        var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        var image = {};
        if (!matches || matches.length !== 3) {
            throw new Error('Invalid base64 string');
        }
    
        image.type = matches[1];
        image.data = new Buffer.alloc(matches[2], 'base64');
    
        return image;
    }
}

module.exports = ImageService;
