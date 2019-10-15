var remote = require('electron').remote;
var electronFs = remote.require('fs');

function Navigate() {
    document.getElementById("content-area").innerHTML = "why does this still not work";

    document.getElementById("content-area").innerHTML = electronFs.readFileSync('/pages/secondpage.html');
}