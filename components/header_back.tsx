import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function HeaderBack({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  return (
    <div className="relative flex items-center justify-center h-14 px-4 bg-lightkeeper-white text-base  uppercase tracking-wide font-medium">
      <Link href={url} className="p-2 absolute left-4">
        <ArrowLeft size={24} />
      </Link>
      <div>{name}</div>
    </div>
  );
}
