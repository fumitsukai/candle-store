import { X } from "lucide-react";
import Link from "next/link";

export default function HeaderExit({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <div className="relative flex items-center justify-center h-14 px-4 bg-lightkeeper-white text-base  uppercase tracking-wide font-medium">
      <h1>{name}</h1>
      <Link href={url}>
        <X size={24} className="p-2" />
      </Link>
    </div>
  );
}
