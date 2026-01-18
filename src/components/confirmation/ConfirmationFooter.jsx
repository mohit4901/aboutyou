import { ShieldCheck, Mail, HelpCircle } from "lucide-react";

export default function ConfirmationFooter() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-b border-white/10 pb-10">

          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-8 bg-white text-black flex items-center justify-center rounded-md font-bold">
              After
            </div>
            <span className="text-xl font-bold">U</span>
          </div>

          {/* LINKS */}
          <nav className="flex flex-wrap items-center gap-8 text-sm text-white/70">
            <a href="#" className="hover:text-white transition">Help Center</a>
            <a href="#" className="hover:text-white transition">Returns</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy</a>
          </nav>

        </div>

        {/* MIDDLE */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* TRUST */}
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white/80">
              Secure payments • Real-time updates • Human support
            </span>
          </div>

          {/* SUPPORT */}
          <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              support@afteru.com
            </div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              24×7 Help
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 text-center text-sm text-white/40">
          © {new Date().getFullYear()} AfterU. Designed for confidence.
        </div>

      </div>
    </footer>
  );
}
