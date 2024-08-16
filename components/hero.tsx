import Image from "next/image";
import Candle from "@/public/img/lighted-candle.jpg";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="bg-auto w-full relative">
      <Image src={Candle} alt="Picture of a candle" className="relative" />
      <p className="absolute top-0 text-white">Some text about the thing</p>
      <Button className="absolute top-3/4 left-3">Discover</Button>
    </div>
  );
}
