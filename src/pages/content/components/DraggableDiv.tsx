import React, { useState, useEffect } from "react";
import { divStyle } from "./CustomDiv";
import { cn } from "../utils/contentUtils";
import RequestChanges from "./RequestChanges";
import { DragInstructions } from "./DragInstructions";

const RIGHT_DRAG_APPROVE = "bg-[#00ff00]";
const LEFT_DRAG_REJECT = "bg-[#ff0000]";

const DraggableDiv = ({
  onLeftOrRightSlide,
  dragging,
  setDragging,
}: {
  onLeftOrRightSlide: (isApprove: boolean, text?: string) => Promise<void>;
  dragging: boolean;
  setDragging: (isDragging: boolean) => void;
}) => {
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [initialX, setInitialX] = useState<number | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [isRequestChanges, setIsRequestChanges] = useState(false);

  useEffect(() => {
    const handleMouseMove = async (e: MouseEvent) => {
      if (!dragging || initialX === null) return;

      const newOffsetX = e.clientX - initialX;
      setOffsetX(newOffsetX);
      if (
        newOffsetX > 350 / Math.min(1, initialX / 350) ||
        newOffsetX < -350 ||
        newOffsetX === -initialX
      ) {
        if (!dragging) return;
        handleMouseUp();
        setDirection(null);
        if (newOffsetX > 350) {
          onLeftOrRightSlide(true);
        } else {
          setIsRequestChanges(true);
          return;
        }
      }
      if (newOffsetX > 35) {
        setDirection("right");
      } else if (newOffsetX < -35) {
        setDirection("left");
      }
    };

    const handleMouseUp = () => {
      if (!dragging || initialX === null) return;

      setDragging(false);
      setInitialX(null);
      setOffsetX(0);
      setDirection(null);
      removeEventListeners();
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return removeEventListeners;
  }, [dragging, initialX]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRequestChanges) {
      setDirection(null);
      setDragging(false);
      setInitialX(null);
      return;
    }
    setDragging(true);
    setInitialX(e.clientX);
    setDirection(null);
  };

  const getTransformStyle = () => {
    if (dragging) {
      return `translateX(${offsetX}px) rotate(${offsetX / 30}deg)`;
    }
    return "translateX(0)";
  };

  return (
    <div
      className={cn({
        [divStyle]: true,
        "flex justify-center items-center": true,
        ["hover:animate-none"]: isRequestChanges,
        dragging,
        [RIGHT_DRAG_APPROVE]: dragging && direction === "right",
        [LEFT_DRAG_REJECT]: dragging && direction === "left",
        [dragging ? "cursor-grabbing" : "cursor-grab"]: true,
        ["cursor-default"]: isRequestChanges,
      })}
      style={{
        transform: getTransformStyle(),
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className={cn({
          "absolute top-[220px]": true,
          "w-[80%]": isRequestChanges,
        })}
      >
        {isRequestChanges ? (
          <RequestChanges onRequestChanges={onLeftOrRightSlide} />
        ) : (
          <DragInstructions />
        )}
      </div>
    </div>
  );
};

export default DraggableDiv;
