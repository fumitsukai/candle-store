import Image from "next/image";
import Candle from "@/public/img/candle pics/ice-cream-p.jpeg";
import { Button } from "./ui/button";
import Candle2 from "@/public/img/candle pics/cactus-p.jpeg";
import Candle3 from "@/public/img/christmas1.jpg";

export default function Hero() {
  return (
    <div className="space-y-2">
      <div className="bg-auto w-full relative">
        <Image src={Candle} alt="Picture of a candle" />
        <div className="absolute inset-x-0 top-0 text-center text-white mt-4 mx-8">
          <h2 className="font-bold text-xl">
            Where Sweet Scents Meet Cozy Glow
          </h2>
          <h3 className="font-light text-sm">
            Ice Cream-Inspired Candles to Delight Your Senses!
          </h3>
          <Button className="w-32 rounded-full mt-3">Discover</Button>
        </div>
      </div>
      <div className="relative bg-auto w-full">
        <Image src={Candle2} alt="Picture of candle" />
        <div className="absolute inset-x-0 top-0 text-center text-white mt-4 mx-8">
          <h2 className="font-bold text-xl">
            Nature-Inspired, Uniquely Designed!
          </h2>
          <h3 className="font-light text-sm">
            Light Up Your Space with the Charm of Cactus Candles
          </h3>
          <Button className="w-32 rounded-full mt-3">Discover</Button>
        </div>
      </div>
      <div className="border-b-1 border">
        <Image src={Candle3} alt="Christmas Candles" />
        <div className="text-center space-y-2 my-4">
          <h2 className="font-bold text-xl">Explore our Christmas Catalog!</h2>
          <Button className="rounded-full w-32">Shop Now</Button>
        </div>
      </div>
    </div>
  );
}
