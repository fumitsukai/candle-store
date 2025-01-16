import { PawPrint, Recycle, Rabbit, HandHelping } from "lucide-react";

export default function WhyUs() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-2">
        <div className="flex flex-col items-center gap-1 mt-2">
          <HandHelping size={40} />
          <div className="font-semibold">Handmade in UK</div>
          <p className="font-thin text-sm text-center">
            Lovingly made in the UK, our candles are crafted to add a cozy glow
            and timeless charm to your home.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 mt-2">
          <Recycle size={40} />
          <div className="font-semibold">Earth Friendly</div>
          <p className="font-thin text-sm text-center">
            Crafted with care, our candles are earth-friendly, using sustainable
            materials to light your home while protecting the planet.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 mt-2">
          <Rabbit size={40} />
          <div className="font-semibold">Cruelty-free</div>
          <p className="font-thin text-sm text-center">
            Ethically made, our candles are 100% cruelty-free, ensuring a kind
            and compassionate touch in every glow.
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 mt-2">
          <PawPrint size={40} />
          <div className="font-semibold">Pet Friendly</div>
          <p className="font-thin text-sm text-center">
            Designed with care, our candles are pet-friendly, creating a safe
            and welcoming ambiance for your entire household.
          </p>
        </div>
      </div>
    </>
  );
}
