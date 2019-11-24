import React, { useState } from "react";
import "../../css/w3.css";
import "../../css/main.css";
import "../../css/windowFrame.css";
import Logo from "../../resources/logo128x128.png"
const remote = window.electron.remote;

const WindowFrame = () => {
  const app = remote.getCurrentWindow();
  const minimize = () => {
    app.minimize();
  };

  const toggleMaximize = () => {
    app.isMaximized() ? app.unmaximize() : app.maximize();
  };

  const exit = () => {
    app.close();
  };
  return (
    <div className="frame">
    <img className="frameImage" src={Logo}/>
      <span className="frameTitle">Green Bean Cooking</span>
      <button
        className="fas fa-times frameButton exitButton"
        onClick={() => exit()}
      />
      <button
        className="far fa-square frameButton"
        onClick={() => toggleMaximize()}
      />
      <button className="fas fa-minus frameButton" onClick={() => minimize()} />
    </div>
  );
};

export default WindowFrame;
