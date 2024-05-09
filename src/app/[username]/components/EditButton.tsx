"use client";

import Pencil from "@/components/icons/pencil";
import Link from "next/link";
import { createPortal } from "react-dom";

export default function EditButton() {
  return (
    <Link
      href="/profile"
      className="fixed bottom-4 right-4 rounded-full p-2 bg-blue-400/20 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95 transition-transform z-50 "
    >
      <Pencil className="w-6 h-6 cursor-pointer" />
    </Link>
  );
}
