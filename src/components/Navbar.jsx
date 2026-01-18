import { CheckCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glass background */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 flex h-14 items-center justify-between rounded-full bg-background/70 backdrop-blur-md shadow-card border border-border">
          
          {/* BRAND */}
          <div className="flex items-center gap-2 pl-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-foreground">
            AfterU
            </span>
          </div>

          {/* CENTER STATUS */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
            Secure checkout completed
          </div>

          {/* ACTION */}
          <div className="pr-4">
            <button className="rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background hover:opacity-90 transition">
              View order
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
