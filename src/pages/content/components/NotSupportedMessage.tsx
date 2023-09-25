import { useEffect } from "react";
import CustomDiv from "./CustomDiv";

export default function NotSupportedMessage({ close }: { close: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 10000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  return (
    <CustomDiv customStyle="flex flex-col ">
      <div className="mb-[10px] text-xl text-black py-[20px] m-[190px] ">
        {"I Don't see any PR here to approve"} <br />
        {"Or You don't have the permission to approve this PR"}
      </div>
      <button
        className="mx-auto w-[160px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={close}
      >
        Close
      </button>
    </CustomDiv>
  );
}
