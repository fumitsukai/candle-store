import Image from "next/image";
import Candle from "@/public/img/candle pics/ice-cream-p.png";
import { Button } from "./ui/button";
import Candle2 from "@/public/img/candle pics/cactus-p.png";
import Candle3 from "@/public/img/spring2.png";

export default function Hero() {
  return (
    <div className="space-y-2 bg-lightkeeper-white">
      <div className="bg-auto w-full relative">
        <Image src={Candle} alt="Picture of a candle" />
        <div className="absolute inset-x-0 top-0 text-center text-white mt-4 mx-8 space-y-4">
          <h2 className="text-2xl tracking-wide text-lightkeeper-black font-medium">
            Where Sweet Scents Meet Cozy Glow
          </h2>
          <h3 className="font-light text-sm text-lightkeeper-black">
            Ice Cream-Inspired Candles to Delight Your Senses!
          </h3>
          <Button className="w-32 rounded-full mt-3" variant="outline">
            Discover
          </Button>
        </div>
      </div>
      <div className="relative bg-auto w-full">
        <Image src={Candle2} alt="Picture of candle" />
        <div className="absolute inset-x-0 top-0 text-center text-white mt-4 mx-8 space-y-4">
          <h2 className="text-2xl tracking-wide text-lightkeeper-white font-medium">
            Nature-Inspired, Uniquely Designed!
          </h2>
          <h3 className="font-light text-sm text-lightkeeper-white">
            Light Up Your Space with the Charm of Cactus Candles
          </h3>
          <Button className="w-32 rounded-full mt-3 bg-lightkeeper-white text-lightkeeper-black">
            Discover
          </Button>
        </div>
      </div>
      <div className="pb-4">
        <Image src={Candle3} alt="Spring Collection" />
        <div className="text-center space-y-4 my-4">
          <h2 className="text-2xl tracking-wide text-lightkeeper-black font-medium p-4">
            Explore our Spring Collection!
          </h2>
          <Button className="rounded-full w-32">Shop Now</Button>
        </div>
      </div>
    </div>
  );
}
