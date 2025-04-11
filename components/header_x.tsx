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
    <div className="bg-white px-4 py-2 font-semibold text-base flex justify-between">
      <h1>{name}</h1>
      <Link href={url}>
        <X size={20} className="p-2" />
      </Link>
    </div>
  );
}
