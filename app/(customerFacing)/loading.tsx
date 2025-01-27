"use client";

import BouncyBallsLoader from "react-loaders-kit/lib/bouncyBalls/BouncyBallsLoader";
export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center h-dvh">
      <BouncyBallsLoader loading colors={["#21A0A0", "#21A0A0", "#21A0A0"]} />
    </div>
  );
}
