import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Next.js Template</h1>
        <p className="mb-8 text-lg text-[var(--muted-foreground)]">
          Frontend-ready starter with TypeScript, Tailwind CSS, and external API integration
        </p>
      </div>
    </main>
  );
}
