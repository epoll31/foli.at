"use client";

import Pencil from "@/components/icons/pencil";
import Link from "next/link";

export default function EditButton() {
  return (
    <Link
      href="/portfolio"
      prefetch={false}
      className="fixed bottom-4 right-4 rounded-full p-2 bg-blue-400/20 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95 transition-transform z-50 "
    >
      <Pencil className="w-6 h-6 cursor-pointer" />
    </Link>
  );
}
