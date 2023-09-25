import React from "react";
export const divStyle =
  "border-solid hover:animate-pulse shadow-[0_7px_10px_rgba(0,0,0,0.5)] hover:shadow-[5px_9px_10px_rgba(0,0,0,1)] rounded-[15px] border-[3px] border-black w-[50%] h-[calc(100%-50px)] overflow-hidden select-none max-w-[850px] my-20px ";

function CustomDiv({
  customStyle,
  children,
}: {
  customStyle?: string;
  children?: React.ReactNode;
}) {
  return <div className={`${divStyle} ${customStyle}`}>{children}</div>;
}

export default CustomDiv;
