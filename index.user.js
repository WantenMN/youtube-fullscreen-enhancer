// ==UserScript==
// @name            Hide Youtube video title and player control bar
// @description     Hide Youtube video title and player control bar when paused.
// @author          Wanten
// @copyright       2023 Wanten
// @license         MIT
// @supportURL      https://github.com/WantenMN/userscript-youtube/issues
// @icon            https://youtube.com/favicon.ico
// @homepageURL     https://github.com/WantenMN/userscript-youtube
// @namespace       https://greasyfork.org/en/scripts/460569
// @updateURL       https://github.com/WantenMN/userscript-youtube/raw/main/index.user.js
// @downloadURL     https://github.com/WantenMN/userscript-youtube/raw/main/index.user.js
// @version         0.0.7
// @match           http*://*.youtube.com/*
// @match           http*://youtube.com/*
// @match           http*://*.youtu.be/*
// @match           http*://youtu.be/*
// @run-at          document-end
// @grant           GM_addStyle
// ==/UserScript==


(function () {
  "use strict";

  /**
   * settings-start
   */
  //shortcut key to toggle the script
  const toggleKey = 'e';

  //Hide or show player progress bar, when pause a video by click spacebar or press K 
  //true or false
  const hideProgressBar = true;

  //Whether to hide video title and player control bar when mousemove
  //true: show
  //false：hide
  const isMouseMoveToggle = true;
  /**
   * settings-end
   */

  const enableStyle = `
  .ytp-chrome-top {
    display: none !important;
  }
  .ytp-gradient-top {
    display: none !important;
  }
  .ytp-chrome-controls {
    display: none !important;
  }
  .ytp-gradient-bottom {
    display: none !important;
  }
  .ytp-progress-bar-container {
    bottom: 10px !important;
    ${hideProgressBar ? 'display: none !important;' : ''}
  }
  .caption-window, .caption-window.ytp-caption-window-bottom, .caption-window ytp-caption-window-top {
    margin-bottom: 0px !important;
    margin-top: 0px !important;
  }
  .annotation {
    display: none !important;
  }
  `;

  let enableFlag = false;
  let styleTag = null;
  let mouseMoveSetTimeoutID = null;

  //keydown toggle
  window.addEventListener("keydown", (e) => {
    if (e.key === toggleKey) {
      clearTimeout(mouseMoveSetTimeoutID)
      enableFlag = !enableFlag;
      styleTag && removeStyleTag();
      enableFlag && addStyleTag();
    }
  });

  //mousemove toggle
  window.addEventListener("mousemove", (e) => {
    clearTimeout(mouseMoveSetTimeoutID)
    if (!isMouseMoveToggle || !enableFlag) return;
    styleTag && removeStyleTag();
    mouseMoveSetTimeoutID = setTimeout(() => {
      enableFlag && addStyleTag();
    }, 3500)
  });

  const addStyleTag = () => {
    styleTag = GM_addStyle(enableStyle);
  }

  const removeStyleTag = () => {
    document.head.removeChild(styleTag);
    styleTag = null;
  }
})();