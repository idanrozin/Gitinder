import { getPRName } from "../utils/github";

export function DragInstructions() {
  return (
    <>
      <div className="text-xl text-black">
        Drag To Approve Or Request Changes For PR:
        <br />
        <mark className="px-2 text-white bg-[#39d353] rounded ">
          {getPRName()}
        </mark>
      </div>
      <div className="relative">
        <div className="text-xl text-[#52ff52] absolute top-[128px] right-[-195px] animate-bounce">
          Right To Approve 👉
        </div>
        <div className="text-xl text-[#f00] absolute top-[128px] left-[-195px] animate-bounce">
          👈 Left To Request Changes
        </div>
      </div>
    </>
  );
}
