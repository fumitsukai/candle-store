import Image from "next/image";
import Candle from "@/public/img/lighted-candle.jpg";
import { Button } from "./ui/button";
import Candle2 from "@/public/img/scented-candles-in-glass-jar-romantic-flame-and-fire-in-decorative-glass-doodle-cartoon-isolated-on-white-background-vector.jpg";

export default function Hero() {
  return (
    <div className="my-4 space-y-2">
      <div className="bg-auto w-full relative">
        <Image src={Candle} alt="Picture of a candle" className="relative" />
        <p className="absolute top-0 text-white">Some text about the thing</p>
        <Button className="absolute top-3/4 left-3">Discover</Button>
      </div>
      <div className="relative">
        <Image src={Candle2} alt="Picture of candle" />
      </div>
    </div>
  );
}
