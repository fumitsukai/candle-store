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
    <div className="flex items-center justify-between p-2 bg-white text-base font-semibold">
      <Link href={url}>
        <ArrowLeft size={20} />
      </Link>
      <div>{name}</div>
      <div className="w-5"></div>
    </div>
  );
}
