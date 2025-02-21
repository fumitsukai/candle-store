import { X } from "lucide-react";
import Link from "next/link";

export default function Header({ name, url }: { name: string; url: string }) {
  return (
    <div className="bg-white p-4 font-semibold text-base flex justify-between">
      <h1>{name}</h1>
      <Link href={url}>
        <X size={20} />
      </Link>
    </div>
  );
}
