import { useEffect, useState } from "react";
import { MESSAGE_SET_LAYOUT_ACTIVE } from "../../../shared/constants";
import Gitinder from "./Gitinder";

export type LayoutState = "active" | "inactive" | "notSupported";
export default function App() {
  const [isLayoutActive, setActiveLayout] = useState<LayoutState>("inactive");

  const activate = (message, sender, sendResponse) => {
    if (message.action === MESSAGE_SET_LAYOUT_ACTIVE) {
      const url = new URL(window.location.toString());
      const path = url.pathname;
      const host = url.host;

      // TODO: add more git platforms (gitlab, bitbucket, etc.)
      if (
        host.includes("github") &&
        path.includes("pull") &&
        document.querySelector('span[reviewable_state="ready"]')
      ) {
        // setScrollHeight(document.body.scrollHeight);
        setActiveLayout((prev) => (prev === "active" ? "inactive" : "active"));
      } else {
        setActiveLayout("notSupported");
      }
      sendResponse({
        response: `Message received in content script ${window.location}`,
      });
    }
  };
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveLayout("inactive");
      }
    };

    console.log("content view loaded");
    document.addEventListener("keydown", handleEsc);

    chrome.runtime.onMessage.addListener(activate);
    return () => {
      chrome.runtime.onMessage.removeListener(activate);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (isLayoutActive === "inactive") {
    return null;
  }

  return <Gitinder setActiveLayout={setActiveLayout} layout={isLayoutActive} />;
}
