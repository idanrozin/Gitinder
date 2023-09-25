import { useEffect } from "react";
import CustomDiv from "./CustomDiv";

export default function NotSupportedMessage({ close }: { close: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 3000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  });
  return (
    <CustomDiv>
      {"I Don't see any PR here to approve"}
      <button onClick={close}>Close</button>
    </CustomDiv>
  );
}
