"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b bg-white dark:bg-zinc-950 px-6 py-4 flex justify-between items-center mb-6">
      <Link href="/" className="text-xl font-bold tracking-tighter">
        TIENDA NEXT
      </Link>
      <div className="flex gap-4">
        <Link href="/">
          <Button variant="ghost">Catálogo</Button>
        </Link>
        <Link href="/nuevo">
          <Button>+ Nuevo Producto</Button>
        </Link>
      </div>
    </nav>
  );
}