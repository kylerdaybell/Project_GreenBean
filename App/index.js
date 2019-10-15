'use strict';
const fs = require("fs");

const electron = require('electron')
const {app, BrowserWindow} = electron

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        resizable: true,
        height: 600,
        width: 800
    });

    mainWindow.loadURL('file://' + __dirname + '/pages/index.html');
});