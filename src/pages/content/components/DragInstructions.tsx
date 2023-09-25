export function DragInstructions() {
  return (
    <>
      <div className="text-xl text-black">
        Drag To Approve Or Request Changes
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
