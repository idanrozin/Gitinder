import { useEffect, useRef } from "react";

export default function RequestChanges({
  onRequestChanges,
}: {
  onRequestChanges: (isApprove: boolean, text?: string) => Promise<void>;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | KeyboardEvent
  ) => {
    event?.preventDefault();
    const text = textAreaRef.current?.value;
    onRequestChanges(false, text);
  };

  useEffect(() => {
    const captureGithubEvents = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        // Ctrl + Enter (or Cmd + Enter) was pressed
        handleSubmit(event);
      }
      event.stopPropagation();
    };

    document.addEventListener("keydown", captureGithubEvents, {
      capture: true,
    });
    return () =>
      document.removeEventListener("keydown", captureGithubEvents, {
        capture: true,
      });
  }, []);

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="p-80px flex flex-col gap-[12px]">
        <div className="flex flex-col">
          <div className="mb-[10px] text-xl text-black py-[20px]">
            {"You'll need to leave a comment in order to request changes:"}
          </div>
          <textarea
            id="textarea"
            name="textarea"
            ref={textAreaRef}
            autoFocus
            tabIndex={99}
            className="resize-none w-[100%] h-[200px] border-[2px] border-solid border-[#a9a9a9] p-[10px] bg-black text-white brightness-200"
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-auto"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
