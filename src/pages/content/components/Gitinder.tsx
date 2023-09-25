import { githubApproveOrReject } from "../utils/github";
import DraggableDiv from "./DraggableDiv";
import { LayoutState } from "./App";
import NotSupportedMessage from "./NotSupportedMessage";
import { useState } from "react";

export const MAIN_OVERLAY_STYLE =
  "h-[100vh] text-lime-400 w-[100%] absolute top-0 left-0 opacity-60 bg-white flex justify-center items-center overflow-hidden z-[900]";
export default function Gitinder({
  setActiveLayout: setIsLayoutActive,
  layout,
}: {
  setActiveLayout: (isLayoutActive: LayoutState) => void;
  layout: Omit<LayoutState, "inactive">;
}) {
  const [dragging, setDragging] = useState(false);
  const onLeftOrRightSlide = async (isApprove: boolean, text?: string) => {
    await githubApproveOrReject(isApprove, text);
    setIsLayoutActive("inactive");
  };

  function closeLayout(e: React.MouseEvent<HTMLDivElement>) {
    if (dragging) return;
    console.log("e.target :>> ", e.target);
    if (e.target !== e.currentTarget) return;
    setIsLayoutActive("inactive");
  }

  return (
    <div
      className={MAIN_OVERLAY_STYLE}
      style={{
        height: Math.max(document.body.scrollHeight, window.innerHeight),
      }}
      onClick={closeLayout}
    >
      {layout === "notSupported" ? (
        <NotSupportedMessage close={() => setIsLayoutActive("inactive")} />
      ) : (
        <DraggableDiv
          onLeftOrRightSlide={onLeftOrRightSlide}
          dragging={dragging}
          setDragging={setDragging}
        />
      )}
    </div>
  );
}
