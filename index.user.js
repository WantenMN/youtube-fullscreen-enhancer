// ==UserScript==
// @name            YouTube Fullscreen Enhancer
// @description     This userscript improves YouTube's fullscreen mode by enabling the customization of the viewing experience. Users can hide the video title, player controls, and annotations, as well as stabilize captions when pausing or resuming playback. All these features can be easily toggled.
// @author          Wanten
// @copyright       2023 Wanten
// @license         MIT
// @supportURL      https://github.com/WantenMN/userscript-youtube/issues
// @icon            https://youtube.com/favicon.ico
// @homepageURL     https://github.com/WantenMN/userscript-youtube
// @namespace       https://greasyfork.org/en/scripts/460569
// @updateURL       https://github.com/WantenMN/userscript-youtube/raw/main/index.user.js
// @downloadURL     https://github.com/WantenMN/userscript-youtube/raw/main/index.user.js
// @version         0.0.9
// @match           http*://*.youtube.com/*
// @match           http*://youtube.com/*
// @match           http*://*.youtu.be/*
// @match           http*://youtu.be/*
// @run-at          document-end
// @grant           GM_addStyle
// ==/UserScript==


(function () {
  "use strict";

  // Keyboard shortcut to toggle the script on and off
  const toggleKey = 'e';
  // Whether to hide or show the player progress bar when the video is paused
  // true: hide
  // false: show
  const hideProgressBar = true;
  // Whether to show or hide the video title and player control bar on mousemove
  // true: show
  // false: hide
  const isMouseMoveToggle = true;

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

  let isEnabled = false;
  let styleTag = null;
  let mouseMoveTimeout = null;

  const addStyleTag = () => {
    styleTag = GM_addStyle(enableStyle);
  };

  const removeStyleTag = () => {
    styleTag?.parentNode?.removeChild(styleTag);
    styleTag = null;
  };

  const handleKeyDown = (event) => {
    if (event.key !== toggleKey) {
      return;
    }

    clearTimeout(mouseMoveTimeout);
    isEnabled = !isEnabled;

    if (styleTag) {
      removeStyleTag();
    }

    if (isEnabled) {
      addStyleTag();
    }
  };

  const handleMouseMove = (event) => {
    if (!isMouseMoveToggle || !isEnabled) {
      return;
    }

    clearTimeout(mouseMoveTimeout);
    if (styleTag) {
      removeStyleTag();
    }

    mouseMoveTimeout = setTimeout(() => {
      if (isEnabled) {
        addStyleTag();
      }
    }, 3500);
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("mousemove", handleMouseMove);
})();