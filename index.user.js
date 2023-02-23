// ==UserScript==
// @name            Hide Youtube video title and player control bar
// @description     Hide Youtube video title and player control bar when playing in full screen.
// @author          Wanten
// @copyright       2023 Wanten
// @license         MIT
// @supportURL      https://github.com/WantenMN/userscript-youtube/issues
// @icon            https://youtube.com/favicon.ico
// @homepageURL     https://github.com/WantenMN/userscript-youtube
// @namespace       https://greasyfork.org/en/scripts/460569
// @version         0.0.1
// @match           http*://*.youtube.com/watch?*
// @match           http*://youtube.com/watch?*
// @match           http*://*.youtu.be/watch?*
// @match           http*://youtu.be/watch?*
// @run-at          document-end
// @grant           GM_addStyle
// ==/UserScript==


(function () {
  "use strict";

  //settings
  const toggleKey = 'e';
  const hideProgressBar = false;//hide progress bar?

  const enableStyle =`
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
  window.addEventListener("keydown", (e) => {
    enableFlag = !enableFlag;
    if (e.key === toggleKey) {
      styleTag && document.head.removeChild(styleTag);
      styleTag = null;
      if (enableFlag)
        styleTag = GM_addStyle(enableStyle);
    }
  });
})();