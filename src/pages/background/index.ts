import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { MESSAGE_SET_LAYOUT_ACTIVE } from "../../shared/constants";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: MESSAGE_SET_LAYOUT_ACTIVE },
      function (response) {
        // console.log(response);
      }
    );
  });
});
