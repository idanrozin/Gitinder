import { waitForElement } from "./contentUtils";

export async function githubApproveOrReject(isApprove: boolean, text?: string) {
  const tabCounter = document.querySelector("span#files_tab_counter");
  if (!tabCounter) return;
  const REVIEW_CHANGES_BTN_SELECTOR = ".js-reviews-toggle";

  const filesChangeTab = tabCounter.parentElement;
  let reviewChangesBtn: HTMLElement | null = null;
  // check if files has "selected" class
  if (!filesChangeTab.classList.contains("selected")) {
    filesChangeTab.click();
    reviewChangesBtn = (await waitForElement(
      REVIEW_CHANGES_BTN_SELECTOR
    )) as HTMLElement;
  } else {
    reviewChangesBtn = document.querySelector(
      REVIEW_CHANGES_BTN_SELECTOR
    ) as HTMLElement;
  }

  if (!reviewChangesBtn) return;

  (reviewChangesBtn as HTMLElement).click();
  const radioInputValue = isApprove ? "approve" : "reject";
  (
    document.querySelector(
      `input[type=radio][value=${radioInputValue}]`
    ) as HTMLElement
  )?.click();

  if (text) {
    const commentTextArea = document.querySelector(
      'textarea[name="pull_request_review[body]"]'
    );
    if (commentTextArea) {
      (commentTextArea as HTMLTextAreaElement).value = text;
    }
  }

  const form = document.querySelector("form#pull_requests_submit_review");
  if (!form) return;
  (form.querySelector("button[type=submit]") as HTMLElement)?.click();
}

export function getPRName() {
  return document
    .querySelector(".gh-header-title")
    ?.textContent.split("\n")
    ?.map((t) => t.trim())
    ?.filter(Boolean)
    ?.join("; ");
}
