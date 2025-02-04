import React from "react";
import ReelsView from "../_components/ReelsView";

export default function Page() {
  return (
    <div className="h-screen w-full overflow-hidden ">
      {/* Remove aspect ratio here - let ReelsView handle it internally */}
      <div className="h-full w-full flex items-center justify-center">
        <ReelsView className="h-full w-full md:max-w-[430px]" />
      </div>
    </div>
  );
}
