"use client";
import { useMediaQuery } from "../hooks/use-media-query";

export default function MainNav() {
  const isDesktop = useMediaQuery("(min-width:768px");
  return isDesktop ? <div>DESKTOP</div> : <div>MOBILE</div>;
}
